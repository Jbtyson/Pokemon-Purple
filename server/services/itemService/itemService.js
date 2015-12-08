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

    return {
      itemDbao: itemDbao,
      retrieveItemById: retrieveItemById,
      retrieveItemHeldByPokemon: retrieveItemHeldByPokemon
    }
};
exports.ItemService = ItemService;
