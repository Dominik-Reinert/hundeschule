const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const distPath = path.resolve(__dirname, "./front/dist");
const publicPath = path.resolve(__dirname, "./public");
const publicDistPath = path.resolve(publicPath, "./dist");
const publicFavIconPath = path.resolve(publicPath, "./favicon.ico");
const publicIndexPath = path.resolve(publicPath, "./index.html");

module.exports = {
  mode: "development",

  // webpack will take the files from ./src/index
  entry: [ 
    path.resolve('./front/src/index.tsx')
  ],

  // and output it into /dist as bundle.js
  output: {
    path: publicDistPath,
    filename: "bundle.js",
  },
  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: (() => {
        console.log(`templateindex path: ${publicIndexPath}`)
        return path.resolve('./front/src/index.html')})(),
    }),
  ],
};
