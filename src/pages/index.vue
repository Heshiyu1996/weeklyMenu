<template>
    <div>
        <mHeader></mHeader>
        <div class="index">
            <div class="main-wrapper">
                <div class="time-wrapper">
                    <img class="img-hot" :src="img_hot" />
                    <el-carousel trigger="click" height="75px" :autoplay="autoPlay" arrow="never">
                        <el-carousel-item v-for="(hotFood, idx) in hotFoods" :key="idx">
                            <img :src="img_food" class="pic" />
                            <div class="name f-ellipsis"> {{ hotFood.cname }} | {{ hotFood.name }} </div>
                            <div class="plans">
                                <div class="plan" v-for="(plan, idx) in hotFood.plans" :key="idx">
                                    {{ days[plan.day-1] }} {{ periods[plan.pid-1].txt }}
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="order-wrapper">
                    <div class="date-wrapper">
                        <img class="image" :src="img_period[periodIndex-1]" />
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
                            <div v-if="periodIndex === 1">
                                <div class="period-lf" @click="selectPeriod(2)">午</div>
                                <div class="period-rt" @click="selectPeriod(3)">晚</div>
                            </div>
                            <div v-if="periodIndex === 2">
                                <div class="period-lf" @click="selectPeriod(1)">早</div>
                                <div class="period-rt" @click="selectPeriod(3)">晚</div>
                            </div>
                            <div v-if="periodIndex === 3">
                                <div class="period-lf" @click="selectPeriod(1)">早</div>
                                <div class="period-rt" @click="selectPeriod(2)">午</div>
                            </div>
                        </div>
                    </div>
                    <div class="food-wrapper">
                        <el-tabs class="food-body" v-model="categoryIndex" tab-position="left" @tab-click="selectCategory">
                            <el-tab-pane :cid="category.cid" :name="category.cid.toString()" v-for="(category, idx) in categories" :key="idx" :label="category.cname">
                                <FoodCard size="normal" :foodInfo="item" v-for="(item, idx) in foods" :key="idx"></FoodCard>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
        <mFooter></mFooter>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import mHeader from '@/components/Public/mHeader'
import mFooter from '@/components/Public/mFooter'
import FoodCard from '@/components/foodCard'
import { splitDate } from '@/publicAPI/util'

export default {
    name: 'Index',
    components: {
        mHeader,
        mFooter,
        FoodCard
    },
    data () {
        return {
            img_hot: require('./../../static/hot.png'),
            img_period: [
                require('./../../static/new_breakfast.png'),
                require('./../../static/new_lunch.png'),
                require('./../../static/new_dinner.png')
            ],
            img_food: require('./../../static/food/ws.jpg'),
            autoPlay: false,
            hotFoods: [],
            hotFoodsPlans: [],
            foods: [],
            days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            dayIndex: 1,
            periods: [{
                txt: '早餐',
                shortTxt: '早',
                time: '7:00-8:00'
            }, {
                txt: '午餐',
                shortTxt: '午',
                time: '11:00-13:00'
            }, {
                txt: '晚餐',
                shortTxt: '晚',
                time: '18:00-20:00'
            }],
            periodIndex: 1,
            categories: [],
            categoryIndex: '',
            today: {
                year: '',
                month: '',
                day: ''
            },
            weekCalendar: []
        }
    },

    methods: {
        selectCategory (tab, event) {
            this.categoryIndex = tab.$attrs.cid.toString()
        },

        selectPeriod (periodIdx) {
            this.periodIndex = periodIdx
        },

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
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },

        getCategoriesList () {
            this.$axios.get(`${prefix}/plan/getCidsByDayPid?day=${this.dayIndex}&pid=${this.periodIndex}`)
            .then((res) => {
                if (res.data.success) {
                    this.categories = [...res.data.relatedObject.categories]
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },

        getFoodsList (day, pid, cid) {
            this.$axios.get(`${prefix}/plan/getFoodsByDayPidCid?day=${this.dayIndex}&pid=${this.periodIndex}&cid=${this.categoryIndex}`)
            .then((res) => {
                if (res.data.success) {
                    this.foods = [...res.data.relatedObject.foods]
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },

        getHotFoods (day, pid, cid) {
            this.$axios.get(`${prefix}/food/getHotFoods`)
            .then((res) => {
                if (res.data.success) {
                    this.hotFoods = [...res.data.relatedObject]
                    this.hotFoods.forEach((food) => {
                        this.getPlanByFoodId(food)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },

        getPlanByFoodId (food) {
            this.$axios.get(`${prefix}/food/getPlanByFoodId?foodId=${food.foodId}`)
            .then((res) => {
                if (res.data.success) {
                    food.plans = [...res.data.relatedObject]
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },

    mounted () {
        this.getWeekCalendar()
        this.getCategoriesList()
        this.getFoodsList()
        this.getHotFoods()
    },

    watch: {
        dayIndex: 'getCategoriesList',
        periodIndex: 'getCategoriesList',
        categoryIndex: 'getFoodsList',
        categories: {
            handler: function (val, oldVal) {
                if (val.length > 0) {
                    this.categoryIndex = val[0].cid.toString()
                    this.getFoodsList()
                }
            },
            deep: true
        }
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.index {
    height: 100%;
    padding: 0 0;

    .main-wrapper {
        padding: px2rem(50px) px2rem(10px) px2rem(10px);

        .time-wrapper {
            position: relative;
            height: px2rem(80px);
            z-index: 5;
            background: $blue;
            border-radius: 4px;

            .img-hot {
                position: absolute;
                top: px2rem(-3px);
                left: px2rem(6px);
                width: px2rem(22px);
                height: px2rem(28px);
                z-index: 999;
            }

            .pic {
                position: absolute;
                width: px2rem(110px);
                height: px2rem(65px);
                top: px2rem(2px);
                left: px2rem(30px);
                border: px2rem(3px) solid orange;
                border-radius: px2rem(6px);;
                background-size: contain;
            }

            .name, .plans {
                display: inline-block;
                position: absolute;
                right: px2rem(15px);
                max-width: px2rem(200px);
                font-size: px2rem(16px);
                text-align: right;
            }

            .name {
                line-height: px2rem(44px);
                height: px2rem(32px);
                // font-size: px2rem(24px);
                color: $white;
            }

            .plans {
                bottom: 0;
                height: px2rem(36px);
                // font-size: px2rem(12px);
                color: $gray;

                .plan {
                    display: inline-block;
                    width: px2rem(32px);
                    height: px2rem(30px);
                    font-size: px2rem(12px);
                }
            }
        }

        .order-wrapper {
            position: relative;
            height: px2rem(478px);
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

                .food-body {
                    height: px2rem(400px);
                }

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
