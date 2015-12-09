// itemDbao.js
var ItemDbao = function(_db) {
    var db = _db

    var retrieveItemById = function(itemId, callback) {
      callback()
    }

    var retrieveItemHeldByPokemon = function(pkmnInstId, callback) {
      callback();
    }

    var retrieveItemsInBag = function(playerId, callback) {
      var query = "CALL sp_retrieveItemsInBag(?)";
      var params = [playerId];
      db.query(query, function(results) {
        var items = [];
        for(i = 0; i < results[0].length; i++) {
          var item = {
            name: results[0][i].name,
            description: results[0][i].description,
            quantity: results[0][i].quantity,
            itemId: results[0][i].item_id
          }
          items.push(item);
        }

        callback(items);
      }, params);
    }

    return {
      db: db,
      retrieveItemById: retrieveItemById,
      retrieveItemHeldByPokemon: retrieveItemHeldByPokemon,
      retrieveItemsInBag: retrieveItemsInBag
    }
};
exports.ItemDbao = ItemDbao;
