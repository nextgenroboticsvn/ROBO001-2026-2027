(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LiemsProtocol = factory();
  }
}(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  function validTime(value) {
    return typeof value === 'number' && Number.isFinite(value) && value >= 0;
  }

  function validRunId(value) {
    return typeof value === 'string' && /^[A-Za-z0-9._:-]{1,100}$/.test(value);
  }

  function validBlockId(value) {
    return value === null || typeof value === 'string' && value.length > 0 && value.length <= 200;
  }

  function jsonPayload(raw, prefix) {
    // Camera-bearing legacy STATUS packets may legitimately exceed 64 KiB.
    // Trace/ACK messages are small control packets and retain the size bound.
    if (prefix !== 'STATUS:' && raw.length > 65536) return null;
    try {
      var value = JSON.parse(raw.slice(prefix.length));
      return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
    } catch (_) { return null; }
  }

  function parseMessage(raw) {
    if (typeof raw !== 'string') return null;
    if (raw === 'STATUS:READY') return { kind: 'ready' };

    if (raw.startsWith('TRACE:')) {
      var trace = jsonPayload(raw, 'TRACE:');
      if (!trace || !validRunId(trace.runId) || !validTime(trace.time) ||
          !Number.isSafeInteger(trace.step) || trace.step < 0 || !validBlockId(trace.blockId) ||
          ['start', 'block', 'end', 'error', 'interrupted'].indexOf(trace.phase) === -1 ||
          trace.phase === 'block' && trace.blockId === null) return null;
      var event = { kind: 'trace', runId: trace.runId, phase: trace.phase, blockId: trace.blockId, step: trace.step, time: trace.time };
      if (trace.message !== undefined) {
        if (typeof trace.message !== 'string' || trace.message.length > 500) return null;
        event.message = trace.message;
      }
      return event;
    }

    if (raw.startsWith('ACK:')) {
      var ack = jsonPayload(raw, 'ACK:');
      if (!ack || ['WORLD_RESET', 'RESET', 'PLAY', 'PAUSE', 'CODE'].indexOf(ack.command) === -1 ||
          (ack.command === 'CODE' ? ['accepted', 'complete', 'stopped', 'error'] : ['done', 'error']).indexOf(ack.phase) === -1 || !validTime(ack.time) ||
          typeof ack.playing !== 'boolean' || !Number.isInteger(ack.mode) || ack.mode < 0 || ack.mode > 3 ||
          ack.runId !== null && !validRunId(ack.runId)) return null;
      var confirmation = { kind: 'ack', command: ack.command, phase: ack.phase, time: ack.time, playing: ack.playing, mode: ack.mode, runId: ack.runId };
      if (typeof ack.message === 'string' && ack.message.length <= 500) confirmation.message = ack.message;
      return confirmation;
    }

    if (raw.startsWith('TIME:')) {
      var numericText = raw.slice(5).trim();
      if (!/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(numericText)) return null;
      var time = Number(numericText);
      return validTime(time) ? { kind: 'time', time: time } : null;
    }

    if (raw.startsWith('STATUS:')) {
      var payload = jsonPayload(raw, 'STATUS:');
      if (!payload) return null;

      var status = { kind: 'status' };
      if (Object.prototype.hasOwnProperty.call(payload, 'time')) {
        if (!validTime(payload.time)) return null;
        status.time = payload.time;
      }
      // Only copy the expected scalar fields. Sensor objects and unknown keys
      // remain outside this UI protocol; malformed state values are omitted.
      if (typeof payload.state === 'string' && payload.state.length <= 40) {
        status.state = payload.state;
      }
      if (typeof payload.playing === 'boolean') status.playing = payload.playing;
      if (Number.isInteger(payload.mode) && payload.mode >= 0 && payload.mode <= 3) status.mode = payload.mode;
      if (payload.runId === null || validRunId(payload.runId)) status.runId = payload.runId;
      if (payload.protocol === 'LiemsStudio/2') status.protocol = payload.protocol;
      if (payload.capabilities && typeof payload.capabilities === 'object' && !Array.isArray(payload.capabilities)) {
        status.capabilities = {};
        ['trace', 'worldReset'].forEach(function (name) {
          if (typeof payload.capabilities[name] === 'boolean') status.capabilities[name] = payload.capabilities[name];
        });
      }
      return status;
    }

    if (raw.startsWith('ERROR:')) {
      return { kind: 'error', message: raw.slice(6, 606) };
    }
    return null;
  }

  function formatTime(seconds) {
    if (!validTime(seconds)) return '--:--.--';
    var minutes = Math.floor(seconds / 60);
    var hundredths = Math.round((seconds % 60) * 100);
    if (hundredths === 6000) {
      minutes += 1;
      hundredths = 0;
    }
    return String(minutes).padStart(2, '0') + ':' +
      String(Math.floor(hundredths / 100)).padStart(2, '0') + '.' +
      String(hundredths % 100).padStart(2, '0');
  }

  return Object.freeze({ parseMessage: parseMessage, formatTime: formatTime });
}));
