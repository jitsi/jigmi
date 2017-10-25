/* global __dirname */

const config = {
    entry: './index.js',

    output: {
        path: `${__dirname}/lib`,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: [ 'es2015', 'react' ]
                }
            }
        ]
    }
};

module.exports = config;
