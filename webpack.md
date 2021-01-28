#React

##install
```angular2html
npm install -g create-react-app

create-react-app myapp

cd myapp

npm run eject //將配置文件暴露出來

npm run start
```

##package.json & scripts

using npm short cuts
```
npm run eject  //自定义模式，暴露出webpack配置，不可逆
```

delete node_modules

```angular2html
npm install --- this will install using package.json
```

in China, when encountered slow connection, use cnpm

##serviceWorker

for caching and better performance for second visit

```
npm run build
```

for production -- to test serviceWorker, use:

```
npm -g serve
```

```
serve -s build
```

noopener --- block risk when target="_blank" 

config -> webpack.config.js -> devtool

browser->source only have webpack --- 

```JavaScript
isEnvDevelopment && 'eval-source-map'
```

good for modification and testing

##webpacks
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。
used to pack modules for browser use

webpackjs.com

es6 -> es5
simplified
code division
module combine
auto renew
dm5
auto publish

#### webpack install

```
npm init
```

```
npm install --save-dev webpack webpack-cli
```

```
npx webpack
```

scrips: build: webpack --config webpack.config.js

```
npm run build
```

mode: "development" "production" -->zip

## webpack-dev-server

```
npm install --save-dev webpack-dev-server
```

```angular2html
npx webpack-dev-server
```

```JavaScript
"scripts":{
"dev":"webpack-dev-server"
}
```
```javascript
npm run dev
```
```javascript
devServer: {//开启服务器配置
    port:8080,//端口，
    host:”localhost”,//ip地址:localhost本地，0.0.0.0可以访问网络地址
    progress:true,//开启进度条
    contentBase:"./build",//默认打开目录
    //open:true, //自动打开浏览器,
    compress:true//启动gzp压缩
}
```


配置代理解决跨域问题

MPA 多頁面配置

webpack [name].js 自動識別entry

webpack config -> output -> public path = "/demo/" 更改根目及防止報錯


## CSS

```javascript
npm install --save-dev css-loader style-loader mini-css-extract-plugin
```
css loader --> can use @import

style loader --> insert css into <head>

postcss處理，如生成CSS自動加載webkit, called auto prefixer


## CSS zipping
```javascript
npm install --save optimize-css-assets-webpack-plugin
```

//css压缩 -- webpack.config
//npm run build
``` Javascript
let OptimizeCss=require('optimize-css-assets-webpack-plugin');
module.exports={
    optimization: {//优化项启动后mode模式代码压缩不再生效，必须配置js压缩插件
        minimizer: [
            new OptimizeCss()//优化css
        ]
    }
}
```

## JS zip
```javascript
npm install --save uglifyjs-webpack-plugin
//js压缩
let UglifyjsPlugin=require('uglifyjs-webpack-plugin');
module.exports={
      optimization: {//优化项
            minimizer: [
	    //压缩js    
	    new UglifyjsPlugin({
                cache:true, //是否用缓存
                parallel:true, //是否并发打包
                sourceMap:true //es6映射es5需要用
            }), 
     ]
      }
}

```

##图片等资源文件处理
1、安装url-loader
```
npm install --save-dev url-loader
```

2、配置
```javascript
module:{
    rules: [
        {
            test:/\.(png|jpg|gif|jpeg)$/,
            use:{
                loader:"url-loader", //file-loader加载图片，url-loader图片小于多少k用base64显示
                options: {
                    limit:100*1024, //小于100k用base64
//build之后的目录分类
                    outputPath:'static/images'                    },
            }
        },
    ]
}
```

在index.js里面使用：
```JavaScript
var image=new Image();  //要用var不要用let定义，因为uglifyjs(js压缩)不支持es6
image.src=require("./assets/images/1.jpg");
document.body.appendChild(image);
```

## 安装babel-loader
```javascript
npm install --save babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime @babel/runtime

@babel/core：babel核心文件
@babel/preset-env：es6转es5
@babel/plugin-proposal-class-properties ：支持es6,class Goods类语法
@babel/runtime：编译模块的工具函数
@babel/plugin-transform-runtime：es6转es5时babel 会需要一些辅助函数，例如 _extend。这样文件多的时候，项目就会很大。所以 babel 提供了 transform-runtime 来将这些辅助函数“搬”到一个单独的模块 babel-runtime 中，这样做能减小项目文件的大小。

```
<br>
es5轉es6

```javascript
rules:[
	{
                test:/\.js$/,//支持require('*.js')文件
                use:{
                    loader:'babel-loader',
                    options:{//用babel-loader 需要把es6-es5
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include:path.resolve(__dirname,'src'),//需要转换的文件夹
                exclude:/node_modules/ //排除转换的文件夹
            },
]

```

