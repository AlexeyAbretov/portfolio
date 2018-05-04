const path = require("path");
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

var plugins = [
    new webpack.NoErrorsPlugin()
];

if (isProduction) {
    plugins = plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ]);
}

let config = {
    devtool: isProduction ? "" : "source-map",
    entry: [
        "./src/app.tsx"
    ],
    output: {
        path: path.resolve(__dirname, "output"),
        filename: "bundle.js",
        library: "savePackagesPopup"
    },
    externals: {
        jquery: "$",
        Enumerable: "Enumerable",
    },
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = config;
