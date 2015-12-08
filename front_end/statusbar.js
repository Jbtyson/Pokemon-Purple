//abstract colorable class
//Jake Ehrlich

var mainBoxW = 240;
var mainBoxH = 97;
var expBarAlloc = 23;

var hbarY = 40;
var hbarX = 55;
var hbarSize = 165;
var hbarH = 16;

var lvlX = 20;
var lvlY = 15;

var ratioW = 60;
var ratioH = 30;

var expBarX = 35;
var expBarY = 85;
var expBarW = mainBoxW - expBarX - 6;
var expBarH = 7;

//the nice thing about realtive positions is that you can
//design sub guis quite nicely
//They do wind up being rather large however which isn't as nice
function StatusBar(gui, name, lvl, hp, maxhp, exp, maxexp) {
  Renderable.call(this, gui);

  this.name = name;
  this.lvl = lvl;
  this.hp = hp;
  this.maxhp = maxhp;
  this.exp = exp;
  this.maxexp = maxexp;
  this.animated = false;

  //the main box
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

  this.hpBox = new Text(gui, 20, 20);
  this.hpBox.setPosition(hbarX - 20, hbarY + 1);
  this.hpBox.setText("HP");
  this.hpBox.setFont("14px Arial Black");
  this.hpBox.setColor("darkorange");
  this.hpBox.update();

  this.ratio = new Text(gui, ratioW, ratioH);
  this.ratio.setText(hp + " / " + maxhp);
  this.ratio.setPosition(hbarX + hbarSize - ratioW - 5, hbarY + hbarH + 5);
  this.ratio.setFont("14px Arial");
  this.ratio.update();

  //the experience stuff
  this.expBox = new Text(gui, 25, 30);
  this.expBox.setPosition(expBarX - 25, expBarY - 1);
  this.expBox.setText("EXP");
  this.expBox.setFont("10px Arial Black");
  this.expBox.setColor("yellow");
  this.expBox.update();

  this.expBar = new Rectangle(gui, (exp / maxexp) * expBarW, expBarH);
  this.expBar.setPosition(expBarX, expBarY);
  this.expBar.setColor("darkcyan");
  this.expBar.update();

  this.expBack = new Rectangle(gui, expBarW, expBarH);
  this.expBack.setPosition(expBarX, expBarY);
  this.expBack.setColor("lightgrey");
  this.expBack.update();

  //lvl
  this.lvlBox = new Text(gui, 20, 20);
  this.lvlBox.setPosition(mainBoxW - 30 - lvlX, lvlY);
  this.lvlBox.setText("Lvl " + lvl);
  this.lvlBox.setFont("14px Arial");
  this.lvlBox.update();

}

StatusBar.prototype = Object.create(Renderable.prototype, {
  update: {value : function() {
    Renderable.prototype.update.apply(this);
    this.nameBox.setText(this.name);
    this.lvlBox.setText("Lvl " + this.lvl);
    this.healthBar.dimensions.x = (this.hp / this.maxhp) * (hbarSize - 8);
    this.expBar.dimensions.x = (this.exp / this.maxexp) * expBarW;
    this.ratio.setText(this.hp + " / " + this.maxhp);

    //TODO: make a update list?
    this.nameBox.update();
    this.healthBar.update();
    this.lvlBox.update();
    this.expBar.update();
    this.ratio.update();
  }},
  render: {value: function(context, xoff, yoff) {
    //and now because we declartivelly designed our sub-gui we just render it all
    var xoff = xoff + this.position.x;
    var yoff = yoff + this.position.y;

    if(this.animated) {
      var d = new Date();
      var n = d.getTime();
      var amp = 2;
      yoff += Math.floor(amp * Math.sin(n / 200)); //every 5 seconds it completes half a peroid
    }

    //TODO: make a rendering list?
    renderList([this.backRect, this.foreRect, this.nameBox, this.backHealth,
                this.foreHealth, this.hpBox, this.hpBox, this.healthBar,
                this.expBox, this.expBack, this.expBar, this.lvlBox,
                this.ratio], context, xoff, yoff);
  }}
});
StatusBar.prototype.constructor = StatusBar;
