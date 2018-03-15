import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import eruda from 'eruda'
import store from './vuex'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './style/reset.css'
import './style/eleUI.css'
import { getUserInfo } from '@/publicAPI/util'

var gb2260 = require('gb2260')
gb2260.register('201410', require('gb2260/lib/201410'))

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.$gb2260 = gb2260
// Vue.prototype.$eruda = eruda
Vue.use(ElementUI)
let vm = new Vue({
    el: '#root',
    router,
    store,
    template: '<App/>',
    mounted () {
        getUserInfo(this)
    },
    components: { App }
})
Vue.use(vm)
