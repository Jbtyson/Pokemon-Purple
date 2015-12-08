// regionManager.js
var Region = require("./region.js").Region;

var RegionManager = function(_regionService) {
    var regionService = _regionService;
    var regions = [];

    var init = function() {
      updateRegions();
      var regionTimeoutId = setInterval(updateRegions, 10000);
    }

    var updateRegions = function() {
      console.log("Beginning region update...");
      regionService.retrieveAllRegions(function(_regions) {
        regions = _regions
        console.log("Region update complete.");
        console.log(regions);
      });
    }


    return {
      regions: regions,
      init: init,
      updateRegions: updateRegions
    }
};
exports.RegionManager = RegionManager;
