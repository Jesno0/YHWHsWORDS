'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST:'"http://3g8oacl.nat.ipyingshe.com/"'
  API_HOST:'"http://t3p4d9j.nat.ipyingshe.com/"'
})
