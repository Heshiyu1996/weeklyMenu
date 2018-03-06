'use strict'
const utils = require('./utils')
const config = require('../config')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const functions = require('postcss-functions')
const isProduction = process.env.NODE_ENV === 'production'

const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

// 原来的function.css里的方法
const px2rem = function (px) {
    var newPx = px.slice(0, px.length - 2)
    var base = 37.5
    var val = parseFloat(newPx) / base
    return val + 'rem'
}

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: sourceMapEnabled,
        extract: isProduction
    }),
    cssSourceMap: sourceMapEnabled,
    cacheBusting: config.dev.cacheBusting, 
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    },
    postcss: {
        plugins: [precss, autoprefixer, functions({
            functions: {
                'px2rem': px2rem
            }
        })]
    }
}
