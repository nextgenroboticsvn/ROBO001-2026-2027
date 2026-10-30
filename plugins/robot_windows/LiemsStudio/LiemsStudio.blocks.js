/* Studio arm contracts and intentionally locked grip/release commands. */
(function (global) {
  'use strict';

  var B = null;
  var lockedTypes = ['gripper_grip', 'gripper_release'];
  var armDefaults = { arm_up: 250, arm_down: 50 };
  var svgNamespace = 'http://www.w3.org/2000/svg';

  function isLocked(blockOrType) {
    return lockedTypes.indexOf(typeof blockOrType === 'string' ? blockOrType : blockOrType && blockOrType.type) !== -1;
  }

  function quiet(action) {
    B.Events.disable();
    try { return action(); } finally { B.Events.enable(); }
  }

  function svgElement(name, attributes, parent) {
    var element = global.document.createElementNS(svgNamespace, name);
    Object.keys(attributes).forEach(function (key) { element.setAttribute(key, attributes[key]); });
    if (parent) parent.appendChild(element);
    return element;
  }

  function decorateBlock(block, language) {
    if (!isLocked(block) || !block.getSvgRoot || block.isInsertionMarker && block.isInsertionMarker()) return;
    var root = block.getSvgRoot();
    if (!root || !block.rendered) return;
    root.classList.add('liems-locked-block');
    root.setAttribute('aria-disabled', 'true');
    var icon = Array.prototype.find.call(root.children, function (child) { return child.getAttribute('data-liems-lock') === 'true'; });
    if (!icon) {
      icon = svgElement('g', { 'data-liems-lock': 'true', 'class': 'liems-block-lock', 'pointer-events': 'none', 'aria-hidden': 'true' }, root);
      svgElement('title', {}, icon);
      svgElement('circle', { r: 13, 'class': 'liems-lock-disc' }, icon);
      svgElement('path', { d: 'M-4-2v-3a4 4 0 0 1 8 0v3', 'class': 'liems-lock-stroke' }, icon);
      svgElement('rect', { x: -6, y: -2, width: 12, height: 10, rx: 2, 'class': 'liems-lock-stroke' }, icon);
      svgElement('path', { d: 'M0 2v3', 'class': 'liems-lock-stroke' }, icon);
    }
    // BlockSvg.getHeightWidth() includes the whole connected stack. Center on
    // this block's own rendered body instead, including in imported projects.
    var centerX = (block.RTL ? -1 : 1) * block.width / 2;
    icon.setAttribute('transform', 'translate(' + centerX + ',' + block.height / 2 + ')');
    var lang = language || global.document.documentElement && global.document.documentElement.lang;
    icon.firstChild.textContent = lang === 'en' ? 'Locked: grip and release are not available yet.' : 'Đang khóa: gắp và thả vật chưa khả dụng.';
    root.appendChild(icon);
  }

  function lockBlock(block) {
    // The native disabled state blocks mouse drag, click and keyboard insertion
    // in this bundled Blockly flyout and excludes the command from Python code.
    // Guard setEnabled as XML deserialization can otherwise re-enable a block
    // after init. This leaves IDs, values, connections and later blocks intact.
    var setEnabled = block.setEnabled;
    block.setEnabled = function () { return setEnabled.call(this, false); };
    quiet(function () { block.setEnabled(false); block.setEditable(false); });
    if (typeof block.render === 'function') {
      var render = block.render;
      block.render = function () {
        var result = render.apply(this, arguments);
        decorateBlock(this);
        return result;
      };
    }
  }

  function decorateWorkspace(workspace, language) {
    if (!workspace || !workspace.getAllBlocks) return;
    workspace.getAllBlocks(false).forEach(function (block) { decorateBlock(block, language); });
    var flyout = workspace.getFlyout && workspace.getFlyout();
    var palette = flyout && (flyout.getWorkspace ? flyout.getWorkspace() : flyout.workspace_);
    if (palette && palette !== workspace) decorateWorkspace(palette, language);
  }

  function install(Blockly) {
    if (B === Blockly) return;
    B = Blockly;
    ['arm_up', 'arm_down'].forEach(function (type) {
      // Keep the existing XML input name while using relative millimetres.
      // Each command waits for the arm to reach its clamped target.
      B.Blocks[type] = {
        init: function () {
          this.jsonInit({
            type: type,
            message0: (type === 'arm_up' ? 'raise arm by' : 'lower arm by') + ' %1 mm',
            args0: [{ type: 'input_value', name: 'height', check: 'Number' }],
            previousStatement: null,
            nextStatement: null,
            colour: 290,
            tooltip: '',
            helpUrl: ''
          });
        }
      };
      B.Python[type] = function (block) {
        var height = B.Python.valueToCode(block, 'height', B.Python.ORDER_NONE) || String(armDefaults[type]);
        return 'robot.' + (type === 'arm_up' ? 'lift_up' : 'lift_down') + '(' + height + ')\n';
      };
    });
    lockedTypes.forEach(function (type) {
      var definition = B.Blocks[type];
      if (!definition || typeof definition.init !== 'function') return;
      var init = definition.init;
      definition.init = function () {
        init.apply(this, arguments);
        lockBlock(this);
      };
    });
  }

  global.LiemsPreviewBlocks = {
    install: install,
    isLocked: isLocked,
    decorateBlock: decorateBlock,
    decorateWorkspace: decorateWorkspace,
    lockedBlocks: function (workspace) { return workspace.getAllBlocks(false).filter(isLocked); },
    armDefaults: Object.freeze(armDefaults)
  };
})(window);
