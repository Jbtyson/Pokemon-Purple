function handleState(machine) {
  machine.state.loop(machine);
}

function transition(machine, newstate) {
  machine.state.exit(machine);
  machine.state = newstate;
  newstate.enter(machine);
  handleState(machine);
}

function AuthState(gui) {
  this.wait = new Text(gui, 400, 80);
  this.wait.setText("Please Login first.");
}

AuthState.prototype = {
  enter: function(machine) {},
  loop: function(machine) {
    this.wait.update();
    this.wait.render(gui.context, 0, 0);
  },
  exit: function(machine) {
    machine.gui.context.fillStyle = "white";
    machine.gui.context.fillRect(0, 0, 600, 450);
  }
};

function MainMenuState(machine) {
  var mainmenu = new MainMenu(gui, 600 / 4 - 5, 120, 40, 40);
  mainmenu.setPosition(0, 150);
  mainmenu.onSearch = function() { transition(machine, new SearchWait(machine)); };
  mainmenu.onPC = function() { transition(machine, new PcWait(machine)); };
  mainmenu.onPokemon = function() { transition(machine, new PokemonWait(machine)); };;
  mainmenu.onPokedex = function() { transition(machine, new PokedexWait(machine)); };;
  this.mainmenu = mainmenu;
  machine.gui.attach(this.mainmenu);
}

MainMenuState.prototype = {
  enter: function(machine) {
    intro.play();
  },
  loop: function(machine) {
    this.mainmenu.update();
    this.mainmenu.render(gui.context, 0, 0);
  },
  exit: function(machine) {
    machine.gui.context.fillRect(0, 0, 600, 450);
    intro.pause();
  }
}

function SearchWait(machine) {
  this.wait = new Text(machine.gui, 400, 80);
  this.wait.setText("Waiting on server...");
}
SearchWait.prototype = {
  enter: function(machine) {
    console.log(machine.user, machine.user.playerId);
    machine.socket.emit("searchForWildPokemon", {playerId: machine.user.playerId});
  },
  loop: function(machine) {
    this.wait.update();
    this.wait.render(gui.context, 0, 0);
  },
  exit: function(machine) {}
};

function PokemonWait(machine) {
  machine.socket.emit("searchForWildPokemon", machine.user.playerId);
  this.wait = new Text(machine.gui, 400, 80);
  this.wait.setText("Waiting on server...");
}
PokemonWait.prototype = {
  enter: function(machine) {
    machine.gui.context.fillRect(0, 0, 600, 450);
  },
  loop: function(machine) {
    this.wait.update();
    this.wait.render(gui.context, 0, 0);
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
    this.wait.update();
    this.wait.render(gui.context, 0, 0);
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
    this.wait.update();
    this.wait.render(gui.context, 0, 0);
  },
  exit: function(machine) {}
};

function BattleChooseState(machine, pk1, pk2) {
  this.battle = new Battle(gui, pk1, pk2);
  this.menu = new ClassicBattleMenu(gui, 600, 110);
  this.menu.setPosition(0, 450 - 110);
  this.menu.messageBox.setText("What will " + pk1.name + " do next?");
  this.battle.status1.animated = true;
  this.menu.onFight = function() { transition(machine, new MoveChoose(machine, pk1, pk2)); };
  this.menu.onPoke = function() {  };
  this.menu.onBag = function() {  };
  this.menu.onRun = function() {  };
}

BattleChooseState.prototype = {
  enter: function(machine) {
    battle.play();
    gui.attach(this.menu);
  },
  loop: function(machine) {
    this.battle.update();
    this.menu.update();
    this.battle.render(gui.context, 0, 0);
    this.menu.render(gui.context, 0, 0);
  },
  exit: function(machine) {
    gui.detach(this.menu);
    battle.pause();
  }
};

function MoveChooseState(gui, pk1, pk2) {
  this.battle = new Battle(gui, aux.pk1, aux.pk2);
  this.menu = new MoveBar(gui, 600, 110, 200, aux.pk1.moves);
}

MoveChooseState.prototype = {
  enter: function(gui, aux) {
    gui.attach(this.menu);
  },

  loop: function(gui, aux) {
    this.battle.update();
    this.menu.update();
    this.battle.render(gui.context, 0, 0);
    this.menu.render(gui.context, 0, 0);
  },

  exit: function(gui, aux) {
    gui.detach(aux.menu);
  }
}

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
