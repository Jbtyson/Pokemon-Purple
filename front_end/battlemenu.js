

function BattleMenu(gui, w, h, xoff, yoff) {
    HBox.call(this, gui);
    this.spacing = 5;
    this.fight = new Button(gui, w, h, "#b30000", "Fight", xoff, yoff);
    this.fight.textBox.setFont("16px Arial Black");
    this.bag = new Button(gui, w, h, "#000099", "Bag", xoff, yoff);
    this.bag.textBox.setFont("16px Arial Black");
    this.pokemon = new Button(gui, w, h, "#00802b", "Poke", xoff, yoff);
    this.pokemon.textBox.setFont("16px Arial Black");
    this.run = new Button(gui, w, h, "#b38600", "Run", xoff, yoff);
    this.run.textBox.setFont("16px Arial Black");
    this.add(this.fight);
    this.add(this.bag);
    this.add(this.pokemon);
    this.add(this.run);
    var menu = this;
    this.fight.onClick = function(x, y) { menu.onFight(); };
    this.bag.onClick = function(x, y) { menu.onBag(); };
    this.pokemon.onClick = function(x, y) { menu.onPoke(); };
    this.run.onClick = function(x, y) { menu.onRun(); };
}

BattleMenu.prototype = Object.create(HBox.prototype, {
  update: {value : function() {
    HBox.prototype.update.apply(this);
    this.fight.update();
    this.bag.update();
    this.pokemon.update();
    this.run.update();
  }}
  //render: {value: function(context, xoff, yoff) {

  //}}
});
BattleMenu.prototype.constructor = BattleMenu;
