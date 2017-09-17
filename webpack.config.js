const path = require('path');
const fs = require('fs');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const srcFolder = path.join(__dirname, 'src', 'entries');
const files = fs.readdirSync(srcFolder);
const entries = {};


files.forEach( entry => {
    const name = entry.split('.')[0];
    const file = `./src/entries/${name}`;
    entries[name] = file;
}
);

var __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: entries,
    output: {
        filename: __DEV__ ? '[name].js' : '[name]-[hash].min.js',
        chunkFilename: __DEV__ ? '[name].js' : '[name]-[chunkhash].min.js',
        path: path.resolve(__dirname, 'dist'),

    },
    devtool: __DEV__ ? 'cheap-source-map' : false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(__DEV__ ? 'development' : 'production')
            }
        }),
    ],
    devServer: {
        contentBase: './dist',
    },
    module : {
        loaders:[
            {
                test: /\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.json$/,
                loaders: [
                    'json-loader'
                ]
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader?limit=8192'
            },
            {
                test:/\.svg$/,
                loader:'svg-loader'
            },
            {
                test:/(\.jsx|\.js)$/,
                loader:'babel-loader',
                exclude: [
                    path.resolve(__dirname, "node_modules/")
                ],
                query: {
                    presets:['react', 'es2015', 'stage-0'],
                }
            }

        ],
    }
};

if (!__DEV__) {
    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new uglifyJSPlugin()
    );
}
