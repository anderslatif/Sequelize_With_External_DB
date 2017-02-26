var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.join(__dirname, "src"),
    target: 'node',
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./index.js",
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            loaders: ['babel-loader?presets[]=es2015'],
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.less$/,
            loaders: ['style', 'css', 'less']
        }, {
            test: /\.(eot|ttf|svg|gif|png)$/,
            loader: "file-loader"
        }]
    },
    output: {
        path: __dirname + "/src/",
        filename: "client.min.js"
    },
    plugins: debug ? [] : [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('main.css', {
            allChunks: true
        })
    ],
};