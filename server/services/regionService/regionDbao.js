// regionDbao.js
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

    }

    // Retrieve all regions currently active
    var retrieveAllRegions = function() {

    }

    // Clear the regions in the db
    var clearRegions = function() {

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
