const webpack = require('./config/webpack/test.js')

const specs = ['spec/javascript/**/*.js', 'spec/javascript/**/*.jsx']

const files = specs.map(glob => ({ pattern: glob, watched: false }))
const preprocessors = {}
specs.forEach(glob => (preprocessors[glob] = ['webpack', 'sourcemap']))

module.exports = function (config) {
  config.set({
    reporters: ['mocha'],
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['jsdom'],
    files,
    preprocessors,
    webpack
  })
}
