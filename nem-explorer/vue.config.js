// Read config files that may not exist.
const fs = require('fs')
const webpack = require('webpack')

const readConfig = configPath => {
  let config
  try {
    config = fs.readFileSync(configPath, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File not found, copy from template to config path during bootstrap.
      fs.copyFileSync(configPath + '.mt', configPath)
      config = fs.readFileSync(configPath, 'utf8')
    } else {
      throw error
    }
  }
  return config
}

const peersApi = readConfig('src/config/peers-api.json')
const endpoints = readConfig('src/config/endpoints.json')

module.exports = {
  // base url
  publicPath: '/',
  // output dir
  outputDir: './www',
  // eslint-loader check
  lintOnSave: true,
  // webpack-dev-server
  devServer: {
    host: '0.0.0.0',
    port: 7898,
    before: app => {
    }
  },
  // Define custom variables, dependent on the config variables.
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        PEERS_API: peersApi,
        ENDPOINTS: endpoints
      })
    ]
  }
}
