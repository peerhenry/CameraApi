const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Parts

const entry = {
  entry: './js/main.js'
}

const testEntry = {
  entry: './js/tests.js'
}

const output = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'wwwroot')
  }
}

const babelLoader = {
  module: {
    rules: [{ 
      test: /\.js$/, 
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}

const mochaLoader = {
  module: {
    rules: [{
      test: /\.test.js$/,
      use: 'mocha-loader',
      exclude: /node_modules/
    }]
  }
}

const devServer = {
  devServer: {
    contentBase: path.join(__dirname, "wwwroot"),
    port: 8091
  }
}

const testDevServer = {
  devServer: {
    port: 8091,
    open: true,
    overlay: true,
    watchOptions: {
      aggregateTimeout: 300 // delay rebuild because otherwise somehow only the changed test is shown on browser refresh
    }
  }
}

const devMode = {
  mode: "development"
}

const productionMode = {
  mode: "production"
}

function page(title){
  return {
    plugins: [
      new HtmlWebpackPlugin({title})
    ]
  }
}

// Configs

const productionConfig = merge([
  entry,
  output,
  babelLoader,
  productionMode
]);

const testConfig = merge([
  testEntry,
  babelLoader,
  mochaLoader,
  testDevServer,
  devMode,
  page("Test page")
]);

const debugConfig = merge([
  entry,
  output,
  babelLoader,
  devServer,
  devMode
]);

module.exports = (env) => {
  switch(env){
    case "production":
      return productionConfig;
    case "test":
      return testConfig;
    case "debug":
    case "development":
    default:
      return debugConfig;
  }
}