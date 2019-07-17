'use strict'

var validate = require('../../lib/validate')
var Joi = require('@hapi/joi')

module.exports = {
  name: 'async',
  validate: validate(Joi.boolean())
}
