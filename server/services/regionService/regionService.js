// regionService.js
var RegionDbao = require("./regionDbao").RegionDbao;
var Region = require("./../../game/region").Region;

var RegionService = function(db) {
    var regionDbao = new RegionDbao(db);

    // Adds a region to the db
    var addRegion = function(region, callback) {
      var success = regionDbao.addRegion(region, function(success) {
        callback(success);
      });
    }

    // Adds all regions in a list to the db
    var addAllRegions = function(regions, callback) {
      var success = regionDbao.addAllRegions(region, function(success) {
        callback(success);
      });
    }

    // Retrieves a region by the specified id
    var retrieveRegion = function(regionId, callback) {
      var region = regionDbao.retrieveRegion(regionId, function(region) {
        callback(region);
      });
    }

    // Retrieve all regions currently active
    var retrieveAllRegions = function(callback) {
      var regions = regionDbao.retrieveAllRegions(function(regions) {
        callback(regions);
      });
    }

    // Clear the current regions in the db
    var clearRegions = function(callback) {
      var success = regionDbao.clearRegions(function(success) {
        callback(success);
      });
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
