import axios from 'axios'
import { prefix } from '@/publicAPI/config'

function getUserInfo (myVue) {
    axios.get(`${prefix}/staff/getUserInfo`)
            .then((res) => {
                if (res.data.success) {
                    myVue.$store.commit('setUserInfo', res.data.relatedObject)
                    console.log(myVue.$store.getters.getUserInfo)
                } else {
                    console.log('获取用户信息失败，可能session已过期，请重新登录。')
                }
            })
            .catch((err) => {
                alert(err)
            })
}

export {
    getUserInfo
}
