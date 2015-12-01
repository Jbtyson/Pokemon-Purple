var Region = require("./../../game/region.js").Region;

var RegionDbao = function(_db) {
    var db = _db

    // Add a region to the db
    var addRegion = function(region) {

    }

    // Adds all regions in a list to the db
    var addAllRegions = function(regions) {

    }

    // Retrieve a region with a specificed id
    var retrieveRegion = function(regionId) {
      var query = "CALL sp_retrieveRegion(?)";
      var params = [regionId];
      var result = db.query(query, params);

      var region = new Region();
      return region;
    }

    // Retrieve all regions currently active
    var retrieveAllRegions = function() {
      var query = "CALL sp_retrieveAllRegions";
      var results = db.query(query);

      var regions;
      if(!results || !results[0]) {
        regions = "NULL"
      }
      else {
        regions = [];
        for(i = 0; i < results.length; i++) {
          var region = new Region();
          regions.puish(region);
        }
      }

      return regions;
    }

    // Clear the regions in the db
    var clearRegions = function() {
      var query = "CALL sp_clearRegions";
      var results = db.query(query);

      var success;
      if(!results || !results.affectedRows) {
        success = fale;
      }
      else {
        success = true;
      }

      return success;
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
