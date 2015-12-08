//abstract colorable class
//Jake Ehrlich

//the nice thing about realtive positions is that you can
//design sub guis quite nicely
//They do wind up being rather large however which isn't as nice
function Battle(gui, pk1, pk2) {
  Renderable.call(this, gui);
  this.pk1 = pk1;
  this.pk2 = pk2;
  this.status1 = new StatusBar(gui, pk1.name, pk1.lvl, pk1.hp, pk1.maxhp, pk1.exp, pk1.maxexp);
  this.status1.setPosition(350, 240);
  this.status2 = new StatusBar(gui, pk2.name, pk2.lvl, pk2.hp, pk2.maxhp, pk2.exp, pk2.maxexp);
  this.status2.setPosition(10, 10);
  this.pokemon1 = new RenderableImage(gui, pk1.src, 3.3);
  this.pokemon1.setPosition(60, 130);
  this.pokemon2 = new RenderableImage(gui, pk2.src, 2.2);
  this.pokemon2.setPosition(360, 75);
  this.backgroundImg = new RenderableImage(gui, "img/test.gif", 2.4);
  this.background = new Rectangle(gui, 600, 450);
  var grd = gui.context.createLinearGradient(0,0,0,450);
  grd.addColorStop(0, '#ccffff');
  grd.addColorStop(0.7, '#60d060');
  this.background.setColor(grd);
}

Battle.prototype = Object.create(Renderable.prototype, {
  update: {value : function() {
    Renderable.prototype.update.apply(this);
    this.status1.update();
    this.status2.update();
    this.pokemon1.update();
    this.pokemon2.update();
    this.backgroundImg.update();
    this.background.update();
  }},
  render: {value: function(context, xoff, yoff) {
    var xoff = xoff + this.position.x;
    var yoff = yoff + this.position.y;
    renderList([this.background, this.backgroundImg, this.status1, this.status2,
                this.pokemon1, this.pokemon2], context, xoff, yoff);
  }}
});
Battle.prototype.constructor = Battle;
