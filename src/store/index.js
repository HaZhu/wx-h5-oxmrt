import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import mutations from './mutations'
import actions from './action'
import getters from './getters'
const state = {
    isloading: false
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})