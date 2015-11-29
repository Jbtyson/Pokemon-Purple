// Gui.js
// Jake Ehrlich

function between(x, base, width) {
	return x > base && x < (base + width);
}

function convert(parent, pos) {
	if(parent == null) return pos;
	var next = {x : pos.x + parent.position.x, y : pos.y + parent.position.y}
	console.log(next);
	return convert(parent.parent, next);
}

function inBox(elem, x, y) {
	  var pos = convert(elem.parent, elem.position);
		console.log(pos, elem.dimensions, x, y);
		//var dim = convert(elem.parent, elem.dimensions);
    return between(x, pos.x, elem.dimensions.x) &&
		       between(y, pos.y, elem.dimensions.y);
}

function Gui(canvas) {
	var ctx = canvas.getContext("2d");
	this.objects = [];
	this.context = ctx;
	this.canvas = canvas;
}

Gui.prototype = {
	init: function() {
		var obj = this;
    this.canvas.addEventListener('click', function(event) { obj.onClick(event) }, false);
	},
	add: function(elem) {
    this.objects.push(elem);
	},
  onClick: function(event) {
		var x = event.pageX - this.canvas.offsetLeft,
        y = event.pageY - this.canvas.offsetTop;
		for (var i = 0; i < this.objects.length; i++) {
      if(this.objects[i].onClick != null && inBox(this.objects[i], x, y)) {
				this.objects[i].onClick(x, y);
			}
		}
	}
};
