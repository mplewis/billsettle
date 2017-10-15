const webpack = require('./config/webpack/test.js')

const files = [
  'spec/javascript/spec_helper.js',
  'spec/javascript/**/*_spec.js',
  'spec/javascript/**/*_spec.jsx'
]

const preprocessors = {}
files.forEach(glob => (preprocessors[glob] = ['webpack', 'sourcemap']))

const mocha = {
  ui: 'bdd-lazy-var/rspec',
  require: [require.resolve('bdd-lazy-var/bdd_lazy_var_rspec')]
}

const config = {
  reporters: ['mocha'],
  frameworks: ['mocha', 'sinon-chai'],
  browsers: ['jsdom'],
  client: { mocha },
  files,
  preprocessors,
  webpack
}

if (process.env.CI) {
  config.reporters.push('junit')
  config.junitReporter = {
    outputDir: '/tmp/test-results',
    outputFile: 'karma.xml',
    useBrowserName: false
  }
}

module.exports = function (base) {
  base.set(config)
}
