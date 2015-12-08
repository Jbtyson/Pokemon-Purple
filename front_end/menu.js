

function MainMenu(gui, w, h, xoff, yoff) {
    HBox.call(this, gui);
    this.spacing = 5;
    this.search = new Button(gui, w, h, "#b30000", "Search", xoff, yoff);
    this.search.textBox.setFont("16px Arial Black");
    this.pc = new Button(gui, w, h, "#000099", "PC", xoff, yoff);
    this.pc.textBox.setFont("16px Arial Black");
    this.pokemon = new Button(gui, w, h, "#00802b", "Pokemon", xoff, yoff);
    this.pokemon.textBox.setFont("16px Arial Black");
    this.pokedex = new Button(gui, w, h, "#b38600", "Pokedex", xoff, yoff);
    this.pokedex.textBox.setFont("16px Arial Black");
    this.add(this.search);
    this.add(this.pc);
    this.add(this.pokemon);
    this.add(this.pokedex);
    var menu = this;
    this.search.onClick = function(x, y) { menu.onSearch(); };
    this.pc.onClick = function(x, y) { menu.onPC(); };
    this.pokemon.onClick = function(x, y) { menu.onPokemon(); };
    this.pokedex.onClick = function(x, y) { menu.onPokedex(); };
}

MainMenu.prototype = Object.create(HBox.prototype, {
  update: {value : function() {
    HBox.prototype.update.apply(this);
    this.search.update();
    this.pc.update();
    this.pokemon.update();
    this.pokedex.update();
  }}
  //render: {value: function(context, xoff, yoff) {

  //}}
});
MainMenu.prototype.constructor = MainMenu;
