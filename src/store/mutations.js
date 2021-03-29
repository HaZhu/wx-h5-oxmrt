import { ISLODING} from './mutation-types'

export default {
    //这里的data就是vuex的state
    [ISLODING](state, isLoading) {
        state.isloading = isLoading;
    }
}