"use strict";

var Joi = require("joi");

module.exports = Joi.object({
    plugins: Joi.array().default([])
}).strict();