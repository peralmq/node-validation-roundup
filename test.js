var someObject = {
  a:"one",
  b:2,
  c: {
    a: [3],
    b: {},
    c: [],
  }
};

var JSVenv = require('JSV').JSV.createEnvironment();

var validators = {
  JSV: function () {
    var validator = JSVenv;
    validator.validate(someObject, {type: 'object', properties: {a: {type: "string"}}});
  },

  revalidator: function () {
    var validator = require('revalidator');
    validator.validate(someObject, {properties: {a: {type: "string"}}});
  },

  paperwork: function () {
    var validator = require('paperwork');
    validator({a: String}, someObject, function(err, result) {});
  },

  esv: function () {
    var validator = require('express-schema-validator');
    validator.validate(someObject, {a: {type: String}}, function(err, result){});
  },

  joi: function () {
    var joi = require('joi');
    joi.validate(someObject, joi.object().keys({ a: joi.string() }), function (err, result) {});
  }
};

for(v in validators) {
  process.stdout.write('Running test on ' + v + ', ');
  console.time('took');
  for(var i=0; i<1000; i++) {
    validators[v]();
  }
  console.timeEnd('took');
}

