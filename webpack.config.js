const path = require('path') //用来解析路径相关信息的模块
const HtmlWebpackPlugin = require('html-webpack-plugin')

        module.exports = { //配置对象
          // 模式: 生产环境
          mode: 'production',
          // 入口
          entry: { //值可以是字符串也可以是对象
            app: path.resolve(__dirname, 'src/index.js')//__dirname代表当前文件所在目录的绝对路径
          },
          // 出口(打包生成js)
          output: {
            filename: 'static/js/[name].bundle.js',//可以带路径
            path: path.resolve(__dirname, 'dist')
          },
          // 模块加载器
          module: {
            rules: [
                //ES6==>ES5
              {
                test: /\.js$/,//用于匹配文件（对那些文件进行处理）
                //exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),//只针对那些处理
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],//预设包：包含多个常用包的一个大包
                  }
                }
              },

                //处理css
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
              },

              //处理图片

              {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 1000,
                  name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
                }
              }
            ]
          },
          // 插件
          plugins: [
            new HtmlWebpackPlugin({
              template: 'index.html',//将哪个页面作为模板页面处理（在根目录找）
              filename: 'index.html'//生成页面（在output指定的path下）
            })
          ],

          // 配置开发服务器
          devServer:{
            open:true,//自动打开浏览器
            quiet:true,//不做太多日志输出
          },
          //配置开启source-map调试
          devtool: 'cheap-module-eval-source-map',
        }