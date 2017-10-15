// This file is not used
// will not be using this
// loads the spritesheet and goes through the sprites
//offlimit decides where on the spritesheet the spirtes are
function SpriteSheet(path,frameWidth, frameHeight){
  this.image = new Image();
  this.image.src = path;
};

function Animation(spritesheet, offLimitX, offLimitY, width, height, frameSpeed, endFrame){
  var currentFrame = 0;
  var counter = 0;

  this.update = function(){
    if (counter == (frameSpeed - 1)) {
      currentFrame = (currentFrame + 1) % endFrame;
    }
    //update the counter
    counter = (counter + 1) % frameSpeed;
  }
  this.draw = function(x, y) {
    //abs value if the picture is turned, so it runs the correct way
    var absW = Math.abs(width);

    ctx.drawImage(
      spritesheet.image,
      currentFrame * width + offLimitX, offLimitY,
      absW, height,
      x, y,
      absW, height);
  }

}

var popTest = new SpriteSheet('../images/testPop.png', 564, 250),
popBack = new Animation(popTest, 0, 14, 62, 48, 20,9),
popLeft = new Animation(popTest, 0, 77, 62, 48, 20,9),
popDown = new Animation(popTest, 0, 139, 62, 48, 20,9),
popRight = new Animation(popTest, 0, 202, 62, 48, 20,9);
