# zhihudaily

项目说明
===

项目数据来自知乎API接口的真实数据，通过在网上找到的几个还能使用的API接口来进行操作的，如有侵权联系删除。整个项目是依靠vue-cli3脚手架完成的。整体结构相对简单明了。


页面展示
===
## 最新消息

![image](https://github.com/liuzb13/zhihudaily/blob/master/lastednews.PNG)
## 项目总览

![image](https://github.com/liuzb13/zhihudaily/blob/master/totalitem.PNG)


组件
===

整体结构分为左中右三部分区域，左边为主菜单，有最新消息、去年今日、热门消息、项目总览四项。都是根据请求回来的数据实时更新的。
中部、右侧两个部分分别为文章列表栏和文章内容区域，由于会频繁调用，因此使用组件来循环调用。
中部为item.vue用来展示文章列表的title和image，右侧为daily-article.vue用以展示具体的文章内容。
由于API接口请求回来的数据格式有部分的差异，为了能够使组件能够通用，在app.vue组件中先对数据进行处理，不同api接口请求回来的数据名称有所差异，因此在主文件中，提前将请求回来的数据的名称进行统一处理，使所有名称统一化，方便后面item.vue和daily-article.vue的使用。


跨域问题
===

由于知乎对api跨域请求进行了限制，所以需要对api的清楚进行处理。在跟目录下新建vue.config.js文件，由于vue-cli3隐藏了许多配置，因此这个配置文件需要使用者根据实际需要来建立，建立后，系统会自动把vue.config.js文件引入。配置如下：
```
module.exports = {
       outputDir: 'dist',   
        assetsDir: 'assets', 
       lintOnSave: false, 
        devServer: {
           open: false, 
            host: "localhost", 
            port: '8080',
            https: false,
            hotOnly: false, 
           proxy: {
               '/api': {
                   target: 'https://news-at.zhihu.com/api', 
                   changeOrigin: true,
                   pathRewrite: {
                       '^/api': ''
                    }
                }
            },
       }
    }
 ```

图片防盗链
===

知乎对于图片也有一些相应的限制，有些图片能直接请求回来，但是也会有一些图片请求时会出现403（forbidden）的情况，因此需要在主文件首部增添以下代码：<br/>
```<meta name="referrer" content="no-referrer"/>```

