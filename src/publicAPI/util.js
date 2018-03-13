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

function getRecentWeek (myVue) {
    let dateAndDay = []
    var now = new Date()
    var nowTime = now.getTime()
    var day = now.getDay() || 7
    var oneDayLong = 24 * 60 * 60 * 1000

    for (let i = 1; i < 8; i++) {
        dateAndDay.push(new Date(nowTime - (day - i) * oneDayLong).toLocaleString())
    }
    // var MondayTime = nowTime - (day-1)*oneDayLong
    // var SundayTime =  nowTime + (7-day)*oneDayLong

    // var monday = new Date(MondayTime).toLocaleString()
    // var sunday = new Date(SundayTime).toLocaleString()
    // console.log(monday)
    // console.log(dateAndDay)
}

function splitDate (obj, dateStr) {
    obj.year = dateStr.split('-')[0].slice(2, 4)
    obj.month = dateStr.split('-')[1]
    obj.day = dateStr.split('-')[2]
    return obj
}

export {
    getUserInfo,
    getRecentWeek,
    splitDate
}
