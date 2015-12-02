//abstract colorable class
//Jake Ehrlich

//the nice thing about realtive positions is that you can
//design sub guis quite nicely
//They do wind up being rather large however which isn't as nice
function ClassicBattleMenu(gui, mainBoxW, mainBoxH) {
  Renderable.call(this, gui);

  this.dimensions.x = mainBoxW;
  this.dimensions.y = mainBoxH;

  this.backRect = new Rectangle(gui, mainBoxW, mainBoxH);
  this.backRect.setColor("darkslategrey");
  this.backRect.update();

  this.foreRect1 = new Rectangle(gui, mainBoxW - 8, mainBoxH - 8);
  this.foreRect1.setColor("darkred");
  this.foreRect1.setPosition(4, 4);
  this.foreRect1.update();

  this.foreRect2 = new Rectangle(gui, mainBoxW - 24, mainBoxH - 16);
  this.foreRect2.setColor("darkcyan");
  this.foreRect2.setPosition(12, 8);
  this.foreRect2.update();

  this.mainBox = new HBox(gui, 10);
  var left = new VBox(gui, 10);
  var right = new VBox(gui, 10);

  this.fight = new Text(gui, 110, 35);
  this.fight.setFont('22px Arial');
  this.fight.setText("Fight");

  this.bag = new Text(gui, 110, 35);
  this.bag.setFont('22px Arial');
  this.bag.setText("Bag");

  left.add(this.fight);
  left.add(this.bag);
  left.update();

  this.pokemon = new Text(gui, 110, 35);
  this.pokemon.setFont('22px Arial');
  this.pokemon.setText("Pokemon");

  this.run = new Text(gui, 110, 35);
  this.run.setFont('22px Arial');
  this.run.setText("Run");

  right.add(this.pokemon);
  right.add(this.run);
  right.update();

  var menuBoxW = 300;

  this.mainBox.add(left);
  this.mainBox.add(right);
  this.mainBox.setPosition(mainBoxW - menuBoxW + 30, 16)
  this.mainBox.update();

  this.menuBox = new Rectangle(gui, menuBoxW, mainBoxH);
  this.menuBox.setColor("darkslategrey");
  this.menuBox.setPosition(mainBoxW - menuBoxW, 0);
  this.menuBox.update();

  this.menuBoxBoarder = new Rectangle(gui, menuBoxW - 8, mainBoxH - 8);
  this.menuBoxBoarder.setColor("slateblue");
  this.menuBoxBoarder.setPosition(mainBoxW - menuBoxW + 4, 4);
  this.menuBoxBoarder.update();

  this.menuBoxFore = new Rectangle(gui, menuBoxW - 16, mainBoxH - 16);
  this.menuBoxFore.setColor("white");
  this.menuBoxFore.setPosition(mainBoxW - menuBoxW + 8, 8);
  this.menuBoxFore.update();

  this.messageBox = new Text(gui, mainBoxW - menuBoxW, mainBoxH);
  this.messageBox.setColor("white");
  this.messageBox.setFont("20px Arial");
  this.messageBox.setPosition(20, 20);
  this.messageBox.update();

  //finally setup the event handlers
  var self = this;
  this.fight.onClick = function(x, y) { self.onFight(); }
  this.run.onClick = function(x, y) { self.onRun(); }
  this.pokemon.onClick = function(x, y) { self.onPoke(); }
  this.bag.onClick = function(x, y) { self.onBag(); }
}

ClassicBattleMenu.prototype = Object.create(Renderable.prototype, {
  update: {value : function() {
    Renderable.prototype.update.apply(this);
  }},
  onClick: {value : function(x, y) {
    this.mainBox.onClick(x - this.position.x, y - this.position.y);
  }},
  render: {value: function(context, xoff, yoff) {
    var xoff = xoff + this.position.x;
    var yoff = yoff + this.position.y;
    renderList([this.backRect, this.foreRect1, this.foreRect2,
                this.menuBox, this.menuBoxBoarder, this.menuBoxFore,
                this.mainBox, this.messageBox], context, xoff, yoff);
  }}
});
ClassicBattleMenu.prototype.constructor = ClassicBattleMenu;
