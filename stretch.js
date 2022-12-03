(function(Scratch) {
  'use strict';
  const vm = Scratch.vm;
  
  var scalex = 0;
  var scaley = 0;
  
  class morescale {
    getInfo () {
      return {
        id: 'moreScale',
        name: 'Stretch',
        blocks: [
          {
            opcode: 'setStretch',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set stretch to width: [SIZEX] height: [SIZEY]',
            arguments: {
              SIZEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              SIZEY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          }
        ]
      };
    }

    setStretch (args, util) {
		util.target.scalex = args["SIZEX"];
		util.target.scaley = args["SIZEY"];
        if (util.target.renderer) {
			const props = {};
			
			const renderedDirectionScale = scaledir(args,util);
			
			props.scale = renderedDirectionScale.scale;
			
			util.target.renderer.updateDrawableProperties(util.target.drawableID, props);
			
            if (util.target.visible) {
                util.target.runtime.requestRedraw();
            }
        }
    }
	
	
  }

  Scratch.extensions.register(new morescale());
})(Scratch);

function ROTATION_STYLE_LEFT_RIGHT () {
	return 'left-right';
}

function ROTATION_STYLE_NONE () {
	return "don't rotate";
}

clamp = function (a, low, high) {
  if (a === undefined) a = 0;
  if (low === undefined) low = 0;
  if (high === undefined) high = 0;
  return a < low ? low : a > high ? high : a;
}

scaledir = function (args, util) {
	// Default: no changes to `this.direction` or `this.scale`.
	let finalDirection = util.target.direction;
	let finalScale = [util.target.size * util.target.scalex / 100, util.target.size * util.target.scaley / 100];
	if (util.target.rotationStyle === ROTATION_STYLE_NONE()) {
		// Force rendered direction to be 90.
		finalDirection = 90;
	} else if (util.target.rotationStyle === ROTATION_STYLE_LEFT_RIGHT()) {
		// Force rendered direction to be 90, and flip drawable if needed.
		finalDirection = 90;
		if (util.target.direction < 0) {
			finalScale[0] *= -1;
		}
	}
	return {direction: finalDirection, scale: finalScale};
}
