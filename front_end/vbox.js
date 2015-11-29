//hbox
//Jake Ehrlich

function VBox(gui, spacing) {
  super(gui);
  this.spacing = spacing;
}

VBox.prototype = Object.create(Group.prototype, {
  nextPostion: function(lastPos, lastDim) {
    return {y:lastPos.y + lastDim.y + this.spacing, x:lastPos.x};
  },
  reduceX: function(x1, x2) {
    return Math.max(x1, x2);
  },
  reduceY: function(y1, y2) {
    return y1 + y2 + this.spacing;
  }
}
