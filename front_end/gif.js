//class for loading and displaying gifs
//Jake Ehrlich

function SpriteSheet(gui, src, scale) {
  Renderable.call(this, gui);

  this.img = new Image();
  this.sheet = new Image();
  this.ready = false;
  var img = this;
  this.img.onload = function() {
    img.dimensions.x = scale * img.img.width;
    img.dimensions.y = scale * img.img.height;
    img.sheet.onload = function() {
      img.ready = true;
      img.totalWidth = img.sheet.width;
      console.log("it's aliiiiiive!");
    }
    img.sheet.src = src + ".gif.png";
  }
  this.img.src = src + ".gif";
}

SpriteSheet.prototype = Object.create(Renderable.prototype, {
  render: {value: function(context, xoff, yoff) {
    if(this.ready) {
      var d = new Date();
      var n = d.getTime();
      var totalTime = 4500.0; //total time in milisecods
      var frameCount = Math.ceil(this.sheet.width / this.img.width);
      var frameTime = (n % totalTime);
      var frameNumber = Math.floor((frameTime / totalTime) * frameCount);
      context.drawImage(this.sheet, //src
                        frameNumber * this.img.width + 1, 0, //sx, sy
                        this.img.width - 1, this.img.height, //sw, sh
                        this.position.x + xoff, this.position.y + yoff, //dx, dy
                        this.dimensions.x, this.dimensions.y //dw, dh
                      );
    }
  }}
});
SpriteSheet.prototype.constructor = SpriteSheet;


function RenderableImage(gui, src, scale) {
  Renderable.call(this, gui);

  this.img = new Image();
  var img = this;
  this.img.onload = function() {
    img.dimensions.x = scale * img.img.width;
    img.dimensions.y = scale * img.img.height;
  }
  this.img.src = src;
}

RenderableImage.prototype = Object.create(Renderable.prototype, {
  render: {value: function(context, xoff, yoff) {
    context.drawImage(this.img,
      this.position.x + xoff, this.position.y + yoff,
      this.dimensions.x,      this.dimensions.y);
  }}
});
RenderableImage.prototype.constructor = RenderableImage;
