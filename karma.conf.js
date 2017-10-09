const webpackConfig = require('./config/webpack/test.js')

module.exports = function (config) {
  config.set({
    reporters: ['mocha'],
    frameworks: ['mocha', 'chai'],
    browsers: ['jsdom'],
    files: [{ pattern: 'spec/javascript/**/*.js', watched: false }],
    preprocessors: {
      'spec/javascript/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig
  })
}
