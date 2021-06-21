'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_HOST:'"http://3g8oacl.nat.ipyingshe.com/"'
})
