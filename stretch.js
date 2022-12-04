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
			
			let finalScale = [util.target.size * util.target.scalex / 100, util.target.size * util.target.scaley / 100];
			if (util.target.rotationStyle === 'left-right' && util.target.direction < 0) {
				finalScale[0] *= -1;
			}
			
			props.scale = finalScale;
			
			util.target.renderer.updateDrawableProperties(util.target.drawableID, props);
			
            if (util.target.visible) {
                util.target.runtime.requestRedraw();
            }
        }
    }
	
	
  }

  Scratch.extensions.register(new morescale());
})(Scratch);
