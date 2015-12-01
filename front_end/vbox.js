//hbox
//Jake Ehrlich

function VBox(gui, spacing) {
  Group.call(this, gui);
  this.spacing = spacing;
}

VBox.prototype = Object.create(Group.prototype, {
  nextPosition: {value: function(lastPos, lastDim) {
    return {y:lastPos.y + lastDim.y + this.spacing, x:lastPos.x};
  }},
  reduceX: {value: function(x1, x2) {
    return Math.max(x1, x2);
  }},
  reduceY: {value: function(y1, y2) {
    return y1 + y2 + this.spacing;
  }}
});
VBox.prototype.constructor = VBox;
