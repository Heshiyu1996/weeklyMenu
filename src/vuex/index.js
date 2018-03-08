import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        foodInfo: {},
        commonInfo: {
            nowTime: ''
        }
    },

    getters: {
        getUserInfo: state => {
            return state.userInfo
        },
        getFoodInfo: state => {
            return state.foodInfo
        },
        getCommonInfo: state => {
            return state.commonInfo
        },
    },

    mutations: {
        setUserInfo (state, obj) {
            state.userInfo = obj
        },
        setFoodInfo (state, obj) {
            state.foodInfo = obj
        },
        setCommonInfo (state, obj) {
            state.commonInfo = obj
        }
    }
})
