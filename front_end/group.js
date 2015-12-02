
function Group(gui) {
  Renderable.call(this, gui);
  this.children = [];
  this.toAdd = [];
}

Group.prototype = Object.create(Renderable.prototype, {

  shift: {value: function(elem) {
    //if(elem.parent == null) {
      this.children.shift();
    //}
  }},

  add: {value: function(elem) {
    //if(elem.parent == null) {
      this.toAdd.push(elem);
    //}
  }},

  reduceX: {value: function(y1, y2) {
    return Math.max(y1, y2);
  }},

  reduceY: {value: function(x1, x2) {
    return Math.max(x1, x2);
  }},

  nextPosition: {value: function(lastPos, lastDim) {
    return lastPos;
  }},

  onClick: {value: function(x, y) {
    var x = x - this.position.x;
    var y = y - this.position.y;
    var pos = {x:0, y:0};
    for (var i = 0; i < this.children.length; i++) {
			var dim = this.children[i].dimensions;
      if(this.children[i].onClick != null && inBox(pos, dim, x, y)) {
        this.children[i].onClick(x - pos.x, y - pos.y);
      }
      pos = this.nextPosition(pos, dim);
    }
  }},

  addAll: {value: function(elems) {
    for(var i = 0; i < elems.length; ++i) {
      this.add(elems[i]);
    }
  }},

  update: {value: function() {
    var width = 0;
    var height = 0;

    Renderable.prototype.update.apply(this);

    this.children.push(...this.toAdd);
    this.toAdd = [];

    for (var i = 0; i < this.children.length; i++) {
        this.children[i].update();
        width = this.reduceX(this.children[i].dimensions.x, width);
        height = this.reduceY(this.children[i].dimensions.y, height);
    }

    this.dimensions.x = width;
    this.dimensions.y = height;
  }},

  render: {value: function(context, xoff, yoff) {
    //super.render(context, xoff, yoff)
    var pos = {x : xoff + this.position.x, y : yoff + this.position.y}
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].render(context, pos.x, pos.y);
      pos = this.nextPosition(pos, this.children[i].dimensions);
    }
  }}
});
Group.prototype.constructor = Group;
