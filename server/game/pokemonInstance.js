// pokemonInstance.js
var PokemonInstance = function(_base, _level, _name, _maxHp, _curHp, _att, _spcAtt, _def,
                        _spcDef, _spd, _id) {
    var base = _base,
        level = _level,
        name = _name,
        maxHp = _maxHp,
        curHp = _curHp,
        att = _att,
        spcAtt = _spcAtt,
        def = _def,
        spcDef = _spcDef,
        spd = _spd,
        xp = _xp,
        xpToLevel = _xpToLevel,
        id = _id;

    return {
      base: base,
      level: level,
      name: name,
      maxHp: maxHp,
      curHp: curHp,
      att: att,
      spcAtt: spcAtt,
      def: def,
      spcDef: spcDef,
      spd: spd,
      xp: xp,
      xpToLevel: xpToLevel,
      id: id
    }
};
exports.PokemonInstance = PokemonInstance;
