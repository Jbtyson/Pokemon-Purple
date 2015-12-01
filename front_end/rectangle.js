//rectangle
//Jake Ehrlich

function Rectangle(gui, w, h) {
  Colorable.call(this, gui);
  this.dimensions = {x:w, y:h};
}

Rectangle.prototype = Object.create(Colorable.prototype, {
  renderWithColor: {value: function(context, xoff, yoff) {
    context.fillRect(this.position.x + xoff, this.position.y + yoff, this.dimensions.x, this.dimensions.y);
  }}
});
Rectangle.prototype.constructor = Rectangle;
