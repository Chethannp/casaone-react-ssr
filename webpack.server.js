// -> Require statements for helper modules
const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const serverConfig = {
  // -> To inform webpack that we are building a bundle for nodeJs
  target: "node",

  // -> Tells webpack where the root file of our server application is
  entry: "./src/server/index.js",

  // Need this to avoid error when working with Express
  externals: [nodeExternals()],

  // -> Tells webpack where to put the output file that is generated
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
};

//Merge the common modules
module.exports = merge(common, serverConfig);
