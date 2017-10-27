const { exec } = require('shelljs')
const { writeFileSync, existsSync } = require('fs')
const webpack = require('./config/webpack/test.js')

const path = require('path')

const globalSchemaFile = 'tmp/global_schema.js'
if (!existsSync(globalSchemaFile)) {
  writeFileSync(
    globalSchemaFile,
    `window.GRAPHQL_SCHEMA_STRING = \`${exec('rails graphql:schema')}\``
  )
}

const files = [
  globalSchemaFile,
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

webpack.module.rules.push({
  test: /\.jsx?$/,
  use: {
    loader: 'istanbul-instrumenter-loader',
    options: { esModules: true }
  },
  exclude: /node_modules|\.spec\.jsx?$/
})

const config = {
  reporters: ['mocha', 'coverage-istanbul'],
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
  config.coverageIstanbulReporter = {
    dir: '/tmp/test-results'
  }
}

module.exports = function (base) {
  base.set(config)
}
