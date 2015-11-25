// itemService.js
var ItemDbao = require("./itemDbao.js").ItemDbao;

var ItemService = function(db) {
    var itemDbao = new ItemDbao(db);

    var retrieveItemById = function(itemId) {
      return -1;
    }

    var retrieveItemHeldByPokemon = function(pkmnInstId) {
      return -1;
    }

    return {
      itemDbao: itemDbao,
      retrieveItemById: retrieveItemById,
      retrieveItemHeldByPokemon: retrieveItemHeldByPokemon
    }
};
exports.ItemService = ItemService;
