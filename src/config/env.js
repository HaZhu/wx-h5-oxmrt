/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
import { urlGet } from './methods'
let baseUrl;
let routerMode;
let commonArg = {}; //默认参数
if (process.env.NODE_ENV == 'development') {
    baseUrl = 'https://www.hz-jingjing.cn/';
    routerMode = 'hash'
} else {
    baseUrl = 'https://www.hz-jingjing.cn/'; //线上url
    routerMode = 'hash'
}

export {
    baseUrl,
    routerMode,
    commonArg
}