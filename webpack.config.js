const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path')


module.exports = {
  mode: "development",

  // webpack will take the files from ./src/index
  entry: './front/src/index.tsx',
  output: {
     path: path.join(__dirname, '/public'),
     filename: 'bundle.min.js'
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
    contentBase: __dirname + "/public/",
    inline: true,
    host: '0.0.0.0',
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: (() => {
        console.log(`templateindex path: ${__dirname + '/front/src/index.html'}`)
        return __dirname + '/front/src/index.html'})(),
    }),
  ],
};
