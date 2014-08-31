"use strict";

var validate = require("../../lib/validate"),
    Joi = require("joi"),
    clone = Array.prototype.slice,
    util = require("util");

module.exports = {
    name: "args",
    validate: validate(Joi.array().default([])),
    attach: function (definition, method) {
        method.$args = definition.$args;

        var firstCall = true,
            $argsLength,
            $argNames,
            testSchema,
            helperObject = {};

        function initCall() {
            firstCall = false;
            $argsLength = method.$args.length;
            testSchema = {};
            $argNames = [];

            method.$args.forEach(function ($arg, no) {
                var name = $arg.describe().meta || no;
                testSchema[name] = $arg;
                $argNames.push(name);
            });

            testSchema = Joi.object().keys(testSchema).unknown();
        }

        function applyObject(scope, object, args) {
            var i,
                res;

            if (!args) {
                args = [];
            }

            res = Joi.validate(object, testSchema);
            if (res.error) {
                throw res.error;
            }

            res = res.value;

            for (i = 0; i < $argsLength; i += 1) {
                args[i] = res[$argNames[i]];
            }
            return method.apply(scope, args);
        }

        method.applyValid = function (scope, args) {
            if (!util.isArray(args)) {
                throw new Error("Trying to apply non-array with applyValid: " + args);
            }

            if (firstCall) {
                initCall();
            }

            for (var i = 0; i < $argsLength; i += 1) {
                helperObject[$argNames[i]] = args[i];
            }

            return applyObject(scope, helperObject, args);
        };

        method.valid = function () {
            return method.applyValid(this, clone.apply(arguments));
        };

        method.applyObject = function (scope, object) {
            if (firstCall) {
                initCall();
            }

            return applyObject(scope, object);
        };

        method.validObject = function(object) {
            return method.applyObject(this, object);
        };
    }
};