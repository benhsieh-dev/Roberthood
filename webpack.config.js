var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./frontend/roberthood.jsx",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js", // Output JS file name
    publicPath: "/assets/javascripts/", // Adjust path for proper asset resolution
    sourceMapFilename: "[file].map", // Ensure correct location for source maps
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: false,
        vendors: false,
        // Force everything into a single bundle
        bundle: {
          name: "bundle",
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      // Babel loader to transpile JS/JSX
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"],
          },
        },
      },
      // Source map loader to extract source maps from dependencies
      {
        test: /\.js$/,
        enforce: "pre", // This ensures the loader runs before Babel loader
        use: ["source-map-loader"],
      },
    ],
  },
  devtool: process.env.NODE_ENV === "production" ? false : "source-map", // Disable source maps in production
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
  plugins: [
    new webpack.DefinePlugin({
      FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      FIREBASE_APP_ID: JSON.stringify(process.env.FIREBASE_APP_ID),
      FIREBASE_MEASUREMENT_ID: JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "app", "assets", "javascripts"), // Serve the static files
    compress: true,
    port: 9000, // Example port, adjust as needed
    publicPath: "/assets/javascripts/", // Ensure the dev server matches the public path
    historyApiFallback: true, // Allow single-page app routing
  },
};