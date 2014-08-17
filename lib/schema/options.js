"use strict";

var Joi = require("joi"),
    PluginNoName = Joi.object({
        validate: Joi.func().required(),
        augment: Joi.func(),
        attach: Joi.func()
    }),
    Plugin = PluginNoName.keys({
        name: Joi.string().required()
    }),
    PluginNames = Joi.array().includes(Joi.string());

module.exports = Joi.object({
    plugins: Joi.alternatives().try(
        Joi.array().includes(Plugin, Joi.string()),
        Plugin
    ).default([])
}).strict();