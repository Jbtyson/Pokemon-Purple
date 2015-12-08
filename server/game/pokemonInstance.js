// pokemonInstance.js
var PokemonInstance = function(base, maxHp, curHp, att, spcAtt, def,
                        spcDef, spd, id) {
    var base,
        maxHp,
        curHp,
        att,
        spcAtt,
        def,
        spcDef,
        spd,
        id

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
