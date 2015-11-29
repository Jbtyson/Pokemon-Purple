// region.js
var Region = function(_regionId, _lat, _long, _length, _width, _name, _description) {
  var regionId = _regionId,
      lat = _lat,
      long = _long,
      length = _length,
      width = _width,
      name = _name,
      description = _description;

  var pokemon = [];

  return {
    regionId: regionId,
    lat: lat,
    long: long,
    length: length,
    width: width,
    name: name,
    description: description,
    pokemon: pokemon
  }
}
exports.Region = Region;
