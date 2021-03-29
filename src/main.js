// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import YDUI from 'vue-ydui';
import VueQriously from 'vue-qriously';
import './assets/plugins/rem';
import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.base.css';
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import qs from 'qs'
import {
    setStore,
    getStore,
    removeStore,
    urlGet
} from './config/methods'
Vue.use(VueQriously)
Vue.use(YDUI);
const APPID = 'wx428e28ae2836748c';
let unionid;
// removeStore('unionid');
// setStore('unionid','a0b923820dcc509a')
router.beforeEach((to, from, next) => {
    unionid = getStore('unionid');
    if (unionid) {
        next()
    } else {
        if (!urlGet('code') || !urlGet('state')) { // 没有code 去授权获取code
            let URI = '';
            setStore('firsturl',window.location.href)
            if (window.location.href.indexOf('FriendsCertification?') > 0) {
                URI = encodeURIComponent(window.location.href)
            } else {
                URI = encodeURIComponent(window.location.href.split('?')[0])
            }
            var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + URI + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
            window.location.href = url;
        } else {
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            axios.post('https://www.hz-jingjing.cn/gzh/login', qs.stringify({code: urlGet('code')}))
              .then(function (response) {
                if(response.data.code == "SUCCESS"){
                    setStore('unionid',response.data.data.sessionID)
                    next();
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }
})
router.afterEach(route => {
    /* 隐藏加载中动画 */
});
Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})