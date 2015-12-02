//abstract colorable class
//Jake Ehrlich

//the nice thing about realtive positions is that you can
//design sub guis quite nicely
//They do wind up being rather large however which isn't as nice
function BagMenu(gui, pk1, pk2) {
  Renderable.call(this, gui);

}

Battle.prototype = Object.create(Renderable.prototype, {
  update: {value : function() {
    Renderable.prototype.update.apply(this);
  
  }},
  render: {value: function(context, xoff, yoff) {
    var xoff = xoff + this.position.x;
    var yoff = yoff + this.position.y;
    renderList([this.background, this.backgroundImg, this.status1, this.status2,
                this.pokemon1, this.pokemon2], context, xoff, yoff);
  }}
});
Battle.prototype.constructor = Battle;
