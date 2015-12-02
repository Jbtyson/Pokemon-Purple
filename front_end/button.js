//rectangle
//Jake Ehrlich

function Button(gui, w, h, color, text, xoff, yoff) {
  Renderable.call(this, gui);

  this.dimensions.x = w;
  this.dimensions.y = h;

  this.boarder = new Rectangle(gui, w, h);
  this.boarder.setColor("darkslategray");
  this.boarder.update();

  this.button = new Rectangle(gui, w - 8, h - 8);
  this.button.setPosition(4, 4);
  this.button.setColor(color);
  this.button.update();

  //this.fore = new Rectangle(gui, w - 8, h - 8);
  //this.fore.setPosition(8, 8);
  //this.fore.setColor("#00000077");

  this.textBox = new Text(gui, w, h);
  this.textBox.setText(text);
  this.textBox.setPosition(xoff, yoff);
  this.textBox.setColor("white");
  this.textBox.update();
}

Button.prototype = Object.create(Renderable.prototype, {
  update: {value : function() {
    Renderable.prototype.update.apply(this);
    //TODO: update list?
    this.textBox.update();
    this.boarder.update();
    this.button.update();
  }},
  render: {value: function(context, xoff, yoff) {
    //TODO: render list?
    this.boarder.render(context, this.position.x + xoff, this.position.y + yoff);
    this.button.render(context, this.position.x + xoff, this.position.y + yoff);
    this.textBox.render(context, this.position.x + xoff, this.position.y + yoff);
  }}
});
Button.prototype.constructor = Button;
