"use strict";

function assertPlugin(options, plugin) {
    if (!options) {
        options = {};
    }
    if (!options.plugins) {
        options.plugins = [];
    }
    if (options.plugins.indexOf(plugin) === -1) {
        options.plugins.unshift(plugin);
    }
    return options;
}

module.exports = assertPlugin;