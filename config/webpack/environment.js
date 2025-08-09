const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

// Add environment variables to webpack
environment.plugins.prepend('Environment', new webpack.EnvironmentPlugin([
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID', 
  'REACT_APP_FIREBASE_APP_ID',
  'REACT_APP_FIREBASE_MEASUREMENT_ID'
]))

module.exports = environment
