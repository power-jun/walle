"use strict";

var Scene = function () {
  this.elements = [];
  this.events = new Events();
};


Scene.prototype.addElement = function (element) {
  console.log("add", element);
  this.elements.push(element);
  this.events.dispatchEvent('change', element);
};

Scene.prototype.getEdges = function () {
  return this.getElements('edge');
};

Scene.prototype.getWalls = function () {
  return this.getElements('wall');
};


Scene.prototype.getElements = function (type) {
  if (!type) return this.elements;

  type = type.toLowerCase();

  let elements = [];

  this.elements.forEach(function (element) {
    let typeOf = Scene.typeof(element);

    if(typeOf === type){
      elements.push(element);
    }
  });

  return elements;
};


Scene.prototype.hasElement = function (element) {
  return this.elements.indexOf(element) >= 0;
};


Scene.prototype.toJson = function () {

  let groups = {};

  this.elements.forEach(function (element) {
    let typeOf = Scene.typeof(element);
    groups[typeOf] = groups[typeOf] || [];
    groups[typeOf].push(element.toJson());
  });

  return groups;
};

/** events **/
Scene.prototype.onChange = function (handler) {
  this.events.addEventListener('change', handler);
};

Scene.prototype.offChange = function (handler) {
  this.events.removeEventListener('change', handler);
};



Scene.typeof = function (obj) {
  if(Edge.isEdge(obj)) return 'edge';
  if(Wall.isWall(obj)) return 'wall';
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

