/* global __dirname */

const config = {
    entry: './index.js',

    output: {
        path: `${__dirname}/lib`,
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-react' ],
                        plugins: [ '@babel/plugin-proposal-class-properties' ]
                    }
                }
            }
        ]
    },

    mode: 'development',
    devtool: 'source-map'
};

module.exports = config;
