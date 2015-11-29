//hbox
//Jake Ehrlich

function HBox(gui, spacing) {
  super(gui);
  this.spacing = spacing;
}

HBox.prototype = Object.create(Group.prototype, {
  nextPostion: function(lastPos, lastDim) {
    return {x:lastPos.x + lastDim.x + this.spacing, y:lastPos.y};
  },
  reduceX: function(x1, x2) {
    return x1 + x2 + this.spacing;
  },
  reduceY: function(y1, y2) {
    return Math.max(y1, y2);
  }
});
