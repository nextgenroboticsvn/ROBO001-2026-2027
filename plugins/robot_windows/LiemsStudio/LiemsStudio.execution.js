/* Trace state for one uploaded Blockly program; the simulator owns the clock. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LiemsStudioExecution = factory();
}(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  function create() {
    var run = null;
    return {
      begin: function (runId, blocks, summary) {
        var nodes = Object.create(null);
        blocks.forEach(function (block) { nodes[block.id] = Object.freeze(Object.assign({}, block, {args:Object.freeze(Object.assign({},block.args))})); });
        Object.freeze(nodes);
        run = { runId: runId, nodes: nodes, summary: Object.freeze(Object.assign({}, summary)),
          phase: 'waiting', step: 0, time: null, current: null, message: '' };
        return run;
      },
      get: function () { return run; },
      clear: function () { run = null; },
      consume: function (event) {
        if (!run || event.kind !== 'trace' || event.runId !== run.runId) return false;
        if (event.phase === 'start') {
          if (run.phase !== 'waiting') return false;
          run.phase = 'running'; run.time = event.time; return true;
        }
        if (event.phase === 'block') {
          if (!['waiting', 'running'].includes(run.phase) || !run.nodes[event.blockId] || event.step <= run.step) return false;
          run.phase = 'running'; run.step = event.step; run.time = event.time;
          run.current = run.nodes[event.blockId]; return true;
        }
        if (['end', 'error', 'interrupted'].includes(event.phase)) {
          if (!['waiting', 'running'].includes(run.phase) || event.step < run.step) return false;
          run.phase = event.phase; run.step = event.step; run.time = event.time;
          run.message = event.message || ''; return true;
        }
        return false;
      }
    };
  }
  // Present validated native events in arrival order. This small visual dwell
  // never sends robot commands or changes simulation time / program duration.
  function createPresentation(onFrame, clock) {
    clock = clock || {now:function(){return Date.now();},
      setTimeout:function(fn,ms){return setTimeout(fn,ms);},
      clearTimeout:function(id){clearTimeout(id);}};
    var current = null, queue = [], timer = null, paused = false, shownAt = 0;
    function cancel() { if (timer !== null) clock.clearTimeout(timer); timer = null; }
    function advance() {
      timer = null;
      if (paused || !queue.length) return;
      current = queue.shift(); shownAt = clock.now(); onFrame(current); schedule();
    }
    function schedule() {
      if (timer !== null || paused || !queue.length) return;
      // Catch up gently in fast simulations; bound the memory used by events.
      var dwell = queue.length > 6 ? Math.max(8, 140 * 6 / queue.length) : 140;
      var remaining = current && current.current ? Math.max(0, dwell - (clock.now() - shownAt)) : 0;
      if (remaining === 0) advance(); else timer = clock.setTimeout(advance, remaining);
    }
    return {
      get: function () { return current; },
      clear: function () { cancel(); current = null; queue = []; paused = false; },
      pause: function (value) { if (paused === value) return; paused = value; if (paused) cancel(); else schedule(); },
      push: function (run) {
        var snapshot = Object.assign({}, run);
        if (current && current.runId !== run.runId) { cancel(); queue = []; current = null; }
        if (run.phase === 'error' || run.phase === 'interrupted') {
          cancel(); queue = []; current = snapshot; onFrame(current); return;
        }
        if (queue.length >= 128) queue.shift();
        queue.push(snapshot); schedule();
      }
    };
  }
  return Object.freeze({ create: create, createPresentation: createPresentation });
}));
