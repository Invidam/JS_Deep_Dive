"use strict";

var _lib = require("./lib");

console.log(_lib.pi);
console.log((0, _lib.power)(3, 4));
var f = new _lib.Foo();
console.log(f.foo(), f.bar());