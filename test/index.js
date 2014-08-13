"use strict";

var Lab = require("lab"),
    lab = Lab.script(),
    expect = Lab.expect,
    describe = lab.describe,
    it = lab.it,
    explicit = require("../lib");

describe("a regular explicit call should", function () {
    it("just pass", function (done) {
        function noop() {
            return undefined;
        }
        expect(explicit({
            $one: true,
            $: noop
        })).to.be.equal(noop);
        done();
    });
});

describe("using explicit should allow modification of", function () {
    it("a single definitions", function (done) {
        function noop() {
            return undefined;
        }
        var result = explicit({
            $one: true
        }, null, function (definition) {
            definition.$ = noop;
        });
        expect(result).to.be.equal(noop);
        done();
    });

    it("a map of definitions", function (done) {
        function noop() {
            return undefined;
        }
        var result = explicit({
            test: {}
        }, null, function (definition) {
            definition.$ = noop;
        });
        expect(result).to.be.eql({
            test: noop
        });
        done();
    });

    it("an array of definitions", function (done) {
        function noop() {
            return undefined;
        }
        var result = explicit([{
            $one: true
        }, {
            $one: true
        }], null, function (definition) {
            definition.$ = noop;
        });
        expect(result).to.be.eql([noop, noop]);
        done();
    });
});

describe("using explicit should break with a", function () {
    it("number to modify something", function (done) {
        try {
            explicit(null, null, 1);
        } catch (e) {
            expect(e.message).to.be.equal("Can not modify explicit definitions with: 1");
            return done();
        }
        throw new Error("No exception thrown.");
    });
});

exports.lab = lab;