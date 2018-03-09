<template>
    <div>
        <mHeader></mHeader>
        <div class="index">
            <div class="main-wrapper">
                <div class="time-wrapper">
                    <el-carousel trigger="click" height="75px" :autoplay="autoPlay">
                        <el-carousel-item v-for="(pic, idx) in pic_list" :key="idx">
                            <img :src="pic" class="pic" />
                            <div class="date"> {{ today.year }}.{{ today.month }}.{{ today.day }}</div>
                            <div class="time">（11:30-12:30）</div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="order-wrapper">
                    <div class="date-wrapper">
                        <img class="image" :src="img_breakfast" />
                        <div class="detail">
                            <div class="type">{{ periods[periodIndex-1].txt }}</div>
                            <div class="date"> {{ today.year }}.{{ today.month }}.{{ today.day }}</div>
                            <div class="time">({{ periods[periodIndex-1].time }})</div>

                            <el-dropdown size="mini" trigger="click" split-button type="primary">
                                {{ days[dayIndex-1] }}
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(val, idx) in days" :key="idx">
                                        <span @click="selectDay(idx+1)">{{ val }}</span>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <div class="period-lf">早</div>
                            <div class="period-rt">午</div>
                        </div>
                    </div>
                    <div class="food-wrapper">
                        <el-tabs tab-position="left" style="height: 360px;">
                            <el-tab-pane label="点心">
                                <FoodCard size="normal" :foodInfo="item" v-for="(item, idx) in foods" :key="idx"></FoodCard>
                            </el-tab-pane>

                            <el-tab-pane label="粉面">

                            </el-tab-pane>
                            <el-tab-pane label="粥">

                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import mHeader from '@/components/Public/mHeader'
import FoodCard from '@/components/foodCard'
import { splitDate } from '@/publicAPI/util'

export default {
    name: 'Index',
    components: {
        mHeader,
        FoodCard
    },
    data () {
        return {
            pic_list: [
                require('./../../static/breakfast.png'),
                require('./../../static/lunch.png'),
                require('./../../static/dinner.png')
            ],
            img_breakfast: require('./../../static/new_breakfast.png'),
            img_lunch: require('./../../static/new_lunch.png'),
            img_dinner: require('./../../static/new_dinner.png'),
            img_food: require('./../../static/food/ws.jpg'),
            autoPlay: false,
            foods: [],
            days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            dayIndex: 1,
            periods: [{
                txt: '早餐',
                time: '7:00-8:00'
            }, {
                txt: '午餐',
                time: '11:00-13:00'
            }, {
                txt: '晚餐',
                time: '18:00-20:00'
            }],
            periodIndex: 1,
            today: {
                year: '',
                month: '',
                day: ''
            },
            weekCalendar: []
        }
    },

    methods: {
        selectDay (dayIdx) {
            this.dayIndex = dayIdx
            this.weekCalendar.forEach((elem, idx) => {
                if (elem.day === dayIdx) {
                    splitDate(this.today, elem.date)
                }
            })
        },

        onIndexChange (index) {
            this.idx = index
        },

        getWeekCalendar () {
            this.$axios.get(`${prefix}/plan/getWeekCalendar`)
            .then((res) => {
                if (res.data.success) {
                    // 获取今天星期几
                    this.dayIndex = res.data.relatedObject.today.day
                    // 获取目前时段
                    let hour = res.data.relatedObject.time.split(":")[0]
                    if (hour <=8) {
                        this.periodIndex = 1
                    } else if (hour >13) {
                        this.periodIndex = 3
                    } else {
                        this.periodIndex = 2
                    }
                    // 获取今天日期
                    splitDate(this.today, res.data.relatedObject.today.date)
                    // 获取周日历
                    this.weekCalendar = [...res.data.relatedObject.weekCalendar]
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },

    mounted () {
        this.getWeekCalendar()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.index {
    height: 100%;
    padding: 0 0;

    .main-wrapper {
        padding: px2rem(10px);

        .time-wrapper {
            position: relative;
            height: px2rem(80px);
            z-index: 5;
            background: $blue;
            border-radius: 4px;

            .pic {
                width: px2rem(135px);
                height: 100%;
                margin-left: px2rem(55px);
                background-size: contain;
            }

            .date, .time {
                display: inline-block;
                position: absolute;
                width: px2rem(135px);
            }
            
            .date {
                height: 100%;
                line-height: px2rem(74px);
                font-size: px2rem(24px);
                color: $white;
            }

            .time {
                left: px2rem(135px);
                bottom: px2rem(2px);
                height: 20px;
                font-size: px2rem(14px);
                color: $gray;
            }
        }

        .order-wrapper {
            position: relative;
            height: px2rem(455px);
            margin-top: px2rem(5px);
            padding: px2rem(5px) px2rem(10px) px2rem(5px);
            z-index: 5;
            border: 1px solid $gray;

            .date-wrapper {
                height: px2rem(67px);
                border-bottom: px2rem(1px) solid $gray2;

                .image {
                    display: inline-block;
                    position: absolute;
                    top: px2rem(5px);
                    left: px2rem(16px);;
                    width: px2rem(63px);
                    height: px2rem(58px);
                }

                .detail {
                    vertical-align: top;
                    height: 100%;
                    text-align: center;
                    line-height: px2rem(34px);

                    .type, .date {
                        display: inline-block;
                        color: $black2;
                        font-size: px2rem(28px);
                    }

                    .date {
                        margin-left: px2rem(10px);
                    }

                    .time {
                        height: px2rem(20px);
                        line-height: px2rem(20px);
                        color: $black2;
                        font-size: px2rem(14px);
                    }

                    .period-lf, .period-rt {
                        display: inline-block;
                        position: absolute;
                        top: px2rem(36px);
                        right: px2rem(5px);
                        width: px2rem(37px);
                        height: px2rem(28px);
                        background: $blue;
                        color: $white;
                        font-size: px2rem(12px);
                        line-height: px2rem(28px);
                    }

                    .period-rt {
                        border-bottom-right-radius: px2rem(4px);
                        border-top-right-radius: px2rem(4px);
                    }

                    .period-lf {
                        right: px2rem(43px);
                        border-bottom-left-radius: px2rem(4px);
                        border-top-left-radius: px2rem(4px);
                    }
                }
            }
            
            .food-wrapper {
                margin-top: px2rem(5px);

                .el-tabs__content {
                    overflow: scroll !important;
                }

                .food {
                    height: px2rem(76px);
                    padding: px2rem(5px) 0;
                    border-bottom: px2rem(1px) solid $gray2;

                    &:last-child {
                        border-bottom: 0 solid $gray2;
                    }

                    .img, .desc {
                        display: inline-block;
                    }

                    .img {
                        width: px2rem(92px);
                        height: 100%;
                        background: green;
                    }

                    .desc {
                        width: px2rem(160px);
                        height: 100%;
                        margin-left: px2rem(4px);
                        vertical-align: top;

                        .name {
                            max-width: px2rem(140px);
                            color: $black2;
                            font-size: px2rem(16px);
                        }

                        .material, .hot {
                            max-width: px2rem(140px);
                            margin-top: px2rem(3px);
                            color: $gray2;
                            font-size: px2rem(12px);
                        }
                    }
                }
            }
        }
    }
}

</style>
