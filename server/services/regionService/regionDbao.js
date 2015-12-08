var Region = require("./../../game/region.js").Region;

var RegionDbao = function(_db) {
    var db = _db

    // Add a region to the db
    var addRegion = function(region, callback) {
      var query = "";
      db.query(query, function(results) {
        callback(results);
      });
    }

    // Adds all regions in a list to the db
    var addAllRegions = function(regions, callback) {
      var query = "";
      db.query(query, function(results) {
        callback(results);
      });
    }

    // Retrieve a region with a specificed id
    var retrieveRegion = function(regionId, callback) {
      var query = "CALL sp_retrieveRegion(?)";
      var params = [regionId];
      db.query(query, params, function(results) {
        var region = new Region();
        callback(region);
      });
    }

    // Retrieve all regions currently active
    var retrieveAllRegions = function(callback) {
      var query = "CALL sp_retrieveAllRegions()";
      db.query(query, function(results) {
        var regions;
        if(!results || !results[0]) {
          regions = "NULL"
        }
        else {
          regions = [];
          for(i = 0; i < results.length; i++) {
            var region = new Region();
            regions.push(region);
          }
        }

        callback(regions);
      });
    }

    // Clear the regions in the db
    var clearRegions = function(callback) {
      var query = "CALL sp_clearRegions";
      db.query(query, function(results) {
        var success;
        if(!results || !results.affectedRows) {
          success = fale;
        }
        else {
          success = true;
        }

        callback(success);
      });
    }

    return {
      db: db,
      addRegion: addRegion,
      addAllRegions: addAllRegions,
      retrieveRegion: retrieveRegion,
      retrieveAllRegions: retrieveAllRegions,
      clearRegions: clearRegions
    }
};
exports.RegionDbao = RegionDbao;
