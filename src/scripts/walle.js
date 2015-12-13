"use strict";

/**
 * Constructor
 * @param container
 * @constructor
 */
var Walle = function (container) {

  this.document = jQuery(document);

  //init vars;
  this.width = container.offsetWidth;
  this.height = container.offsetHeight;
  this.emitter = new EventEmitter2({wildcard: true});
  this.superPower = false;
  this.debugMode = false;

  // init wrapper
  this.wrapper = jQuery("<div/>", {
    width: this.width,
    height: this.height,
    class: 'walle-wrapper'
  });
  this.wrapper.appendTo(container);

  //init paper
  this.paper = Snap(this.width, this.height);
  this.paper.appendTo(this.wrapper.get(0));

  //init features
  this.features = {
    grid: new Grid(this),
    wallsDrawer: new WallsDrawer(this)
  };

  //register events
  let buttons = {shift: 16, esc: 27};
  this.document.on("keydown", event => {
    //abort
    if (event.keyCode == buttons.esc) this.emitter.emit("abort.**");

    //shift
    if (event.keyCode == buttons.shift) this.superPower = true;
  });

  this.document.on("keyup", event => {
    //shift
    if (event.keyCode == buttons.shift) this.superPower = false;
  });
};

/**
 * Easter egg
 */
Walle.prototype.easterEgg = function () {
  let bigCircle = this.paper.circle(150, 150, 100);
  bigCircle.attr({
    fill: "#bada55",
    stroke: "#000",
    strokeWidth: 5
  });

  this.paper.click(function (d) {
    bigCircle.animate({
      cx: d.x,
      cy: d.y,
      r: (Math.random() * 100) + 50
    }, 1000, mina.bounce);
  });

};

/**
 * get feature
 */
Walle.prototype.feature = function (featureName) {
  if (!this.features.hasOwnProperty(featureName)) {
    throw new Error("feature " + featureName + " not found");
  }
  return this.features[featureName];
};


/**
 * changeCursor
 */
Walle.prototype.changeCursor = function (cursor) {
  this.wrapper.css('cursor', cursor);
};



