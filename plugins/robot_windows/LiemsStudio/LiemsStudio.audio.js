/* Native bundled Blockly sounds, embedded because Webots R2023b's HTTP
 * extension allowlist does not serve MP3/WAV files. Original Blockly assets. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LiemsStudioAudio = factory();
}(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  var assets = /* LIEMS_ASSETS_START */ {"click":{"mime":"audio/mpeg","url":"data:audio/mpeg;base64,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qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+5LEfAPAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"},"disconnect":{"mime":"audio/wav","url":"data:audio/wav;base64,UklGRswFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRQEAAAAAAAAAAABAP//AAABAP//AQD//wEA//8BAP//AQD//wEA/v8DAP7/AAABAP7/AwD9/wMA/f8CAAAA/v8DAP3/AgD//wEA//8AAAEA/v8DAP3/AgD//wAAAQD+/wIA//8AAAAAAAAAAAEA/v8DAPz/BAD9/wIAAAD+/wIA//8BAP7/AwD9/wMA/f8CAP//AQD//wAAAQD//wEA/v8CAP//AAABAP//AAABAP//AAABAP//AACUALkAiwAOADr/Y/7A/Z/96v3A/uz/HQEhAoXzSPOV9OX10/b89qz2lPa19qH3XPr0/lYF6wtnEKgREBCSDW0LsQg+Azv6PfDH6Pjk4eQP5wjsK/aRBFQQ5BdTHMgdSB2yHDQbExQZBxD4DOuP5GzkbOY16xb1WgATCnwRAhQaESkLWQJx9+zttefY5NTkVeaF6XXx7/8tD7wYyRtxGxsaYBcAEY0EdPVC6kflK+W+6HjvZvlNBWoPoRVYGBYXSxG7CIn+P/T07DfpKujz6QTv6PYhAWgL5xLhFwQaoxfNEbQJGwAj933w1etD6lDtBPMS+rcBuAfKCjgL/AgfBG7+SvmP9bH0fPYg+ij/ywRzCVcMNg2sC0IIVQSJAKT9vPvP+sf6n/u9/Pr83vus+Xf3Dvb49Wj3MPrl/SYCCAZBCfYKBgvdCdQHRAV8Ao//MP2k+zj7/Pub/TT/jgADAk4DZQRGBeIFlQVxBGICfP+y/DL6xffo9R31ZvUC9wb6y/1vAZwEggbOBrEFLAPT/+L8nPpA+Vz56/pT/bAAwwRmCKwKfws6CjwHPwMc/2b74Ph591X3o/gr+17+/AH/BPEGmwcgB/kEvAEt/sX6PPgt9zL3Hfgh+u38GgAnA3kFrQa5BrcFvgNuAYT/EP53/cf9uv7h/yoBYwJUA84DkgN4AhABtf9b/vD87fsu+/v6ifuD/Nf9cv8jAXICdgO6Ay0DGQKtAAr/2v1e/XT9Xf6i//wAQgI5A14D0gLWAXUAPv9Y/vv9Nv7v/uD/4gCmAfgBqgH9AK3/X/48/ZX8m/xT/Wr+sv8IAfQBXwKLAm4CFwKZARUBfgD+/2L/rv4P/sX9pv3Q/XH+f/8DAZgCswP8A4EDOAJOAC/+bPyJ+877BP2t/pgAJwJIA54D8wKCAez/tf74/Qn+y/7T/xQB+gGmAs4CjAK+AZgAm//b/mb+SP5f/uv+jv8YAHAA0AA4AWoBfgFDAdYATQDC/1j/5P62/rH++/5h/+3/OwCNAKAAuQC3ANsAKgF/AckB1QGbAeEAvv8+/vb8Z/yU/HX97v7ZAIsCrwMJBLYD6wKZAfT/qP7j/bv9EP7N/uP//QDpAYYCjAJVAtcBLAF1AOf/ZP/k/kb+1P2+/Sv+9f7E/7cArgFMSVNUugAAAElORk9JTkFNHgAAAFBvcHBpbmcgTGlkIG9mIExpcGJhbG0gU3RpY2sAAElBUlQKAAAAU3RhcmxpdGUAAElDTVRoAAAAU291cmNlOiBodHRwOi8vd3d3LnBkc291bmRzLm9yZy9zb3VuZHMvcG9wcGluZ19saWRfb2ZfbGlwYmFsbV9zdGljayBNb2RpZmllZCBhbmQgcmVtaXhlZCBieSBHb29nbGUgSW5jLgBJQ1JEBgAAADIwMDYAAGlkMyDKAAAASUQzAwAAAAABP1RJVDIAAAAdAAAAUG9wcGluZyBMaWQgb2YgTGlwYmFsbSBTdGlja1REUkMAAAAFAAAAMjAwNlRQRTEAAAAJAAAAU3RhcmxpdGVDT01NAAAAbAAAAAAAAABTb3VyY2U6IGh0dHA6Ly93d3cucGRzb3VuZHMub3JnL3NvdW5kcy9wb3BwaW5nX2xpZF9vZl9saXBiYWxtX3N0aWNrIE1vZGlmaWVkIGFuZCByZW1peGVkIGJ5IEdvb2dsZSBJbmMuAA=="},"delete":{"mime":"audio/mpeg","url":"data:audio/mpeg;base64,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utaxn5+dZ3in/xneM/H3/mS2fqPnX/p/801nxYvYJypGhRLKMSAHCYYFAVHALHyMETQIJNa1GRiPDTPMv51jEZGYtjIp//uSxBGAGbnHQBSXgAr4wypnDLABHRKdplkapUiZC4P83Ue1JU5UOsplpJwkPmRKGxS/I9pE+LpMUsB2u2+rLFiHNGRJkppqKVWHsujciNrDFcbuDxmSzm9UqcSarnbXTtzQ1uTHYaqx4wMCrUyoSjhAeKRCHPTJEVr1ZjzuLAxVb2VW1Z3BsZtw611vVHlfEhWexoWYO4UL5hWgwaWxuubX/p94+qWzXXtXG8/M1v/8QsTTapqlo2/nM0Qh+gPBoQAAAAAAAABhp3sI1ZpZQxOyai1vs0QJZuPBCnFjAbA8kECcaLmRYPg9kpBEdwCQ65fLXDe6nLmA/FEmh5A8XW8mHjjh8JZAmyJqNolc8e2kRckpm67zQ2XBGciXh/JZOPPVhFyxc4h1HwrTDzRqKCFUHYaAEUHvS7dK0nZlZ+9BOlvg3HebG55cdZIJhMOJaXXXF7PnmULexvENpu9hyzip973vfZ+P+J+v//////i6/n//////6hBiFUseHkAAAAAUGVL9kRyJfRVJVmWrB/Xf/wzqXKlhsMG20MNsm9VzAP/7ksQSABiV2U64l4ACjTRd1yVAANtFV8F69Txd5jw3EbmuJ8WrpVnEvqEuLK4t0GrEroXxatY6+cJIiCkCIp9Fw5TQn+vi2LWCPIM6S/IMM1XgB0BQgwdZjNc8O+a1/zi3AHIJpD1uRDiiJMLqoi2xq628hbzB9P//b/5qyVfqlSoSintn0FuclEzZ+8bxj3z/n/WdYz////+1sUdlsnZlbFbqwrb///////+4lVh0CzP/ETywAEAAABRJDwsmF54GqAl/g30G/eBpuIGgngW0/gYcQGNi+BgTH+AKQBEGAiACzwf3/wTDA2BAICgErAMOWCxv/8B6AAUgCgoigWNB3Qtp//iExRAXECkAMeQAWUgYAiG2AEH///wCBoEhoWND6C54LUi0hZCNArhqn///wCSgWNDCASKANDBeYatGNEehgYR0TYWXBswjb////8QlFyiOgQBRVUxBTUUzLjk4LjJVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5LEJIPAAAGkHAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"}} /* LIEMS_ASSETS_END */;
  Object.keys(assets).forEach(function (name) { Object.freeze(assets[name]); });
  Object.freeze(assets);
  var installed = [];

  function handlePlayback(audio) {
    var play = audio.play;
    audio.play = function () {
      try {
        var result = play.apply(this, arguments);
        // Browser autoplay can reject until the first trusted interaction.
        // Consume that rejection without changing Blockly's sound timing.
        if (result && typeof result.catch === 'function') result.catch(function () {});
        return result;
      } catch (_) { return undefined; }
    };
    if (typeof audio.cloneNode === 'function') {
      var clone = audio.cloneNode;
      audio.cloneNode = function () { return handlePlayback(clone.apply(this, arguments)); };
    }
    return audio;
  }

  function install(blockly) {
    if (!blockly || !blockly.inject || typeof blockly.inject.loadSounds_ !== 'function') return false;
    if (installed.indexOf(blockly) !== -1) return true;
    installed.push(blockly);
    blockly.inject.loadSounds_ = function (_mediaPath, workspace) {
      var manager = workspace.getAudioManager();
      var AudioConstructor = blockly.utils.global.Audio;
      if (typeof AudioConstructor !== 'function' || !manager || !manager.SOUNDS_) return;
      Object.keys(assets).forEach(function (name) {
        try {
          var audio = new AudioConstructor();
          if (typeof audio.canPlayType !== 'function' || !audio.canPlayType(assets[name].mime)) return;
          audio.src = assets[name].url;
          audio.preload = 'auto';
          // WorkspaceAudio.load() in this exact bundled version tests the URL's
          // file extension, so a data URL cannot enter through load(). Keep its
          // native playback, clone, rate limit and parent-workspace behavior.
          manager.SOUNDS_[name] = handlePlayback(audio);
        } catch (_) { /* Audio may be unavailable; Blockly remains usable. */ }
      });
      var document = blockly.utils.global.document;
      if (!document || typeof document.addEventListener !== 'function') return;
      function preload() {
        document.removeEventListener('pointerdown', preload, true);
        document.removeEventListener('keydown', preload, true);
        if (manager.SOUNDS_) manager.preload();
      }
      // Preload after an actual click/key gesture instead of a mere mousemove.
      document.addEventListener('pointerdown', preload, true);
      document.addEventListener('keydown', preload, true);
    };
    return true;
  }
  return Object.freeze({ install: install, assets: assets });
}));
