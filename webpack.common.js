/* eslint-disable no-useless-escape */
// -> Require statements for helper modules
const path = require("path");

module.exports = {
  //Tells webpack if it is development or production mode so that it can build the files appropriately
  mode: "development",

  // -> Tells webpack to run babel on every file it runs through and also define the folders to exclude
  module: {
    rules: [
      {
        test: /\js?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              path: path.resolve(__dirname, "public"),
              outputPath: "/static-assets",
              publicPath: "/static-assets",
              fallback: "responsive-loader",
              quality: 85
            }
          }
        ]
      },
      {
        test: /favicon\.ico$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  }
};
