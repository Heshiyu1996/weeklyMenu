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

function getCommonInfo (myVue) {
    axios.get(`${prefix}/common/getCommonInfo`)
    .then((res) => {
        if (res.data.success) {
            let commonInfo = {}
            let dateInfo = []
            let timeInfo = []
            Object.assign(commonInfo, res.data.relatedObject)

            dateInfo = commonInfo.nowTime.split(' ')[0]
            timeInfo = commonInfo.nowTime.split(' ')[1]
            commonInfo.nowTime = {}
            commonInfo.nowTime.year = dateInfo.split('-')[0].substr(2,4)
            commonInfo.nowTime.month = dateInfo.split('-')[1]
            commonInfo.nowTime.day = dateInfo.split('-')[2]

            commonInfo.nowTime.hour = timeInfo.split(':')[0]
            commonInfo.nowTime.minute = timeInfo.split(':')[1]
            commonInfo.nowTime.second = timeInfo.split(':')[2]
            myVue.$store.commit('setCommonInfo', commonInfo)
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
    var oneDayLong = 24*60*60*1000
    
    for (let i=1; i<8; i++) {
        dateAndDay.push(new Date(nowTime - (day-i)*oneDayLong).toLocaleString())
    }
    // var MondayTime = nowTime - (day-1)*oneDayLong
    // var SundayTime =  nowTime + (7-day)*oneDayLong
    
    // var monday = new Date(MondayTime).toLocaleString()
    // var sunday = new Date(SundayTime).toLocaleString()
    // console.log(monday)
    console.log(dateAndDay)
}

function splitDate (obj, dateStr) {
    obj.year = dateStr.split('-')[0].slice(2, 4)
    obj.month = dateStr.split('-')[1]
    obj.day = dateStr.split('-')[2]
    return obj
}

export {
    getUserInfo,
    // getCommonInfo,
    getRecentWeek,
    splitDate
}
