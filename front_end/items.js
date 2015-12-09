//abstract colorable class
//Jake Ehrlich

//the nice thing about realtive positions is that you can
//design sub guis quite nicely
//They do wind up being rather large however which isn't as nice
function BagMenu(gui, title, mainBoxW, mainBoxH, blueBoxH, sideBoxW) {
  Renderable.call(this, gui);

  this.dimensions.x = mainBoxW;
  this.dimensions.y = mainBoxH;

  this.itemsLabel = new Button(gui, sideBoxW, 64, "orange", title, 50, 24);
  this.itemsLabel.textBox.setFont('22px Arial');
  this.itemsLabel.textBox.setColor('black');
  this.itemsLabel.textBox.update();

  this.upBtn = new Button(gui, sideBoxW - 24, 64, "green", "Up", 55, 24);
  this.upBtn.setPosition(12, 100);
  this.upBtn.update();

  this.downBtn = new Button(gui, sideBoxW - 24, 64, "green", "Down", 48, 24);
  this.downBtn.setPosition(12, 130 + 80);
  this.downBtn.update();

  this.bigCyan = new Rectangle(gui, sideBoxW, mainBoxH);
  this.bigCyan.setColor("darkcyan");
  this.bigCyan.update();

  this.bigOrange = new Button(gui, mainBoxW - sideBoxW, mainBoxH, "#ffc966", "", 0, 0);
  this.bigOrange.setPosition(sideBoxW, 0);
  this.bigOrange.update();

  this.bigBlue = new Button(gui, mainBoxW, blueBoxH, "#0074e6", "Go Back", 40, 40);
  this.bigBlue.setPosition(0, mainBoxH - blueBoxH);
  this.bigBlue.update();

  //this.littleBlue = new Rectangle(gui, mainBoxW, 10);
  //this.littleBlue.setPosition(0, mainBoxH - blueBoxH);
  //this.littleBlue.setColor("darkblue");
  //this.littleBlue.update();

  this.vbox = new VBox(gui, 10);
  this.vbox.setPosition(200, 32);
  var self = this;
  this.upBtn.onClick = function(x, y) {
    if(self.vbox.children.length != 0) {
      self.vbox.add(self.vbox.children[0]);
      self.vbox.shift();
      self.vbox.update();
    }
  }
  this.downBtn.onClick = function(x, y) {
    if(self.vbox.children.length != 0) {
      var last = self.vbox.children[self.vbox.children.length - 1];
      self.vbox.children.unshift(last);
      self.vbox.children.pop();
      self.vbox.update();
    }
  }
  this.bigBlue.onClick = function(x, y) {
    self.onBack();
  }
}

function dispatchClick(obj, x, y) {
  if(inBox(obj.position, obj.dimensions, x, y)) {
    obj.onClick(x, y);
    return true;
  }
  return false;
}

BagMenu.prototype = Object.create(Renderable.prototype, {
  add: {value : function(value, action, optional) {
    var item = new Text(this.gui, 400, 30);
    var hbox = new HBox(this.gui, 20);
    item.onClick = function(x, y) {
      action();
    }
    item.setText(value);
    if(!!optional) {
      hbox.add(optional);
    }
    hbox.add(item);
    hbox.update();
    this.vbox.add(hbox);
  }},
  onClick: {value : function(x, y) {
    var x = x - this.position.x;
    var y = y - this.position.y;
    var hit = dispatchClick(this.bigBlue, x, y);
    hit = hit || dispatchClick(this.downBtn, x, y);
    hit = hit || dispatchClick(this.upBtn, x, y);
    hit || this.vbox.onClick(x - this.position.x, y - this.position.y);
  }},
  update: {value : function() {
    Renderable.prototype.update.apply(this);
    this.vbox.update();
  }},
  render: {value: function(context, xoff, yoff) {
    var xoff = xoff + this.position.x;
    var yoff = yoff + this.position.y;
    renderList([this.bigCyan, this.itemsLabel, this.downBtn, this.upBtn,
                this.bigOrange, this.vbox, this.bigBlue,
               ], context, xoff, yoff);
  }}
});
BagMenu.prototype.constructor = BagMenu;
