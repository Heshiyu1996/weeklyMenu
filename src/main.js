import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './style/reset.css'
import './style/eleUI.css'
import { getUserInfo } from '@/publicAPI/util'
import myAxios from '@/publicAPI/server'

// 省份编号
var gb2260 = require('gb2260')
gb2260.register('201410', require('gb2260/lib/201410'))
Vue.prototype.$gb2260 = gb2260

Vue.config.productionTip = false
// Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(myAxios)
new Vue({
    el: '#root',
    router,
    store,
    template: '<App/>',
    mounted () {
        // getUserInfo(this)
    },
    components: { App }
})
