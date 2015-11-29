//abstract colorable class
//Jake Ehrlich

//the nice thing about realtive postions is that you can
//design sub guis quite nicely
//They do wind up being rather large however which isn't as nice
function StatusBar(gui, name, lvl, hp, maxhp, exp, maxexp) {
  Renderable.call(this, gui);

  //the main box
  var mainBoxW = 240;
  var mainBoxH = 97;
  var expBarAlloc = 23;

  this.backRect = new Rectangle(gui, mainBoxW, mainBoxH);
  this.backRect.setColor("darkslategray");
  this.backRect.update();

  this.foreRect = new Rectangle(gui, mainBoxW - 10, mainBoxH - expBarAlloc);
  this.foreRect.setPosition(5, 5);
  this.foreRect.setColor("blanchedalmond");
  this.foreRect.update();

  //the pokemon's name
  this.nameBox = new Text(gui, 20, 50);
  this.nameBox.setPosition(15, 15);
  this.nameBox.setText(name);
  this.nameBox.setFont("14px Arial");
  this.nameBox.update();

  //the health bar stuff
  var hbarY = 40;
  var hbarX = 55;
  var hbarSize = 165;
  var hbarH = 16;

  this.backHealth = new Rectangle(gui, hbarSize + 22, hbarH);
  this.backHealth.setPosition(hbarX - 22, hbarY);
  this.backHealth.setColor("dimgrey");
  this.backHealth.update();

  this.foreHealth = new Rectangle(gui, hbarSize - 4, hbarH - 4);
  this.foreHealth.setPosition(hbarX + 2, hbarY + 2);
  this.foreHealth.setColor("white");
  this.foreHealth.update();

  this.healthBar = new Rectangle(gui, (hp / maxhp) * (hbarSize - 8), hbarH - 8);
  this.healthBar.setPosition(hbarX + 4, hbarY + 4);
  this.healthBar.setColor("green");
  this.healthBar.update();

  this.hp = new Text(gui, 20, 20);
  this.hp.setPosition(hbarX - 20, hbarY + 1);
  this.hp.setText("HP");
  this.hp.setFont("14px Arial Black");
  this.hp.setColor("darkorange");
  this.hp.update();

  var ratioW = 60;
  var ratioH = 30;
  this.ratio = new Text(gui, ratioW, ratioH);
  this.ratio.setText(hp + " / " + maxhp)
  this.ratio.setPosition(hbarX + hbarSize - ratioW - 5, hbarY + hbarH + 5);
  this.ratio.setFont("14px Arial");
  this.ratio.update();

  //the experience stuff
  var expBarX = 35;
  var expBarY = 85;
  var expBarW = mainBoxW - expBarX - 6;
  var expBarH = 7;

  this.exp = new Text(gui, 25, 30);
  this.exp.setPosition(expBarX - 25, expBarY - 1);
  this.exp.setText("EXP");
  this.exp.setFont("10px Arial Black");
  this.exp.setColor("yellow");
  this.exp.update();

  this.expBar = new Rectangle(gui, (exp / maxexp) * expBarW, expBarH);
  this.expBar.setPosition(expBarX, expBarY);
  this.expBar.setColor("darkcyan");
  this.expBar.update();

  this.expBack = new Rectangle(gui, expBarW, expBarH);
  this.expBack.setPosition(expBarX, expBarY);
  this.expBack.setColor("lightgrey");
  this.expBack.update();

  //lvl
  var lvlX = 20;
  var lvlY = 15;

  this.lvl = new Text(gui, 20, 20);
  this.lvl.setPosition(mainBoxW - 30 - lvlX, lvlY);
  this.lvl.setText("Lvl " + lvl);
  this.lvl.setFont("14px Arial");
  this.lvl.update();

}

StatusBar.prototype = Object.create(Renderable.prototype, {
  render: {value: function(context, xoff, yoff) {
    //and now because we declartivelly designed our sub-gui we just render it all
    console.log(this.position);
    var xoff = xoff + this.position.x;
    var yoff = yoff + this.position.y;
    this.backRect.render(context, xoff, yoff);
    this.foreRect.render(context, xoff, yoff);
    this.nameBox.render(context, xoff, yoff);
    this.backHealth.render(context, xoff, yoff);
    this.foreHealth.render(context, xoff, yoff);
    this.hp.render(context, xoff, yoff);
    this.healthBar.render(context, xoff, yoff);
    this.exp.render(context, xoff, yoff);
    this.expBack.render(context, xoff, yoff);
    this.expBar.render(context, xoff, yoff);
    this.lvl.render(context, xoff, yoff);
    this.ratio.render(context, xoff, yoff);
  }}
});
StatusBar.prototype.constructor = StatusBar;
