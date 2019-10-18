module.exports = {
    outputDir: 'dist',   
    assetsDir: 'assets', 
    lintOnSave: false, 
    devServer: {
        open: false, 
        host: "localhost", 
        port: '8080',
        https: false,
        hotOnly: false, 
        proxy: {
            '/api': {
                target: 'https://news-at.zhihu.com/api', 
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}