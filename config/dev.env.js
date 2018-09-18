'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"//47.105.37.204:8080"'
  // API_ROOT: '"//10.227.17.169:8080"'
  // API_ROOT: '"//47.105.105.23:8888"'
  // API_ROOT: '"//47.105.105.23/back"'
})
