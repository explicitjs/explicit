"use strict";

var Lab = require("lab"),
    lab = Lab.script(),
    expect = Lab.expect,
    describe = lab.describe,
    it = lab.it,
    explicit = require("../../lib");

function noop() {
    return undefined;
}

describe("Async definitions", function () {
    it("should be marked async", function (done) {
        expect(explicit.async({
            $one: true,
            $: noop
        }).$async).to.equal(true);
        done();
    });
});

exports.lab = lab;