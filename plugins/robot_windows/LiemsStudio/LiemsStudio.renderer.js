/* LIEMS Studio renderer. Uses the bundled Thrasos drawing/measurement pipeline.
 * Only presentation constants and connector paths change; block definitions,
 * input/connection types, generators, IDs and saved XML stay with Blockly.
 */
(function (global) {
  'use strict';
  const name = 'liems_lab';
  const tokens = Object.freeze({
    cornerRadius: 4,
    notchWidth: 18,
    notchHeight: 5,
    notchShoulder: 3,
    valueTabSpan: 18,
    valueTabDepth: 5,
    valueTabShoulder: 3,
    smallPadding: 4,
    mediumPadding: 7,
    mediumLargePadding: 10,
    largePadding: 12,
    minimumBlockHeight: 30,
    inputRadius: 4,
    inputHeight: 20,
    inputPaddingX: 7,
    inputPaddingY: 4,
    inputSurface: '#ffffff',
    labelFontFamily: "'Segoe UI', Arial, sans-serif",
    // Blockly font constants use points; 9.75pt matches the preview's 13px text.
    labelFontSize: 9.75,
    labelFontWeight: '600',
    startCapWidth: 64,
    startCapHeight: 8,
    startCapShoulder: 10,
    outlineShade: 0.18
  });

  function install(Blockly) {
    if (Blockly.registry.hasItem(Blockly.registry.Type.RENDERER, name)) return name;
    if (!Blockly.thrasos || !Blockly.thrasos.Renderer) {
      throw new Error('Robot Studio requires the bundled Blockly Thrasos renderer.');
    }
    class LabConstants extends Blockly.blockRendering.ConstantProvider {
      constructor() {
        super();
        this.CORNER_RADIUS = tokens.cornerRadius;
        this.NOTCH_WIDTH = tokens.notchWidth;
        this.NOTCH_HEIGHT = tokens.notchHeight;
        this.TAB_HEIGHT = tokens.valueTabSpan;
        this.TAB_WIDTH = tokens.valueTabDepth;
        this.SMALL_PADDING = tokens.smallPadding;
        this.MEDIUM_PADDING = tokens.mediumPadding;
        this.MEDIUM_LARGE_PADDING = tokens.mediumLargePadding;
        this.LARGE_PADDING = tokens.largePadding;
        this.MIN_BLOCK_HEIGHT = tokens.minimumBlockHeight;
        this.TOP_ROW_MIN_HEIGHT = tokens.mediumPadding;
        this.BOTTOM_ROW_MIN_HEIGHT = tokens.mediumPadding;
        this.EMPTY_STATEMENT_INPUT_HEIGHT = tokens.minimumBlockHeight;
        this.FIELD_BORDER_RECT_RADIUS = tokens.inputRadius;
        this.FIELD_BORDER_RECT_HEIGHT = tokens.inputHeight;
        this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = tokens.inputHeight;
        this.FIELD_BORDER_RECT_X_PADDING = tokens.inputPaddingX;
        this.FIELD_BORDER_RECT_Y_PADDING = tokens.inputPaddingY;
        this.FIELD_BORDER_RECT_COLOUR = tokens.inputSurface;
        this.FIELD_TEXT_FONTFAMILY = tokens.labelFontFamily;
        this.FIELD_TEXT_FONTSIZE = tokens.labelFontSize;
        this.FIELD_TEXT_FONTWEIGHT = tokens.labelFontWeight;
        this.ADD_START_HATS = true;
        this.START_HAT_HEIGHT = tokens.startCapHeight;
        this.START_HAT_WIDTH = tokens.startCapWidth;
      }
      makeNotch() {
        const width = this.NOTCH_WIDTH, height = this.NOTCH_HEIGHT;
        const shoulder = tokens.notchShoulder, inset = width - shoulder * 2;
        // Both directions share the same socket width and depth. Blockly still
        // positions/snap-checks the connections using this shape's dimensions.
        const path = direction => ' l ' + (direction * shoulder) + ',0 0,' + height + ' ' +
          (direction * inset) + ',0 0,' + (-height) + ' ' + (direction * shoulder) + ',0 ';
        return {
          type: this.SHAPES.NOTCH,
          width,
          height,
          pathLeft: path(1),
          pathRight: path(-1)
        };
      }
      makePuzzleTab() {
        const width = this.TAB_WIDTH, height = this.TAB_HEIGHT;
        const shoulder = tokens.valueTabShoulder, inset = height - shoulder * 2;
        // The same rectangular profile is used by output tabs and their input
        // sockets. Keep Blockly's PUZZLE shape type: visual geometry changes,
        // while Number/String/Boolean connection checks remain native.
        const path = direction => ' l 0,' + (direction * shoulder) + ' ' + (-width) + ',0 0,' +
          (direction * inset) + ' ' + width + ',0 0,' + (direction * shoulder) + ' ';
        return {
          type: this.SHAPES.PUZZLE,
          width,
          height,
          pathDown: path(1),
          pathUp: path(-1)
        };
      }
      makeStartHat() {
        const width = this.START_HAT_WIDTH, height = this.START_HAT_HEIGHT;
        const shoulder = tokens.startCapShoulder;
        return {
          width,
          height,
          path: ' l ' + shoulder + ',' + (-height) + ' ' + (width - shoulder * 2) + ',0 ' + shoulder + ',' + height + ' '
        };
      }
      generateTertiaryColour_(colour) {
        return Blockly.utils.colour.blend('#000000', colour, tokens.outlineShade) || colour;
      }
    }
    class LabRenderer extends Blockly.thrasos.Renderer {
      makeConstants_() { return new LabConstants(); }
    }
    Blockly.blockRendering.register(name, LabRenderer);
    return name;
  }
  global.LiemsPreviewRenderer = Object.freeze({ name, tokens, install });
})(typeof window === 'undefined' ? globalThis : window);
