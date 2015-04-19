"use strict";

var validate = require("../../lib/validate"),
    clone = Array.prototype.slice,
    Joi = require("joi"),
    createArgValidator = require("../_util/argValidator");

module.exports = {
    name: "assert",
    validate: validate(Joi.boolean().default(false)),
    augment: function (definition, method) {
        if (!definition.$assert) {
            return method;
        }
        method.$args = definition.$args;

        var validator = createArgValidator(method);

        return function () {
            return validator.applyArray(this, clone.apply(arguments));
        };
    }
};