//abstract colorable class
//Jake Ehrlich

//the nice thing about realtive positions is that you can
//design sub guis quite nicely
//They do wind up being rather large however which isn't as nice
function PokemonList(gui) {
  Renderable.call(this, gui);
  this.dimensions.x = 600;
  this.dimensions.y = 450;
  this.vbox = new VBox(gui, 10);
  this.vbox.setPosition(32, 32);
  this.vbox.update();
}

function dispatchClick(obj, x, y) {
  if(inBox(obj.position, obj.dimensions, x, y)) {
    obj.onClick(x, y);
    return true;
  }
  return false;
}

PokemonList.prototype = Object.create(Renderable.prototype, {
  add: {value : function(name, lvl, hp, maxhp, action) {
    var item = new Text(this.gui, 400, 80);
    item.onClick = function(x, y) {
      alert("you selected: " + name);
      action();
    }
    item.setText("Lvl " + lvl + " : " + name + " " + hp + " / " + maxhp);
    item.update();
    this.vbox.add(item);
  }},
  onClick: {value : function(x, y) {
    var x = x - this.position.x;
    var y = y - this.position.y;
    this.vbox.onClick(x, y);
  }},
  update: {value : function() {
    Renderable.prototype.update.apply(this);
    this.vbox.update();
  }},
  render: {value: function(context, xoff, yoff) {
    var xoff = xoff + this.position.x;
    var yoff = yoff + this.position.y;
    renderList([this.vbox], context, xoff, yoff);
  }}
});
PokemonList.prototype.constructor = PokemonList;
