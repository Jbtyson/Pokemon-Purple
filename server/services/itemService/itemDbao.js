// itemDbao.js
var ItemDbao = function(_db) {
    var db = _db

    var retrieveItemById = function(itemId, callback) {
      callback()
    }

    var retrieveItemHeldByPokemon = function(pkmnInstId, callback) {
      callback();
    }

    return {
      db: db,
      retrieveItemById: retrieveItemById,
      retrieveItemHeldByPokemon: retrieveItemHeldByPokemon
    }
};
exports.ItemDbao = ItemDbao;
