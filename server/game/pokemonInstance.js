// pokemonInstance.js
var PokemonInstance = function(_base, _maxHp, _curHp, _att, _spcAtt, _def,
                        _spcDef, _spd, _id) {
    var base = _base,
        maxHp = _maxHp,
        curHp = _curHp,
        att = _att,
        spcAtt = _spcAtt,
        def = _def,
        spcDef = _spcDef,
        spd = _spd,
        id = _id;

    return {
      base: base,
      maxHp: maxHp,
      curHp: curHp,
      att: att,
      spcAtt: spcAtt,
      def: def,
      spcDef: spcDef,
      spd: spd,
      id: id
    }
};
exports.PokemonInstance = PokemonInstance;
