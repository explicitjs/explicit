"use strict";

/*jslint nomen: true*/

var util = require("util"),
    validateDefinition = require("./definition");

function validateMap(definitions, localVD) {
    var result = {};
    Object.keys(definitions).forEach(function (name) {
        var entry = definitions[name];
        if (typeof entry === "function") {
            entry = {
                $: entry
            };
        }
        result[name] = localVD(entry);
    });
    return result;
}

function validateDefinitions(definitions, plugins) {
    var localVD = validateDefinition(plugins);

    if (util.isArray(definitions)) {
        return definitions.map(localVD);
    }

    if (typeof definitions === "object" && definitions !== null && definitions !== undefined) {
        if (definitions.$one) {
            return localVD(definitions);
        }
        return validateMap(definitions, localVD);
    }

    return localVD(definitions);
}

module.exports = validateDefinitions;