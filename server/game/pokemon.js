// Pokemon.js
var Pokemon = function(mod, base, maxHp, curHp, att, spcAtt, def,
                        spcDef, spd, id) {
    var mod,
        base,
        maxHp,
        curHp,
        att,
        spcAtt,
        def,
        spcDef,
        spd,
        id

    return {
      mod: mod,
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
exports.Pokemon = Pokemon;
