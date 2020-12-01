const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        main:"./lib/index.js",
        test:"./test/test.js",
    },
    mode:"production",
    // mode:"development",
    output: {        
        filename: '[name].min.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new CleanWebpackPlugin({
            protectWebpackAssets: true,
        }),  
    ],
    // module: {
    //     rules: [
    //         {   //.js文件或者.jsx文件处理
    //             test:/\.(js|jsx)/, 
    //             loader:"babel-loader",
    //             exclude:path.join(__dirname,"../node_modules")   //排除  node_modules中的内容
    //         },
    //     ]
    // },
    optimization: {
        minimize: true,
        minimizer: [ new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            terserOptions: {
                output: {
                    comments: false,
                },
            },
            extractComments: true,
        })],
    },    
    devServer: {        
        hot: true
    },    
};