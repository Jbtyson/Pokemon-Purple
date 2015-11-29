// regionService.js
var RegionDbao = require("./regionDbao").RegionDbao;
var Region = require("./../../game/region").Region;

var RegionService = function(db) {
    var regionDbao = new RegionDbao(db);

    // Adds a region to the db
    var addRegion = function(region) {
      var success = regionDbao.addRegion(region);
      return success;
    }

    // Adds all regions in a list to the db
    var addAllRegions = function(regions) {
      var success = regionDbao.addAllRegions(region);
      return success;
    }

    // Retrieves a region by the specified id
    var retrieveRegion = function(regionId) {
      var region = regionDbao.retrieveRegion(regionId);
      return region;
    }

    // Retrieve all regions currently active
    var retrieveAllRegions = function() {
      var regions = regionDbao.retrieveAllRegions();
      return regions;
    }

    // Clear the current regions in the db
    var clearRegions = function() {
      var success = regionDbao.clearRegions();
      return success;
    }

    return {
      regionDbao: regionDbao,
      addRegion: addRegion,
      addAllRegions: addAllRegions,
      retrieveRegion: retrieveRegion,
      retrieveAllRegions: retrieveAllRegions,
      clearRegions: clearRegions
    }
};
exports.RegionService = RegionService;
