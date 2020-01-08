'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // NODE_ENV: '"production"',
  API: '"/api"',// 加入这一句
  BASE_API: '"http://www.geechori.com:8899/"' //线上路径
})
