"use strict";

var expect = require('chai').expect
var joi = require("joi")
var explicit = require("../../")
var validate = require("../../lib/validate")
var PluginMap = require("../../lib/PluginMap")

function firstKey(object) {
    var key;
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            return {
                key: key,
                value: object[key]
            };
        }
    }
}

function makeArray(argList) {
    return argList.map(function (arg) {
        return firstKey(arg).value;
    });
}

function makeObject(argList) {
    var result = {};
    argList.forEach(function (arg) {
        arg = firstKey(arg);
        result[arg.key] = arg.value;
    });
    return result;
}

function noop() {
    return Array.prototype.slice.apply(arguments);
}

function augment(op) {
    return explicit({$one: true, $args: Array.prototype.slice.apply(arguments, [1]), $: op});
}

function expectInvalid(exec, method, args, done, error) {
    if (!error) {
        error = "ValidationError";
    }
    try {
        exec(method, args);
    } catch (e) {
        expect(e.name).to.be.equal(error);
        return done();
    }
    throw new Error("Expected exception not thrown.");
}

describe("Making sure validation works", function () {
    it("should use the new argument from the proper position", function (done) {
        var method = explicit({
            $one: true,
            $args: [joi.number()],
            $assert: true,
            $: noop
        });
        try {
            method("a");
        } catch (e) {
            done();
            return;
        }
        throw new Error("There should have been an error");
    });
});
