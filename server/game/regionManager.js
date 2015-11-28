// regionManager.js
var RegionManager = function() {
    var regions = [];

    var init = function() {
      initTimers();
    }

    var standardUpdate = function() {
      regions = [];
      
    }

    return {
      regions: regions,
      standardUpdate: standardUpdate;
    }
};
exports.RegionManager = RegionManager;
