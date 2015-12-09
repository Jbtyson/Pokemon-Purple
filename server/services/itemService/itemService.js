// itemService.js
var ItemDbao = require("./itemDbao.js").ItemDbao;

var ItemService = function(db) {
    var itemDbao = new ItemDbao(db);

    var retrieveItemById = function(itemId, callback) {
      callback();
    }

    var retrieveItemHeldByPokemon = function(pkmnInstId, callback) {
      callback();
    }

    var retrieveItemsInBag = function(playerId, callback) {
      itemDbao.retrieveItemsInBag(playerId, function(items) {
        callback(items);
      });
    }

    return {
      itemDbao: itemDbao,
      retrieveItemById: retrieveItemById,
      retrieveItemHeldByPokemon: retrieveItemHeldByPokemon,
      retrieveItemsInBag: retrieveItemsInBag
    }
};
exports.ItemService = ItemService;
