//abstract colorable class
//Jake Ehrlich

//the nice thing about realtive positions is that you can
//design sub guis quite nicely
//They do wind up being rather large however which isn't as nice
function MoveBar(gui, mainBoxW, mainBoxH, moveBoxW, moves) {
  Renderable.call(this, gui);

  this.movenum = 0;

  this.dimensions.x = mainBoxW;
  this.dimensions.y = mainBoxH;

  this.backRect = new Rectangle(gui, mainBoxW, mainBoxH);
  this.backRect.setColor("darkslategrey");
  this.backRect.update();

  this.menuBoxBoarder = new Rectangle(gui, mainBoxW - 8 - moveBoxW, mainBoxH - 8);
  this.menuBoxBoarder.setColor("slateblue");
  this.menuBoxBoarder.setPosition(4, 4);
  this.menuBoxBoarder.update();

  this.menuBoxFore = new Rectangle(gui, mainBoxW - 16 - moveBoxW, mainBoxH - 16);
  this.menuBoxFore.setColor("white");
  this.menuBoxFore.setPosition(8, 8);
  this.menuBoxFore.update();

  this.moveBoxBack = new Rectangle(gui, moveBoxW - 8, mainBoxH - 8);
  this.moveBoxBack.setColor("slateblue");
  this.moveBoxBack.setPosition(mainBoxW - moveBoxW + 4, 4);
  this.moveBoxBack.update();

  this.moveBoxFore = new Rectangle(gui, moveBoxW - 16, mainBoxH - 16);
  this.moveBoxFore.setColor("white");
  this.moveBoxFore.setPosition(mainBoxW - moveBoxW + 8, 8);
  this.moveBoxFore.update();

  this.mainBox = new HBox(gui, 10);
  var left = new VBox(gui, 10);
  var right = new VBox(gui, 10);

  this.move1 = new Text(gui, (mainBoxW - moveBoxW - 64) / 2, 48);
  this.move1.setFont('22px Arial');
  this.move1.setText(moves[0].name);

  this.move2 = new Text(gui, (mainBoxW - moveBoxW - 64) / 2, 48);
  this.move2.setFont('22px Arial');
  this.move2.setText(moves[1].name);

  left.add(this.move1);
  left.add(this.move2);
  left.update();

  this.move3 = new Text(gui, (moveBoxW - 64) / 2, 48);
  this.move3.setFont('22px Arial');
  this.move3.setText(moves[2].name);

  this.move4 = new Text(gui, (moveBoxW - 64) / 2, 48);
  this.move4.setFont('22px Arial');
  this.move4.setText(moves[3].name);

  this.moves = moves;

  right.add(this.move3);
  right.add(this.move4);
  right.update();

  this.mainBox.add(left);
  this.mainBox.add(right);
  this.mainBox.setPosition(32, 16);
  this.mainBox.update();

  this.pptxt = new Text(gui, 24, 24);
  this.pptxt.setPosition(mainBoxW - moveBoxW + 24, 16);
  this.pptxt.setFont('22px Arial');
  this.pptxt.setText('PP');
  this.pptxt.update();

  this.ratio = new Text(gui, 60, 24);
  this.ratio.setPosition(mainBoxW - 100, 16);
  this.ratio.setFont('22px Arial');
  this.ratio.setText(moves[this.movenum].pp + ' / ' + moves[this.movenum].maxpp);
  this.ratio.update();

  this.type = new Text(gui, 60, 24);
  this.type.setPosition(mainBoxW - moveBoxW + 24, 40);
  this.type.setFont('22px Arial');
  this.type.setText('TYPE' + ' / ' + moves[this.movenum].type);
  this.type.update();

  this.gobtn = new Button(gui, 150, 32, "green", "go", 64, 12);
  this.gobtn.setPosition(mainBoxW - moveBoxW + 24, 64);
  this.gobtn.update();

  //set the event handlers
  var self = this;
  this.gobtn.onClick = function(x, y) { self.onGo(moves[self.movenum]); }
  this.move1.onClick = function(x, y) { self.movenum = 0; }
  this.move2.onClick = function(x, y) { self.movenum = 1; }
  this.move3.onClick = function(x, y) { self.movenum = 2; }
  this.move4.onClick = function(x, y) { self.movenum = 3; }
}

MoveBar.prototype = Object.create(Renderable.prototype, {
  update: {value : function() {
    Renderable.prototype.update.apply(this);
    this.ratio.setText(moves[this.movenum].pp + ' / ' + moves[this.movenum].maxpp);
    this.ratio.update();
    this.type.setText('TYPE' + ' / ' + moves[this.movenum].type);
    this.type.update();
  }},
  onClick: {value : function(x, y) {
    this.mainBox.onClick(x - this.position.x, y - this.position.y);
    if(inBox(this.gobtn.position, this.gobtn.dimensions, x - this.position.x, y - this.position.y)) {
      this.gobtn.onClick(x, y);
    }
  }},
  render: {value: function(context, xoff, yoff) {
    var xoff = xoff + this.position.x;
    var yoff = yoff + this.position.y;
    renderList([this.backRect, this.menuBoxBoarder, this.menuBoxFore,
                this.moveBoxBack, this.moveBoxFore, this.mainBox,
                this.pptxt, this.ratio, this.type, this.gobtn],
      context, xoff, yoff);
  }}
});
MoveBar.prototype.constructor = MoveBar;
