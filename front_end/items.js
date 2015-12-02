//abstract colorable class
//Jake Ehrlich

//the nice thing about realtive positions is that you can
//design sub guis quite nicely
//They do wind up being rather large however which isn't as nice
function BagMenu(gui, mainBoxW, mainBoxH) {
  Renderable.call(this, gui);

  this.bigOrange = new Rectangle(gui, 600, 450);
  this.bigOrange.setColor("orange");
  this.bigOrange.update();

  this.bigBlue = new Rectangle(gui, mainBoxW, mainBoxH);
  this.bigBlue.setLocation(0, 120);
  this.bigBlue.setColor("blue");
  this.bigBlue.update();

  this.littleBlue = new Rectangle(gui, mainBoxW, 10);
  this.littleBlue.setLocation(0, 120);
  this.littleBlue.setColor("darkblue");
  this.littleBlue.update();

  this.vbox = new HBox(gui, 10);
}

BagMenu.prototype = Object.create(Renderable.prototype, {
  add: {value : function(value) {
    var item = new Text(this.gui, 40, 600);
    item.setText(value);
    item.update();
    this.vbox.add(item);
  }},
  onSwipe: {value : function() {

  }},
  onClick: {value : function(x, y) {
    if(inBox(this.bigBlue.position, this.bigBlue.dimensions, x - this.position.x, y - this.position.y)) {
      this.gobtn.onClick(x, y);
      return;
    }
    if(this.vbox.children.length != 0) {
      this.vbox.add(this.vbox.children[0]);
      this.vbox.shift();
    }
  }},
  update: {value : function() {
    Renderable.prototype.update.apply(this);
    this.vbox.update();
  }},
  render: {value: function(context, xoff, yoff) {
    var xoff = xoff + this.position.x;
    var yoff = yoff + this.position.y;
    renderList([this.bigOrange, this.vbox, this.bigBlue, littleBlue, ], context, xoff, yoff);
  }}
});
BagMenu.prototype.constructor = BagMenu;
