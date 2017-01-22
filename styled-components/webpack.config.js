var webpack = require('webpack');
var extend = require('extend');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    cache: true,
    debug: true,
    entry: {
        'main': './main.jsx'
    },
    output: {
        path: './build',
        publicPath: '/',
        filename: '[name].ag.js',
        chunkFilename: '[name].[hash].ag.js'
    },
    module: {
        loaders: [
            {
                test: /\.(es6|jsx)$/i,
                exclude: [/vendor-bower/, /node_modules/],
                loader: 'babel?{"cacheDirectory":true,"plugins":["transform-runtime","add-module-exports","transform-decorators-legacy","transform-class-properties",["transform-es2015-classes",{"loose":true}]],"presets":["es2015","stage-0","react"]}'
            },       
            {
                test: /\.(cshtml|html)$/i,
                loader: "html",
                query: { minimize: false }
            },
            {
                // simple files
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [ 'file?name=assets/[name]-[sha512:hash:base64:7].[ext]' ]
            },
            {
                // files with postfixes like "EAS-Icons.woff?1qdav3"
                test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/i,
                loaders: [ 'file?name=assets/[name]-[sha512:hash:base64:7].[ext]' ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader!autoprefixer-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader?camelCase=dashes&importLoaders=1&localIdentName=[local]-[hash:base64:5]!autoprefixer-loader!less-loader")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].ag.css', {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            children: true,
            async: true,
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['main'],
            template: './main.ejs',
            hash: true,
            skipRecompiles: true,
            inject: false
        })
    ],
    stats: {
        colors: true,
        modules: false,
        reasons: false
    },
    devtool: 'eval-source-map', // http://webpack.github.io/docs/build-performance.html
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },
    resolve: {
        root: path.resolve('./')
    },
    devServer: {
        inline: true,
        port: 3003,
        contentBase: './build'
    }
};
