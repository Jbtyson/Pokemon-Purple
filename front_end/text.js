
function Text(gui, width, height) {
  Renderable.call(this, gui);
  this.dimensions = { x:width, y:height };
  this.position = { x:0, y:0 };
  this.rendertext = ""
  this.text = "";
  this.color = "#000000";
  this.nextColor = this.color;
  this.font = "10px Visitor";
  this.nextFont = this.font;
  this.parent = null;
  this.onClick = null;
}

Text.prototype = Object.create(Renderable.prototype, {
  setText: {value: function(txt) {
    this.text = txt;
  }},
  setFont: {value: function(fnt) {
    this.nextFont = fnt;
  }},
  setText: {value: function(clr) {
    this.nextColor = clr;
  }},
  update: {value: function() {
    this.rendertext = this.text;
    this.color = this.nextColor;
    this.font = this.nextFont;
  }},
  render: {value: function(context, xoff, yoff) {
    var save = context.fillColor;
    context.fillColor = this.color;
    context.textBaseline = "top";
    context.font = this.font;
    context.fillText(this.rendertext, this.position.x + xoff, this.position.y + yoff);
    context.fillColor = save;
  }}
});
Text.prototype.constructor = Text;
