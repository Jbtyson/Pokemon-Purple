//hbox
//Jake Ehrlich

function HBox(gui, spacing) {
  Group.call(this, gui);
  this.spacing = spacing;
}

HBox.prototype = Object.create(Group.prototype, {
  nextPosition: {value: function(lastPos, lastDim) {
    return {x:lastPos.x + lastDim.x + this.spacing, y:lastPos.y};
  }},
  reduceX: {value: function(x1, x2) {
    return x1 + x2 + this.spacing;
  }},
  reduceY: {value: function(y1, y2) {
    return Math.max(y1, y2);
  }}
});
HBox.prototype.constructor = HBox;
