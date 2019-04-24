//path 是node.js路徑的一個基本包
const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack")


const isDev = process.env.NODE_ENV === 'development'

//將我們輸入的js文件，將js文件中依賴相關的文件，整合成bundle.js
const config = {
    target :'web',
    //入口
    entry:path.join(__dirname,'src/index.js'),
    output :{
        filename : 'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module : {
        //增加規則，讓vue-loader處理vue類型文件
        rules : [
            {
                test : /\.vue$/,
                loader : 'vue-loader'
            },

            {
                test : /\.css$/,
                use : ['style-loader','css-loader']
            },
            {
                test : /\.styl/,
                use : [
                    'style-loader',
                    'css-loader',
                    {
                        //使用前面stylus-loader的Source-Map效率會更快
                        loader:'postcss-loader',
                        options:{
                            sourceMap : true,
                        }
                    },
                    'stylus-loader'
                ]

            },
            {
                //import 非jsp的內容
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use : [
                    {
                        //可以將圖片轉譯成Base64代碼，對於幾kb的小圖片是很有用的。
                        loader:'url-loader',
                        options:{
                            //小於1024k的圖片就執行轉譯
                            limit:1024,
                            //命名
                            name:'[name]-aaa.[ext]'
                        }

                    }
                ]
            }/**/
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin(),
        //根據不同版本打包
        new webpack.DefinePlugin({
            //根據process.env去打包
            'process.env' : {
                NODE_ENV : isDev ? '"development"' : '"production"'
            }
        })
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    }
}

if(isDev){
    //編譯成對應原始代碼
    config.devtool = "cheap-module-eval-source-map"
    config.devServer = {
        port: 8000,
        //可以透過localhost ，127.0.0.1 或者內網IP訪問。
        host: '0.0.0.0',
        overlay:{
            errors : true
        },
        //改了一個組件的代碼，只重新渲染這個頁面組件的代碼
        hot:true
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.plugins.push(new webpack.NoEmitOnErrorsPlugin())  
}

module.exports = config