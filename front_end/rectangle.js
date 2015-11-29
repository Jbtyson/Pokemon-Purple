//rectangle
//Jake Ehrlich

function Rectangle(gui, spacing) {
  Group.call(this, gui);
  this.spacing = spacing;
}

Rectangle.prototype = Object.create(Renderable.prototype, {
  render: {value: function(context, xoff, yoff) {
    
  }}
});
Rectangle.prototype.constructor = Rectangle;
