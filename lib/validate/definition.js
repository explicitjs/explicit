"use strict";

var validate = require("./index")(require("../schema/definition"));

module.exports = function (plugins) {
    return function (definition) {

        /*jslint nomen: true */
        if (typeof definition !== "object" || definition === null || definition === undefined) {
            return {
                $one: true,
                _raw: true,
                _rawContent: definition
            };
        }
        definition = validate(definition);
        plugins.forEach(function (plugin) {
            var field = "$" + plugin.name;
            definition[field] = plugin.validate(definition[field]);
        });
        return definition;
    };
};