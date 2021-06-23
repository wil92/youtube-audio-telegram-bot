const path = require('path');

module.exports = {

    // bundling mode
    mode: 'production',

    // entry files
    entry: './src/main.ts',

    target: 'node',

    // output bundles (location)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },

    // file resolutions
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            "fs": false
        }
    },

    // loaders
    module: {
        rules: [
            {
                // test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};
