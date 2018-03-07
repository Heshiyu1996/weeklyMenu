import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        foodInfo: {}
    },

    getters: {
        getUserInfo: state => {
            return state.userInfo
        },
        getFoodInfo: state => {
            return state.foodInfo
        }
    },

    mutations: {
        setUserInfo (state, obj) {
            state.userInfo = obj
        },
        setFoodInfo (state, obj) {
            state.foodInfo = obj
        }
    }
})
