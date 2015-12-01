// regionManager.js
var Region = require("./region.js").Region;

var RegionManager = function(_regionService) {
    var regionService = _regionService;
    var regions = [];

    var init = function() {
      regions = regionService.retrieveAllRegions();
      var regionTimeoutId = setInterval(updateRegions, 2000);
    }

    var updateRegions = function() {
      console.log("Beginning region update...");
      regions = regionService.retrieveAllRegions();
      console.log("Region update complete.");
    }


    return {
      regions: regions,
      init: init,
      updateRegions: updateRegions
    }
};
exports.RegionManager = RegionManager;
