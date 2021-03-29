import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'homePage',
        component: resolve => { require(['@/pages/home.vue'], resolve); }
    }]
})

export default router;