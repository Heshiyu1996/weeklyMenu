<template>
    <div class="book">
        <mHeader></mHeader>
        <div class="main-wrapper">
            <div class="datePicker">
                <div class="whichDay">
                    <span class="txt" v-for="(item, idx) in whichDay" :key="idx">{{ item }}</span>
                </div>
                <div class="day">
                    <span class="txt selected" v-for="(item, idx) in weekCalendar" :key="idx">{{ item }}</span>
                </div>
            </div>
            <div class="bookPicker">
                <el-tag>
                    <div @click="goTo('book')">
                        <img class="imgPeriod" :src="img_period[0]" />
                        <div class="time">&nbsp;&nbsp;7：00 早餐</div>
                        <div class="btn">可点餐</div>
                    </div>
                </el-tag>
                <el-tag>
                    <div @click="goTo('book')">
                        <img class="imgPeriod" :src="img_period[1]" />
                        <div class="time">11：00 午餐</div>
                        <div class="btn">可点餐</div>
                    </div>
                </el-tag>
                <el-tag type="info">
                    <div @click="goTo('book')">
                        <img class="imgPeriod" :src="img_period[2]" />
                        <div class="time">18：00 晚餐</div>
                        <div class="btn">可点餐</div>
                    </div>
                </el-tag>
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
            img_period: [
                require('./../../static/new_breakfast.png'),
                require('./../../static/new_lunch.png'),
                require('./../../static/new_dinner.png')
            ],
            whichDay: ['日', '一', '二', '三', '四', '五', '六'],
            dayIndex: 0,
            periodIndex: 0,
            hour: '',
            today: {
                year: '',
                month: '',
                day: ''
            },
            weekCalendar: []
        }
    },

    methods: {
        goTo (destination) {
            this.$router.push(`/${destination}`)
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
                    this.getMyOrderConditionToday()

                    // 获取周日历
                    let thisWeek = [...res.data.relatedObject.weekCalendar]
                    thisWeek.forEach((day) => {
                        this.weekCalendar.push(day.date.split('-')[2])
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },

        getMyOrderConditionToday () {
            var querystring = require('querystring')
            let dateCode = '20'
            for (let i in this.today) {
                dateCode = dateCode + this.today[i]
            }
            console.log(dateCode)
            
            this.$axios.get(`${prefix}/order/getOrdersByDateAndUid?dateCode=${dateCode}`)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },

    mounted () {
        this.getWeekCalendar()
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
                .txt {
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

            .el-tag {
                position: relative;
                width: 100%;
                height: px2rem(60px);
                margin-top: px2rem(10px);
            }

            .imgPeriod {
                width: px2rem(40px);
                height: px2rem(40px);
                vertical-align: text-top;
            }

            .time {
                display: inline-block;
                position: absolute;
                height: px2rem(60px);
                margin-left: px2rem(8px);
                line-height: px2rem(60px);
                color: $gray5;
                font-size: px2rem(23px);
                font-weight: bold;
            }

            .btn {
                display: inline-block;
                position: absolute;
                top: px2rem(18px);
                right: px2rem(10px);
                width: px2rem(50px);
                height: px2rem(25px);
                border-radius: px2rem(4px);
                line-height: px2rem(25px);
                background: rgba(64, 158, 255, .3);
                color: $white;
                font-size: px2rem(14px);
                text-align: center;
            }
        }
    }
}

</style>
