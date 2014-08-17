"use strict";

var validateDefinitions = require("./validate/definitions"),
    validateOptions = require("./validate/options"),
    assertPlugin = require("./assertPlugin"),
    PluginMap = require("./PluginMap"),
    args_plugin = require("../plugin/args"),
    util = require("util");

function prepareDefinitions(definitions, options, modify) {
    if (modify) {
        if (util.isArray(definitions)) {
            definitions.forEach(modify);
        } else if (definitions.$one) {
            modify(definitions);
        } else {
            Object.keys(definitions).forEach(function (key) {
                modify(definitions[key]);
            });
        }
    }
    definitions = validateDefinitions(definitions, options.plugins);
    return definitions;
}

function prepareOptions(options) {
    options = assertPlugin(options, args_plugin);
    options = validateOptions(options);
    options.plugins = new PluginMap(options.plugins);
    return options;
}

module.exports = function (definitions, options, modify) {
    options = prepareOptions(options);
    return {
        definitions: prepareDefinitions(definitions, options, modify),
        options: options
    };
};