/* Original LIEMS XML and Python contracts, using the bundled Blockly API. */
(function (global) {
  'use strict';

  var B = null;
  var language = 'en';
  var traceRunId = null;
  var traceLoopTypes = { controls_repeat: true, controls_repeat_ext: true, controls_for: true, controls_forEach: true, controls_whileUntil: true, control_while: true };
  var labels = {
    control_while: { labels: [['lặp khi', 'while'], ['thực hiện', 'do']], tip: ['Lặp khi điều kiện đúng; Webots vẫn xử lý tạm dừng và đặt lại.', 'Repeat while the condition is true; Webots can still pause or reset.'] },
    control_stop_all: { labels: [['dừng robot và hạ tay', 'stop robot and lower arm']], tip: ['Dừng chuyển động và đưa tay gắp về vị trí gốc.', 'Stop movement and return the gripper arm to its home position.'] },
    lists_append: { labels: [['vào danh sách', 'to list'], ['thêm', 'append']], tip: ['Thêm một phần tử vào cuối danh sách.', 'Add one item to the end of a list.'] },
    math_abs: { labels: [['trị tuyệt đối', 'absolute value']], tip: ['Lấy trị tuyệt đối của một số.', 'Return the absolute value of a number.'] },
    math_mod: { labels: [['chia lấy dư', 'remainder of'], ['cho', 'divided by']], tip: ['Lấy phần dư của phép chia.', 'Return the remainder after division.'] },
    math_round2: { labels: [['làm tròn', 'round'], ['đến số chữ số thập phân', 'to decimal places']], tip: ['Làm tròn đến số chữ số thập phân đã chọn.', 'Round to the chosen number of decimal places.'] },
    concattext: { labels: [['tạo văn bản từ', 'create text from'], ['+', '+']], tip: ['Ghép hai giá trị thành văn bản.', 'Join two values into text.'] },
    concattext2: { labels: [['văn bản', 'text'], ['+', '+']], tip: ['Ghép hai giá trị thành văn bản.', 'Join two values into text.'] },
    sensors_getdistance: { labels: [['đọc khoảng cách', 'read distance']], tip: ['Đọc cảm biến khoảng cách của robot; trả 99999 khi không có cảm biến.', 'Read the robot distance sensor; return 99999 when no sensor is available.'] },
    preview_stop: { labels: [['dừng di chuyển', 'stop moving']], tip: ['Dừng chuyển động. Đây là khối cuối của chuỗi lệnh.', 'Stop movement. This is the final block in its command chain.'] }
  };

  function label(input, type, index) {
    var value = labels[type].labels[index][language === 'vi' ? 0 : 1];
    input.appendField(new B.FieldLabel(value), '__liems_compat_label_' + index);
    return input;
  }

  function finish(block, colour, output, terminal) {
    block.setColour(colour);
    if (output) block.setOutput(true, output);
    else {
      block.setPreviousStatement(true, null);
      if (!terminal) block.setNextStatement(true, null);
    }
    block.setTooltip(labels[block.type].tip[language === 'vi' ? 0 : 1]);
  }

  function register(type, init) {
    B.Blocks[type] = { init: init };
  }

  function value(block, input, fallback, order) {
    return B.Python.valueToCode(block, input, order === undefined ? B.Python.ORDER_NONE : order) || String(fallback);
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'vi' ? 'vi' : 'en';
    return language;
  }

  function install(blockly, initialLanguage) {
    if (initialLanguage !== undefined) setLanguage(initialLanguage);
    if (B === blockly) return;
    B = blockly;
    B.Python.addReservedWords('robot,dist_sensor,while_tick,send_status,stop_all,getDistance,__liems_tick,__liems_delay,__liems_last_status,__liems_trace_json,__liems_trace_state,__liems_trace_emit,__liems_trace_block,__liems_trace_error');
    B.Python.INFINITE_LOOP_TRAP = '__liems_tick()\n';
    var generatorInit = B.Python.init;
    B.Python.init = function (workspace) {
      generatorInit.call(this, workspace);
      // Each generated program defines its own helpers without changing the
      // controller's delay(), while_tick() or status implementation.
      this.definitions_.liems_runtime = [
        'def __liems_tick():',
        this.INDENT + 'while_tick()',
        this.INDENT + 'now = robot.getTime()',
        this.INDENT + 'previous = globals().get("__liems_last_status", -1)',
        this.INDENT + 'if now < previous or now - previous >= 0.1:',
        this.INDENT + this.INDENT + 'globals()["__liems_last_status"] = now',
        this.INDENT + this.INDENT + 'reporter = globals().get("send_status")',
        this.INDENT + this.INDENT + 'if callable(reporter):',
        this.INDENT + this.INDENT + this.INDENT + 'reporter()',
        '',
        'def __liems_delay(seconds):',
        this.INDENT + 'try:',
        this.INDENT + this.INDENT + 'duration = float(seconds)',
        this.INDENT + 'except (TypeError, ValueError, OverflowError):',
        this.INDENT + this.INDENT + 'return',
        this.INDENT + 'if not (0 < duration < float("inf")):',
        this.INDENT + this.INDENT + 'return',
        this.INDENT + 'target = robot.getTime() + duration',
        this.INDENT + 'while robot.getTime() < target:',
        this.INDENT + this.INDENT + '__liems_tick()'
      ].join('\n');
      if (traceRunId !== null) {
        this.definitions_.liems_trace_import = 'import json as __liems_trace_json';
        this.definitions_.liems_trace_runtime = [
          '__liems_trace_state = {"runId": ' + JSON.stringify(traceRunId) + ', "step": 0, "blockId": None}',
          'def __liems_trace_emit(phase, block_id=None, message=None):',
          this.INDENT + 'if phase == "block":',
          this.INDENT + this.INDENT + '__liems_trace_state["blockId"] = block_id',
          this.INDENT + this.INDENT + '__liems_trace_state["step"] += 1',
          this.INDENT + 'payload = dict(__liems_trace_state)',
          this.INDENT + 'payload["phase"] = phase',
          this.INDENT + 'payload["time"] = robot.getTime()',
          this.INDENT + 'if message is not None:',
          this.INDENT + this.INDENT + 'payload["message"] = str(message)[:500]',
          this.INDENT + 'try:',
          this.INDENT + this.INDENT + 'robot.wwiSendText("TRACE:" + __liems_trace_json.dumps(payload, ensure_ascii=True, allow_nan=False))',
          this.INDENT + 'except Exception:',
          this.INDENT + this.INDENT + 'pass',
          '',
          'def __liems_trace_block(block_id):',
          this.INDENT + '__liems_trace_emit("block", block_id)'
        ].join('\n');
      }
    };
    var originalLoopTrap = B.Python.addLoopTrap;
    var originalInjectId = B.Python.injectId;
    B.Python.injectId = function (code, block) {
      // XML imports may contain quotes/newlines in IDs. The bundled injectId
      // only escapes '$'; use a quoted Python string for the trace path.
      if (traceRunId === null) return originalInjectId.call(this, code, block);
      return code.replace(/%1/g, function () { return JSON.stringify(String(block.id)); });
    };
    B.Python.addLoopTrap = function (branch, block) {
      if (traceRunId === null) return originalLoopTrap.call(this, branch, block);
      // One event per executed iteration. Native Blockly adds the prefix after
      // each body as well as before the whole loop; that overcounts iterations.
      return this.prefixLines(this.injectId('__liems_tick()\n__liems_trace_block(%1)\n', block), this.INDENT) + branch;
    };
    var originalBlockToCode = B.Python.blockToCode;
    B.Python.blockToCode = function (block, thisOnly) {
      if (traceRunId === null || !block || !traceLoopTypes[block.type]) return originalBlockToCode.call(this, block, thisOnly);
      var previous = block.suppressPrefixSuffix;
      block.suppressPrefixSuffix = true;
      try { return originalBlockToCode.call(this, block, thisOnly); }
      finally { if (previous === undefined) delete block.suppressPrefixSuffix; else block.suppressPrefixSuffix = previous; }
    };
    var originalFinish = B.Python.finish;
    B.Python.finish = function (body) {
      if (traceRunId === null) return originalFinish.call(this, body);
      var definitions = originalFinish.call(this, '');
      return definitions + '__liems_trace_emit("start")\ntry:\n' + this.prefixLines(body || 'pass\n', this.INDENT) +
        'except BaseException as __liems_trace_error:\n' +
        this.INDENT + 'if str(__liems_trace_error) in ("RESET", "WORLD_RESET", "NEW_CODE", "STOP_ALL"):\n' +
        this.INDENT + this.INDENT + '__liems_trace_emit("interrupted", message=str(__liems_trace_error))\n' +
        this.INDENT + 'else:\n' + this.INDENT + this.INDENT + '__liems_trace_emit("error", message=str(__liems_trace_error))\n' +
        this.INDENT + 'raise\nelse:\n' + this.INDENT + '__liems_trace_emit("end")\n';
    };
    register('control_while', function () {
      label(this.appendValueInput('COND').setCheck('Boolean'), this.type, 0);
      label(this.appendStatementInput('DO'), this.type, 1);
      finish(this, 240);
    });
    register('control_stop_all', function () {
      label(this.appendDummyInput(), this.type, 0); finish(this, 240);
    });
    register('lists_append', function () {
      label(this.appendValueInput('LIST').setCheck('Array'), this.type, 0);
      label(this.appendValueInput('ITEM'), this.type, 1); finish(this, 210);
    });
    register('math_abs', function () {
      label(this.appendValueInput('NUM').setCheck('Number'), this.type, 0); finish(this, 180, 'Number');
    });
    register('math_mod', function () {
      label(this.appendValueInput('A').setCheck('Number'), this.type, 0);
      label(this.appendValueInput('B').setCheck('Number'), this.type, 1);
      this.setInputsInline(true); finish(this, 180, 'Number');
    });
    register('math_round2', function () {
      label(this.appendValueInput('NUM').setCheck('Number'), this.type, 0);
      label(this.appendValueInput('DEC').setCheck('Number'), this.type, 1);
      this.setInputsInline(true); finish(this, 180, 'Number');
    });
    ['concattext', 'concattext2'].forEach(function (type) {
      register(type, function () {
        label(this.appendValueInput('A'), this.type, 0);
        label(this.appendValueInput('B'), this.type, 1); finish(this, 0, 'String');
      });
    });
    register('sensors_getdistance', function () {
      label(this.appendDummyInput(), this.type, 0); finish(this, 60, 'Number');
    });
    register('preview_stop', function () {
      label(this.appendDummyInput(), this.type, 0); finish(this, 120, null, true);
    });

    [
      ['motors_go_forward', 'go_forward'], ['motors_go_backward', 'go_backward'],
      ['motors_turn_left', 'turn_left'], ['motors_turn_right', 'turn_right']
    ].forEach(function (entry) {
      B.Python[entry[0]] = function (block) {
        return 'robot.' + entry[1] + '(' + value(block, 'speed', 50) + ')\n';
      };
    });
    B.Python.time_delay = function (block) { return '__liems_delay(' + value(block, 'ms', 1) + ')\n'; };
    B.Python.other_start = function () { return '# --- ROBOT PROGRAM ---\n'; };
    B.Python.other_end = function () { return ''; };
    B.Python.preview_stop = function () { return 'robot.go_forward(0)\n'; };
    B.Python.control_while = function (block) {
      var condition = value(block, 'COND', 'True');
      var branch = B.Python.statementToCode(block, 'DO');
      if (!branch.trim()) branch = B.Python.INDENT + 'pass\n';
      return 'while ' + condition + ':\n' + B.Python.INDENT + '__liems_tick()\n' +
        (traceRunId === null ? '' : B.Python.prefixLines(B.Python.injectId('__liems_trace_block(%1)\n', block), B.Python.INDENT)) + branch;
    };
    B.Python.controls_whileUntil = function (block) {
      var until = block.getFieldValue('MODE') === 'UNTIL';
      var condition = value(block, 'BOOL', 'False', until ? B.Python.ORDER_LOGICAL_NOT : B.Python.ORDER_NONE);
      var branch = B.Python.addLoopTrap(B.Python.statementToCode(block, 'DO'), block) || B.Python.PASS;
      return 'while ' + (until ? 'not ' : '') + condition + ':\n' + branch;
    };
    // stop_all() has the original physical-stop contract. It does not terminate
    // the Python program or discard any subsequent connected blocks.
    B.Python.control_stop_all = function () { return 'stop_all()\n'; };
    B.Python.lists_append = function (block) {
      return value(block, 'LIST', '[]', B.Python.ORDER_ATOMIC) + '.append(' + value(block, 'ITEM', 'None') + ')\n';
    };
    B.Python.math_abs = function (block) {
      B.Python.definitions_.import_math = 'import math';
      return ['math.fabs(' + value(block, 'NUM', 0) + ')', B.Python.ORDER_FUNCTION_CALL];
    };
    B.Python.math_mod = function (block) {
      return [value(block, 'A', 0, B.Python.ORDER_MULTIPLICATIVE) + ' % ' + value(block, 'B', 1, B.Python.ORDER_MULTIPLICATIVE), B.Python.ORDER_MULTIPLICATIVE];
    };
    B.Python.math_round2 = function (block) {
      // DEC is a value socket in existing XML, not a field. Read its block so
      // saved decimal-place values are respected instead of always using 2.
      return ['round(' + value(block, 'NUM', 0) + ', ' + value(block, 'DEC', 2) + ')', B.Python.ORDER_FUNCTION_CALL];
    };
    B.Python.concattext = function (block) {
      return ['str(' + value(block, 'A', "''") + ') + str(' + value(block, 'B', "''") + ')', B.Python.ORDER_ADDITIVE];
    };
    B.Python.concattext2 = B.Python.concattext;
    B.Python.sensors_getdistance = function () {
      B.Python.definitions_.liems_get_distance = [
        'def getDistance():',
        B.Python.INDENT + 'sensor = globals().get("dist_sensor")',
        B.Python.INDENT + 'if sensor is None:',
        B.Python.INDENT + B.Python.INDENT + 'return 99999',
        B.Python.INDENT + 'try:',
        B.Python.INDENT + B.Python.INDENT + 'return sensor.getValue()',
        B.Python.INDENT + 'except Exception:',
        B.Python.INDENT + B.Python.INDENT + 'return 99999'
      ].join('\n');
      return ['getDistance()', B.Python.ORDER_FUNCTION_CALL];
    };
  }

  function generateTraceCode(workspace, runId) {
    if (!B || !workspace) throw new Error('Blockly compatibility must be installed before generating trace code.');
    if (typeof runId !== 'string' || !/^[A-Za-z0-9._:-]{1,100}$/.test(runId)) throw new Error('Invalid execution trace runId.');
    var previousRun = traceRunId;
    var previousPrefix = B.Python.STATEMENT_PREFIX;
    var previousSuffix = B.Python.STATEMENT_SUFFIX;
    traceRunId = runId;
    B.Python.STATEMENT_PREFIX = '__liems_trace_block(%1)\n';
    B.Python.STATEMENT_SUFFIX = null;
    try { return B.Python.workspaceToCode(workspace); }
    finally {
      traceRunId = previousRun;
      B.Python.STATEMENT_PREFIX = previousPrefix;
      B.Python.STATEMENT_SUFFIX = previousSuffix;
    }
  }

  // Estimate explicit waits in statically known command chains. Dynamic
  // branches/while loops cannot truthfully produce a fixed duration or count.
  function estimateDuration(workspace) {
    var simple = { other_start: true, other_end: true, motors_go_forward: true, motors_go_backward: true, motors_turn_left: true, motors_turn_right: true, preview_stop: true, control_stop_all: true };
    function constant(block, name, fallback) {
      var input = block.getInputTargetBlock(name);
      var raw = input ? input.type === 'math_number' ? input.getFieldValue('NUM') : NaN : fallback;
      var result = Number(raw);
      if (!Number.isFinite(result)) throw new Error('dynamic');
      return result;
    }
    function chain(block, ancestors) {
      var seconds = 0, steps = 0, seen = new Set(ancestors);
      while (block) {
        if (seen.has(block.id)) throw new Error('cycle');
        seen.add(block.id);
        if (block.isEnabled()) {
          if (simple[block.type]) steps += 1;
          else if (block.type === 'time_delay') { seconds += Math.max(0, constant(block, 'ms', 1)); steps += 1; }
          else if (block.type === 'controls_repeat_ext' || block.type === 'controls_repeat') {
            var count = Math.max(0, Math.trunc(block.getField('TIMES') ? Number(block.getFieldValue('TIMES')) : constant(block, 'TIMES', 0)));
            if (!Number.isSafeInteger(count)) throw new Error('dynamic');
            var body = chain(block.getInputTargetBlock('DO'), seen);
            seconds += count * body.seconds; steps += count * (body.totalSteps + 1);
          } else throw new Error('dynamic');
          if (!Number.isFinite(seconds) || !Number.isSafeInteger(steps)) throw new Error('overflow');
        }
        block = block.getNextBlock();
      }
      return { seconds: seconds, totalSteps: steps };
    }
    try {
      var stacks = workspace.getTopBlocks(true).filter(function (block) { return !block.isShadow(); });
      if (!stacks.length) return { seconds: null, totalSteps: null };
      return stacks.reduce(function (total, block) {
        var result = chain(block, []);
        total.seconds += result.seconds; total.totalSteps += result.totalSteps;
        if (!Number.isFinite(total.seconds) || !Number.isSafeInteger(total.totalSteps)) throw new Error('overflow');
        return total;
      }, { seconds: 0, totalSteps: 0 });
    } catch (_) { return { seconds: null, totalSteps: null }; }
  }

  function relabelWorkspace(workspace, nextLanguage) {
    if (!B || !workspace) return;
    setLanguage(nextLanguage);
    B.Events.disable();
    try {
      workspace.getAllBlocks(false).forEach(function (block) {
        var descriptor = labels[block.type];
        if (!descriptor) return;
        descriptor.labels.forEach(function (translations, index) {
          var field = block.getField('__liems_compat_label_' + index);
          if (field) field.setValue(translations[language === 'vi' ? 0 : 1]);
        });
        block.setTooltip(descriptor.tip[language === 'vi' ? 0 : 1]);
      });
      var flyout = workspace.getFlyout && workspace.getFlyout();
      var palette = flyout && (flyout.getWorkspace ? flyout.getWorkspace() : flyout.workspace_);
      if (palette && palette !== workspace) relabelWorkspace(palette, language);
    } finally { B.Events.enable(); }
  }

  global.LiemsStudioCompat = {
    install: install,
    setLanguage: setLanguage,
    labels: labels,
    relabelWorkspace: relabelWorkspace,
    generateTraceCode: generateTraceCode,
    estimateDuration: estimateDuration
  };
})(window);
