const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const environment = require('./environment')

environment.plugins.get('Manifest').opts.writeToFileEmit =
  process.env.NODE_ENV !== 'test'

environment.plugins.set(
  'HardSource',
  new HardSourceWebpackPlugin({
    cacheDirectory: '../../tmp/hard-source/[confighash]/test'
  })
)

module.exports = environment.toWebpackConfig()
