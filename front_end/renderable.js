function Renderable(gui) {
  this.gui = gui;
  this.dimensions = { x:0, y:0 };
  this.position = { x:0, y:0 };
  this.nextPos = { x:0, y:0 };
}

Renderable.prototype = {
  setPosition: function(sx, sy) {
    this.nextPos = { x:sx, y:sy };
  },
  update: function() {
    this.position = this.nextPos;
  },
  render: function(context) {

  }
}
