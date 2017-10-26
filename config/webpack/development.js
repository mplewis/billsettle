const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const environment = require('./environment')

const babel = environment.loaders.get('babel')
babel.test = /\.(js)?(\.erb)?$/

const babelJsx = Object.assign({}, babel)
babelJsx.test = /\.(jsx)?(\.erb)?$/
babelJsx.use = [
  { loader: babelJsx.loader, options: babelJsx.options },
  'vue-jsx-hot-loader'
]
delete babelJsx.loader
delete babelJsx.options
environment.loaders.set('babelJsx', babelJsx)

environment.plugins.set(
  'HardSource',
  new HardSourceWebpackPlugin({
    cacheDirectory: '../../tmp/hard-source/[confighash]/development'
  })
)

module.exports = environment.toWebpackConfig()
