
function Text(gui, width, height) {
  Colorable.call(this, gui, "#000000");
  this.dimensions = { x:width, y:height };
  this.position = { x:0, y:0 };
  this.rendertext = ""
  this.text = "";
  this.font = "12px serif";
  this.nextFont = this.font;
  this.parent = null;
  this.onClick = null;
}

Text.prototype = Object.create(Colorable.prototype, {
  setText: {value: function(txt) {
    this.text = txt;
  }},
  setFont: {value: function(fnt) {
    this.nextFont = fnt;
  }},
  update: {value: function() {
    Colorable.prototype.update.apply(this);
    this.rendertext = this.text;
    this.font = this.nextFont;
  }},
  renderWithColor: {value: function(context, xoff, yoff) {
    context.textBaseline = "top";
    context.font = this.font;
    context.fillText(this.rendertext, this.position.x + xoff, this.position.y + yoff);
  }}
});
Text.prototype.constructor = Text;
