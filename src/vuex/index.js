import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ifLogin: false,
        userInfo: {},
        foodInfo: {}
    },

    getters: {
        getIflogin: state => {
            return state.ifLogin
        },
        getUserInfo: state => {
            return state.userInfo
        },
        getFoodInfo: state => {
            return state.foodInfo
        }
    },

    mutations: {
        setIflogin (state, iflogin) {
            state.ifLogin = iflogin
        },
        setUserInfo (state, obj) {
            state.userInfo = obj
        },
        setFoodInfo (state, obj) {
            state.foodInfo = obj
        }
    }
})
