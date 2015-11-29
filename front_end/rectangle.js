//rectangle
//Jake Ehrlich

function Rectangle(gui, w, h) {
  Colorable.call(this, gui);
  this.dimensions = {x:w, y:h};
  this.update();
}

Rectangle.prototype = Object.create(Colorable.prototype, {
  setColor: {value: function(clr) {
    this.nextColor = clr;
  }},
  renderWithColor: {value: function(context, xoff, yoff) {
    console.log(this.color);
    context.fillRect(this.position.x + xoff, this.position.y + yoff, this.dimensions.x, this.dimensions.y);
  }}
});
Rectangle.prototype.constructor = Rectangle;
