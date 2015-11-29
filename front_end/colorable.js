//abstract colorable class
//Jake Ehrlich

function Colorable(gui, color) {
  Renderable.call(this, gui);
  this.color = color;
  this.nextColor = color;
}

Colorable.prototype = Object.create(Renderable.prototype, {
  setColor: {value: function(clr) {
    this.nextColor = clr;
  }},
  update: {value: function() {
    Renderable.prototype.update.apply(this);
    this.color = this.nextColor;
  }},
  render: {value: function(context, xoff, yoff) {
    var save = context.fillStyle;
    context.fillStyle = this.color;
    this.renderWithColor(context, xoff, yoff);
    context.fillStyle = save;
  }}
});
Colorable.prototype.constructor = Colorable;
