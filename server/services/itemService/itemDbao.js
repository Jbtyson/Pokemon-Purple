// itemDbao.js
var ItemDbao = function(_db) {
    var db = _db

    var retrieveItemById = function(itemId) {
      return -1;
    }

    var retrieveItemHeldByPokemon = function(pkmnInstId) {
      return -1;
    }

    return {
      db: db,
      retrieveItemById: retrieveItemById,
      retrieveItemHeldByPokemon: retrieveItemHeldByPokemon
    }
};
exports.ItemDbao = ItemDbao;
