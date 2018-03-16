<template>
    <div class="book">
        <mHeader></mHeader>
        <div class="main-wrapper">
            <div class="datePicker">
                <div class="whichDay">
                    <span class="txt" v-for="(item, idx) in whichDay" :key="idx">{{ item }}</span>
                </div>
                <div class="day">
                    <span class="dayTxt"
                        :class="{ pass: item.pass }"
                        ref="dayNode"
                        v-for="(item, idx) in thisWeekDayList" 
                        :key="idx"
                        @click="selectDay(idx)"
                        >
                        {{ item.day }}
                    </span>
                </div>
            </div>
            <div class="bookPicker">
                <div v-for="(item, idx) in timeTxt" 
                    :key="idx" 
                    class="order-wrapper"
                    :class="{ already: !canBook[idx]}" 
                    @click="goTo($event, idx)">
                    <img class="imgPeriod" :src="img_period[idx]" />
                    <div class="time">{{ item }}</div>
                    <div v-if="canBook[idx]" class="btn">可点餐</div>
                    <div v-else class="btn">已点餐</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import { splitDate } from '@/publicAPI/util'
import mHeader from '@/components/Public/mHeader'

export default {
    name: 'Book',
    components: {
        mHeader
    },
    data () {
        return {
            firstEnter: true,
            img_period: [
                require('./../../static/new_breakfast.png'),
                require('./../../static/new_lunch.png'),
                require('./../../static/new_dinner.png')
            ],
            timeTxt: ['07：00 早餐', '11：00 午餐', '18：00 晚餐'],
            whichDay: ['日', '一', '二', '三', '四', '五', '六'],
            dayIndex: 0,
            periodIndex: 0,
            hour: '',
            today: {
                year: '',
                month: '',
                day: ''
            },
            weekCalendar: [],
            thisWeekDayList: [],
            canBook: [],
            dateCode: ''
        }
    },
    computed: {
        userInfo () {
            return this.$store.getters.getUserInfo
        }
    },

    methods: {
        selectDay (idx) {
            if(this.$refs.dayNode[idx].className.includes('pass')) return
            this.cleanFlag()
            this.$refs.dayNode[idx].classList.add('selected')
            this.dayIndex = idx
            this.getMyOrderConditionToday(idx)
        },

        goTo (ev, idx) {
            if(ev.currentTarget.className.includes('already')) return
            this.$router.push(`/bookDetail/${this.dateCode}/${this.dayIndex}/${idx+1}/${this.userInfo.uid}`)
        },

        getWeekCalendar () {
            this.$axios.get(`${prefix}/plan/getWeekCalendar`)
            .then((res) => {
                if (res.data.success) {
                    // 获取今天星期几
                    this.dayIndex = res.data.relatedObject.today.day
                    // 获取目前时段
                    let hour = res.data.relatedObject.time.split(':')[0]
                    if (hour <= 8) {
                        this.periodIndex = 1
                    } else if (hour > 13) {
                        this.periodIndex = 3
                    } else {
                        this.periodIndex = 2
                    }
                    // 获取今天日期
                    splitDate(this.today, res.data.relatedObject.today.date)

                    // 获取周日历
                    this.weekCalendar = [...res.data.relatedObject.weekCalendar]
                    this.weekCalendar.forEach((day, idx) => {
                        let obj = {
                            day: day.date.split('-')[2]
                        }
                        if (idx < this.dayIndex) {
                            obj.pass = true
                        } else {
                            obj.pass = false
                        }
                        this.thisWeekDayList.push(obj)
                    })
                    // this.getMyOrderConditionToday(this.dayIndex)
                    // 默认进入book页面，点击今日
                    this.$nextTick(() => {
                        document.getElementsByClassName('dayTxt')[this.dayIndex].click()
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },

        getMyOrderConditionToday (idx) {
            var querystring = require('querystring')
            this.dateCode = this.weekCalendar[idx].date.split('-').join('')
            
            this.$axios.get(`${prefix}/order/getOrdersByDateAndUid?dateCode=${this.dateCode}`)
            .then((res) => {
                if (res.data.success) {
                    this.canBook = [...res.data.relatedObject]
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },

        cleanFlag () {
            let dayTxtList = document.getElementsByClassName('dayTxt')
            let len = dayTxtList.length
            for (let i=0; i < len; i++) {
                dayTxtList[i].classList.remove('selected')
            }
        }
    },

    mounted () {
        this.getWeekCalendar()
    },

    activated() {
        if (!this.firstEnter) {
            this.getMyOrderConditionToday(this.dayIndex)
        }
        this.firstEnter = false
    },

    watch: {
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.book {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 0;

    .main-wrapper {
        display: inline-block;
        position: relative;
        padding: px2rem(10px);
        padding-top: px2rem(50px);
        width: 100%;
        height: 100%;

        .datePicker {
            display: inline-block;
            position: relative;
            width: 100%;
            height: px2rem(70px);
            border-radius: px2rem(4px);
            background: $gray;
            color: $white1;

            .whichDay {
                .txt {
                    display: inline-block;
                    width: px2rem(30px);
                    height: px2rem(30px);
                    margin: 0 px2rem(10px);
                    font-size: px2rem(14px);
                    text-align: center;
                    line-height: px2rem(30px);
                }
            }

            .day {
                .dayTxt {
                    display: inline-block;
                    width: px2rem(30px);
                    height: px2rem(30px);
                    margin: 0 px2rem(10px);
                    font-size: px2rem(14px);
                    text-align: center;
                    line-height: px2rem(30px);

                    &.selected {
                        border-radius: px2rem(30px);
                        background: $blue;
                        color: $white;
                        transition: color .5s, background .5s, width .5s, border-radius .5s;
                    }

                    &.pass {
                        color: $gray5;
                        opacity: .2;
                    }
                }
            }
        }

        .bookPicker {
            padding-top: px2rem(10px);

            .order-wrapper {
                position: relative;
                width: 100%;
                height: px2rem(60px);
                margin-top: px2rem(10px);
                border: px2rem(2px) solid $blue;
                border-radius: px2rem(4px);
                background: rgba(66, 151, 236 , .8);
                transition: color .5s, background .5s;
                
                &:hover, &:focus {
                    background: $blue2;
                    transition: color .5s, background .5s;
                }

                &.already {
                    background: $gray6;
                    border: px2rem(2px) solid $gray6;
                    transition: background .5s;

                    .btn {
                        background: gray;
                        color: blanchedalmond;
                    }
                }

                &:first-child {
                    margin-top: 0;
                }
            }

            .imgPeriod {
                width: px2rem(40px);
                height: px2rem(40px);
                margin: px2rem(6px) 0 0 px2rem(10px);
                vertical-align: text-top;
            }

            .time {
                display: inline-block;
                position: absolute;
                height: px2rem(60px);
                margin-left: px2rem(8px);
                line-height: px2rem(60px);
                color: $white;
                font-size: px2rem(23px);
                font-family: "黑体";
            }

            .btn {
                display: inline-block;
                position: absolute;
                top: px2rem(16px);
                right: px2rem(10px);
                width: px2rem(50px);
                height: px2rem(25px);
                border-radius: px2rem(4px);
                line-height: px2rem(25px);
                background: $green;
                color: $white;
                font-size: px2rem(14px);
                text-align: center;
            }
        }
    }
}

</style>
