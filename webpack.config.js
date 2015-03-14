var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    devtool: 'eval',
    entry: ["./app/app.js"],
    output: {
        path: "public/",
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'firebase': 'firebase/lib/firebase-web'
        }
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'jsx-loader?harmony'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("css-loader?sourceMap")
        }, {
            test: /\.png$/,
            loader: "file-loader"
        }, {
            test: /\.woff$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.woff2$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.ttf$/,
            loader: "file-loader"
        }, {
            test: /\.eot$/,
            loader: "file-loader"
        }, {
            test: /\.svg$/,
            loader: "file-loader"
        }]
    },
    plugins: [
      new ExtractTextPlugin("style.css", { allChunks: true })
    ]
};