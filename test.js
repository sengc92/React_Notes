let OptimizeCss=require('optimize-css-assets-webpack-plugin');
module.exports={
    optimization: {//优化项启动后mode模式代码压缩不再生效，必须配置js压缩插件
        minimizer: [
            new OptimizeCss()//优化css
        ]
    }
}

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