function handleState(machine) {
  machine.state.loop(machine);
}

function transition(machine, newstate) {
  machine.state.exit(machine);
  machine.state = newstate;
  newstate.enter(machine);
  handleState(machine);
}

function AuthState(machine) {
  this.wait = new Text(machine.gui, 400, 80);
  this.wait.setText("Please Login first.");
}

AuthState.prototype = {
  enter: function(machine) {},
  loop: function(machine) {
    machine.wait.update();
    machine.wait.render(gui.context, 0, 0);
  },
  exit: function(machine) {}
};

function MainMenuState(machine) {
  var mainmenu = new MainMenu(gui, 600 / 4 - 5, 120, 40, 40);
  mainmenu.setPosition(0, 150);
  mainmenu.onSearch = function() { transistion(machine, new SearchWait(machine)); };
  mainmenu.onPC = function() { transistion(machine, new PcWait(machine)); };
  mainmenu.onPokemon = function() { transistion(machine, new PokemonWait(machine)); };;
  mainmenu.onPokedex = function() { transistion(machine, new PokedexWait(machine)); };;
  this.mainmenu = mainmenu;
  machine.gui.attach(this.mainmenu);
}

MainMenuState.prototype = {
  enter: function(machine) {},
  loop: function(machine) {
    this.mainmenu.update();
    this.mainmenu.render(gui.context, 0, 0);
  },
  exit: function(machine) {}
}

function SearchWait(machine) {
  machine.socket.emit("search", {});
  this.wait = new Text(machine.gui, 400, 80);
  this.wait.setText("Waiting on server...");
}
SearchWait.prototype = {
  enter: function(machine) { machine.gui.context.fillRect(0, 0, 600, 450); },
  loop: function(machine) {
    machine.wait.update();
    machine.wait.render(gui.context, 0, 0);
  },
  exit: function(machine) {}
};

function PokemonWait(machine) {
  machine.socket.emit("pokemon", {});
  this.wait = new Text(machine.gui, 400, 80);
  this.wait.setText("Waiting on server...");
}
PokemonWait.prototype = {
  enter: function(machine) { machine.gui.context.fillRect(0, 0, 600, 450); },
  loop: function(machine) {
    machine.wait.update();
    machine.wait.render(gui.context, 0, 0);
  },
  exit: function(machine) {}
};

function ItemWait(machine) {
  machine.socket.emit("items", {});
  this.wait = new Text(machine.gui, 400, 80);
  this.wait.setText("Waiting on server...");
}
ItemWait.prototype = {
  enter: function(machine) { machine.gui.context.fillRect(0, 0, 600, 450); },
  loop: function(machine) {
    machine.wait.update();
    machine.wait.render(gui.context, 0, 0);
  },
  exit: function(machine) {}
};

function RunWait(machine) {
  machine.socket.emit("run", {});
  this.wait = new Text(machine.gui, 400, 80);
  this.wait.setText("Waiting on server...");
}
RunWait.prototype = {
  enter: function(machine) { machine.gui.context.fillRect(0, 0, 600, 450); },
  loop: function(machine) {
    machine.wait.update();
    machine.wait.render(gui.context, 0, 0);
  },
  exit: function(machine) {}
};


function BattleChooseState(machine, pk1, pk2) {
  this.battle = new Battle(gui, pk1, pk2);
  this.menu = new ClassicBattleMenu(gui, 600, 110);
  this.menu.messageBox.setText("What will " + aux.pk1.name + " do next?");
  //this.menu.onFight = function() { transition(machine, moveChoose, machine.aux); };
  //this.menu.onPoke = function() { transition(machine, moveChoose, machine.aux); };;
  //machine.aux.menu.onBag = aux.onBag;
  //machine.aux.menu.onRun = aux.onRun;
  gui.attach(aux.menu);
}

BattleChooseState.prototype = {
  enter: function(machine) {

  },
  loop: function(machine) {
    aux.battle.update();
    aux.menu.update();
    aux.battle.render(gui.context, 0, 0);
    aux.menu.render(gui.context, 0, 0);
  },
  exit: function(machine) {
    gui.detach(aux.menu);
  }
};

/*
var pokemonChoose = {
  enter: function(gui, aux) {
    aux.pokemonList = new PokemonList(gui);
    for(var i = 0; i < aux.pokemon.length; ++i) {
      var pk = aux.pokemon[i];
      pokemonList.add(pk.name, pk.lvl, pk.hp, pk.maxhp, pk.action);
    }
    gui.attach(aux.pokemonList);
  },

  loop: function(gui, aux) {
    aux.pokemonList.update();
    aux.pokemonList.render(gui.context, 0, 0);
  },

  exit: function(gui, aux) {
    gui.detach(aux.pokemonList);
  }
}

var battleWaitResponse = {
  enter: function(gui, aux) {
    aux.battle = new Battle(gui, aux.pk1, aux.pk2);
    aux.menu = new MoveBar(gui, 600, 110, 200, aux.pk1.moves);
    aux.menu.messageBox.setText("Waiting on the server...");
  },

  loop: function(gui, aux) {
    aux.battle.update();
    aux.menu.update();
    aux.battle.render(gui.context, 0, 0);
    aux.menu.render(gui.context, 0, 0);
  },

  exit: function(gui, aux) { }
}

var itemChoose = {
  enter: function(gui, aux) {
    aux.itemsList = new BagMenu(gui, "Items", 600, 450, 120, 160);
    for(var i = 0; i < 10; ++i) {
      aux.itemsList.add("x" + aux.items[i].count + " " + aux.items[i].name, aux.items[i].action);
    }
    gui.attach(aux.itemsList);
  },

  loop: function(gui, aux) {
    aux.itemsList.update();
    aux.itemsList.render(gui.context, 0, 0);
  },

  exit: function(gui, aux) {
    gui.detach(aux.itemsList);
  }
}

var moveChoose = {
  enter: function(gui, aux) {
    aux.battle = new Battle(gui, aux.pk1, aux.pk2);
    aux.menu = new MoveBar(gui, 600, 110, 200, aux.pk1.moves);
    aux.menu.messageBox.setText("What will " + aux.pk1.name + " do next?");
    gui.attach(aux.menu);
  },

  loop: function(gui, aux) {
    aux.battle.update();
    aux.menu.update();
    aux.battle.render(gui.context, 0, 0);
    aux.menu.render(gui.context, 0, 0);
  },

  exit: function(gui, aux) {
    gui.detach(aux.menu);
  }
}

var pokemon = {
  enter: function(gui, aux) {
    aux.pokemonList = new PokemonList(gui);
    for(var i = 0; i < aux.pokemon.length; ++i) {
      var pk = aux.pokemon[i]
      pokemonList.add(pk.name, pk.lvl, pk.hp, pk.maxhp, pk.action);
    }
    gui.attach(aux.pokemonList);
  },

  loop: function(gui, aux) {
    aux.pokemonList.update();
    aux.pokemonList.render(gui.context, 0, 0);
  },

  exit: function(gui, aux) {
    gui.detach(aux.pokemonList);
  }
}

var pc = {
  enter: function(gui, aux) {

  },

  loop: function(gui, aux) {

  },

  exit: function(gui, aux) {

  },
}

var pokedex = {
  enter: function(gui, aux) {

  },

  loop: function(gui, aux) {

  },

  exit: function(gui, aux) {

  }
}
*/
