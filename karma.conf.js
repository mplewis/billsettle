const webpack = require('./config/webpack/test.js')

const specs = ['spec/javascript/**/*_spec.js', 'spec/javascript/**/*_spec.jsx']

const files = specs.map(glob => ({ pattern: glob, watched: false }))
const preprocessors = {}
specs.forEach(glob => (preprocessors[glob] = ['webpack', 'sourcemap']))

const mocha = {
  ui: 'bdd-lazy-var/getter',
  require: [require.resolve('bdd-lazy-var/bdd_lazy_var_getter')]
}

module.exports = function (config) {
  config.set({
    reporters: ['mocha'],
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['jsdom'],
    client: { mocha },
    files,
    preprocessors,
    webpack
  })
}
