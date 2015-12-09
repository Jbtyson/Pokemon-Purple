
function randPokemon(n) {
  var out = [];
  for(var i = 0; i < n; ++i) {
    var num = Math.floor(Math.random() * 151);
    var ss = new SpriteSheet(gui, "img/front-"+num, 1.5);
    out.push(ss);
  }
  return out;
}

function MainMenu(gui, w, h, xoff, yoff) {
    Renderable.call(this, gui);
    this.search = new Button(gui, w, h, "#b30000", "Search", xoff, yoff);
    this.search.textBox.setFont("16px Arial Black");
    this.pc = new Button(gui, w, h, "#000099", "PC", xoff, yoff);
    this.pc.textBox.setFont("16px Arial Black");
    this.pokemon = new Button(gui, w, h, "#00802b", "Pokemon", xoff, yoff);
    this.pokemon.textBox.setFont("16px Arial Black");
    this.pokedex = new Button(gui, w, h, "#b38600", "Pokedex", xoff, yoff);
    this.pokedex.textBox.setFont("16px Arial Black");
    this.background = new Rectangle(gui, 600, 450);
    var grd = gui.context.createLinearGradient(0,0,0,450);
    grd.addColorStop(0, '#ccffff');
    grd.addColorStop(0.7, '#60d060');
    this.background.setColor(grd);
    this.hbox = new HBox(gui, 5);
    this.hbox.add(this.search);
    this.hbox.add(this.pc);
    this.hbox.add(this.pokemon);
    this.hbox.add(this.pokedex);
    this.hbox.setPosition(0, 150);
    this.hbox.update();
    this.dimensions.x = 600;
    this.dimensions.y = 450;
    var menu = this;
    this.search.onClick = function(x, y) { menu.onSearch(); };
    this.pc.onClick = function(x, y) { menu.onPC(); };
    this.pokemon.onClick = function(x, y) { menu.onPokemon(); };
    this.pokedex.onClick = function(x, y) { menu.onPokedex(); };
    this.topPk = new HBox(gui, 5);
    this.topPk.addAll(randPokemon(151));
    this.topPk.setPosition(0, 130);
    this.topPk.update();
    var _this = this;
    window.setInterval(function() {
      if(_this.topPk.position.x < 0 && -_this.topPk.position.x > _this.topPk.dimensions.x) {
        _this.topPk.setPosition(660, _this.topPk.position.y);
      } else {
        _this.topPk.setPosition(_this.topPk.position.x - 5, _this.topPk.position.y);
      }
    }, 20);
    this.botPk = new HBox(gui, 5);
    this.botPk.addAll(randPokemon(151));
    this.botPk.setPosition(-1500, 430);
    this.botPk.update();
    window.setInterval(function() {
      if(_this.botPk.position.x > 660) {
        _this.botPk.setPosition(-_this.botPk.dimensions.x - 10, _this.botPk.position.y);
      } else {
        _this.botPk.setPosition(_this.botPk.position.x + 5, _this.botPk.position.y);
      }
    }, 20);
    //this.gengar = new SpriteSheet(gui, "img/front-94", 2.0);
    //this.gengar.setPosition(15, h + 30);
    //this.nidrino = new SpriteSheet(gui, "img/front-33", 2.0);
    //this.nidrino.setPosition(450, h + 30);

}

MainMenu.prototype = Object.create(Renderable.prototype, {
  update: {value : function() {
    Renderable.prototype.update.apply(this);
    this.search.update();
    this.pc.update();
    this.pokemon.update();
    this.pokedex.update();
    this.background.update();
    for(var i = 0; i < 151; ++i) {
      var ss = this.botPk.children[i];
      ss.setPosition(0, -ss.dimensions.y);
      ss.update();
      ss = this.topPk.children[i];
      ss.setPosition(0, -ss.dimensions.y);
      ss.update();
    }
    this.botPk.update();
    this.topPk.update();
    //this.gengar.update();
    //this.nidrino.update();
  }},
  onClick: {value : function(x, y) {
    this.hbox.onClick(x, y);
  }},
  render: {value: function(context, xoff, yoff) {
    var xoff = xoff + this.position.x;
    var yoff = yoff + this.position.y;
    this.background.render(context, 0, 0);
    renderList([this.hbox, this.botPk, this.topPk], context, xoff, yoff);
  }}
});
MainMenu.prototype.constructor = MainMenu;
