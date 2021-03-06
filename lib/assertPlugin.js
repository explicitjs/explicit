'use strict'

function assertPlugin (options, plugin) {
  if (!options) {
    options = {}
  }
  if (!options.plugins) {
    options.plugins = []
  }
  if (!Array.isArray(options.plugins)) {
    if (options.plugins === plugin) {
      return options
    }
    options.plugins = [plugin, options.plugins]
  } else if (options.plugins.indexOf(plugin) === -1) {
    options.plugins.unshift(plugin)
  }
  return options
}

module.exports = assertPlugin
