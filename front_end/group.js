import "renderable.js"

function Group(gui) {
  super(gui);
  this.children = [];
  this.toAdd = [];
  this.parent = null;
}

//a sort of abstract class for rendering groups of things
Group.pototype = Object.create(Renderable.prototype, {

  add: function(elem) {
    if(elem.parent == null) {
      elem.parent = this;
      this.toAdd.push(elem);
    }
  },

  reduceX: function(y1, y2) {
    return Math.max(y1, y2);
  },

  reduceY: function(x1, x2) {
    return Math.max(x1, x2);
  },

  nextPostion: function(lastPos, lastDim) {
    return lastPos;
  },

  addAll: function(elems) {
    for(var i = 0; i < elems.length; ++i) {
      this.add(elems[i]);
    }
  },

  update: function() {
    var widht = 0;
    var height = 0;

    this.children.push(...this.toAdd);
    this.toAdd = [];

    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].update();
        width = this.reduceX(this.elements[i].dimensions.x, width);
        height = this.reduceY(this.elements[i].dimensions.y, height);
    }

    this.dimensions.x = width;
    this.dimensions.y = height;
  },

  render: function(context, xoff, yoff) {
    super.render(context, xoff, yoff)
    pos = {x : xoff + this.position.x, y : yoff + this.position.y}
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].render(context, pos.x, pos.y);
      pos = nextPostion(pos, this.children[i].dimensions);
    }
  }
});
