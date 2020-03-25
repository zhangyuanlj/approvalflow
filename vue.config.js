const path = require('path');
const appTitle = "流程审批系统";
const pagesDir = "src/pages";
const resolve = function (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/approvalflow/' : '/',
    productionSourceMap: false,
    devServer: {
        //Config proxy
        proxy: {
            '/api': {
                target: 'http://xwbg.sslxzc.cn',
                changeOrigin: true
            },
            '/localApi': {
                target: 'http://127.0.0.1:3000',
                pathRewrite: {
                    '^/localApi': ''
                },
                changeOrigin: true
            }
        }
    },
    //多页面配置
    pages: {
        index: {
            entry: `${pagesDir}/index/main.js`,
            template: `public/index.html`,
            filename: 'index.html',
            title: appTitle,
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        web: {
            entry: `${pagesDir}/web/main.js`,
            template: `public/index.html`,
            filename: 'web.html',
            title: appTitle,
            chunks: ['chunk-vendors', 'chunk-common', 'web']
        },
        app: {
            entry: `${pagesDir}/app/main.js`,
            template: `public/index.html`,
            filename: 'app.html',
            title: appTitle,
            chunks: ['chunk-vendors', 'chunk-common', 'app']
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('libs', resolve('src/libs'))
            .set('store', resolve('src/store'))
            .set('mixins', resolve('src/mixins'))
            .set('utils', resolve('src/utils'))
            .set('formDesign', resolve('src/components/FormDesign'))
            .set('FormRender', resolve('src/components/FormRender'));
    }
};