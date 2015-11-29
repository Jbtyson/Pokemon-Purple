//rectangle
//Jake Ehrlich

function Rectangle(gui, color, x, y, w, h) {
  Colorable.call(this, gui);
  this.position = {x:x, y:y};
  this.dimensions = {x:w, y:h};
}

Rectangle.prototype = Object.create(Colorable.prototype, {
  setColor: {value: function(clr) {
    this.nextColor = clr;
  }},
  renderWithColor: {value: function(context, xoff, yoff) {
    context.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
  }}
});
Rectangle.prototype.constructor = Rectangle;
