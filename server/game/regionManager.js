// regionManager.js
var Region = require("./region.js").Region;

var RegionManager = function() {
    var regions = [];

    var init = function() {
      updateRegions();
      var regionTimeoutId = setInterval(updateRegions, 2000);
    }

    var updateRegions = function() {
      console.log("Beginning region update...");
      regions = [];
      createNicholsRegion();
      console.log("Region update complete.");
    }

    var createNicholsRegion = function() {
      var region = new Region(0, 39.186760, -96.581288, 100, 50, "Nichols", "This is a test region description.");
      region.pokemon.push(10);
      regions.push(region);
    }

    return {
      regions: regions,
      init: init,
      updateRegions: updateRegions
    }
};
exports.RegionManager = RegionManager;
