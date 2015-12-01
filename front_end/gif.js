//class for loading and displaying gifs
//Jake Ehrlich

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
