<template>
    <div>
        <mHeader></mHeader>
        <div class="bookDetail">
            <div class="main-wrapper">
                <div class="order-wrapper">
                    <div class="food-wrapper">
                        <el-tabs v-model="categoryIndex" tab-position="left" style="height: 360px;" @tab-click="selectCategory">
                            <el-tab-pane :cid="category.cid" :name="category.cid.toString()" v-for="(category, idx) in categories" :key="idx" :label="category.cname">
                                <FoodCard size="normal" :foodInfo="item" v-for="(item, idx) in foods" :key="idx"></FoodCard>
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
    name: 'BookDetail',
    components: {
        mHeader,
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

.bookDetail {
    height: 100%;
    padding: 0 0;

    .main-wrapper {
        padding: px2rem(10px);

        .order-wrapper {
            position: relative;
            height: px2rem(455px);
            margin-top: px2rem(45px);
            padding: px2rem(5px) px2rem(10px) px2rem(5px);
            z-index: 5;
            border: 1px solid $gray;
            
            .food-wrapper {
                margin-top: px2rem(5px);

                .el-tabs {
                    .el-tabs__header {
                        margin-left: 5px;
                    }
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
