import axios from 'axios'
import { prefix } from '@/publicAPI/config'

// function getUserInfo (myVue) {
//     axios.get(`${prefix}/staff/getUserInfo`)
//             .then((res) => {
//                 console.log(myVue)
//                 if (res.data.success) {
//                     myVue.$store.commit('setUserInfo', res.data.relatedObject)
//                     myVue.$store.commit('setIflogin', true)
//                     alert('zzzzzzzzzzzzzzzz')
//                 } else {
//                     console.log('获取用户信息失败，可能session已过期，请重新登录。')
//                     myVue.$store.commit('setIflogin', false)
//                 }
//             })
//             .catch((err) => {
//                 alert(err)
//             })
// }

function splitDate (obj, dateStr) {
    obj.year = dateStr.split('-')[0].slice(2, 4)
    obj.month = dateStr.split('-')[1]
    obj.day = dateStr.split('-')[2]
    return obj
}

export {
    // getUserInfo,
    getRecentWeek,
    splitDate
}
