"use strict";

var Lab = require("lab"),
    lab = Lab.script(),
    expect = Lab.expect,
    describe = lab.describe,
    it = lab.it,
    assertPlugin = require("../lib/assertPlugin");

describe("filling a plugin property of options should", function () {
    it("work if no plugin object were given", function (done) {
        expect(assertPlugin(null, 1)).to.be.deep.equal({
            plugins: [1]
        });
        done();
    });

    it("work if a object was given", function (done) {
        expect(assertPlugin({}, 1)).to.be.deep.equal({
            plugins: [1]
        });
        done();
    });

    it("work if a plugins array was given", function (done) {
        expect(assertPlugin({
            plugins: []
        }, 1)).to.be.deep.equal({
            plugins: [1]
        });
        done();
    });

    it("work if a plugins array with that particular plugin was given", function (done) {
        expect(assertPlugin({
            plugins: [1]
        }, 1)).to.be.deep.equal({
            plugins: [1]
        });
        done();
    });

    it("work if a plugins array with any plugin was given", function (done) {
        expect(assertPlugin({
            plugins: [2]
        }, 1)).to.be.deep.equal({
            plugins: [1, 2]
        });
        done();
    });
});

exports.lab = lab;