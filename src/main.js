import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import eruda from 'eruda'
import store from './vuex'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './style/reset.css'
import './style/eleUI.css'
import { getUserInfo, getCommonInfo, getRecentWeek } from '@/publicAPI/util'

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.$eruda = eruda

Vue.use(ElementUI)
let vm = new Vue({
    el: '#root',
    router,
    store,
    template: '<App/>',
    mounted () {
        getUserInfo(this),
        getCommonInfo(this),
        getRecentWeek(this)
    },
    components: { App }
})
Vue.use(vm)
