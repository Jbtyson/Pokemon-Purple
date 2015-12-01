// Gui.js
// Jake Ehrlich

function between(x, base, width) {
	return x > base && x < (base + width);
}

function inBox(pos, dim, x, y) {
    return between(x, pos.x, dim.x) && between(y, pos.y, dim.y);
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
			var pos = this.objects[i].position;
			var dim = this.objects[i].dimensions;
      if(this.objects[i].onClick != null && inBox(pos, dim, x, y)) {
				this.objects[i].onClick(x, y);
			}
		}
	}
};
