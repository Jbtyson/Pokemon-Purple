import "renderable.js"

function Text(gui, width, height) {
  super(gui);
  this.dimensions = { x:width, y:height };
  this.position = { x:0, y:0 };
  this.rendertext = ""
  this.text = "";
  this.color = "#000000";
  this.parent = null;
  this.onClick = null;
}

Text.prototype = Object.create(Renderable.prototype, {
  setText: function(txt) {
    this.text = txt;
  },
  update: function() {
    this.rendertext = this.text;
  },
  render: function(context, xoff, yoff) {
    var save = context.fillColor;
    context.fillColor = this.color;
    context.fillText(this.rendertext, this.position.x + xoff, this.position.y + yoff);
    context.fillColor = save;
  }
});
