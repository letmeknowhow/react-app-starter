let webpack = require('webpack');
let path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let Env = require('./env');
let Module = require('./module');
let Plugins = require('./plugins');
let Resolve = require('./resolve');
let DevServer = require('./devServer');
let vendors = require('./vendors');
let publicPath = require('./publicPath');
let env = Env.env;
let resolve = Env.resolve;
let smartEnv = Env.smartEnv;

let fileName = '[name].js';

const devTool = env('source-map', '');

let Entry = {
    app: resolve('./src/index.js'),
    vendor: vendors
};

// if(!Env.isFeEnv){
// 	Entry.vendor = vendors;
// }


let config = {
    mode: Env.isFeEnv ? 'development' : 'production',
    entry: Entry,
    optimization: {
        splitChunks: {
            chunks: "all",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
            minSize: 30000,            
            minChunks: 1,              
            maxAsyncRequests: 5,       
            maxInitialRequests: 1,    
            name: true,              
            cacheGroups: {   
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                nds: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                styles: {
                    test   : /(\.less|\.css)$/,
                    priority: -10
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                cache: true,
                parallel: true, // 开启并行压缩，充分利用cpu
                sourceMap: false,
                extractComments: false, // 移除注释
                uglifyOptions: {
                  compress: {
                    unused: true,
                    warnings: false,
                    drop_debugger: true
                  },
                  output: {
                    comments: false
                  }
                }
              }),
              // 用于优化css文件
              new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                  safe: true,
                  autoprefixer: { disable: true },   //防止移除前缀
                  mergeLonghand: false,
                  discardComments: {
                    removeAll: true // 移除注释
                  }
                },
                canPrint: true
              })
            ]
    },
    output: {
        path: resolve('dist'),
        filename: fileName,
        publicPath: publicPath + '/',
        chunkFilename: fileName,
        crossOriginLoading: 'anonymous'
    },
    resolve: smartEnv(Resolve),
    module: smartEnv(Module),
    plugins: smartEnv(Plugins),
    devServer: smartEnv(DevServer),
    devtool: devTool,
}


module.exports = config;