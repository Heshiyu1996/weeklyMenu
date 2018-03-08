<template>
    <div>
        <mHeader></mHeader>
        <div class="index">
            <div class="main-wrapper">
                <div class="time-wrapper">
                    <el-carousel trigger="click" height="75px" :autoplay="autoPlay">
                        <el-carousel-item v-for="(pic, idx) in pic_list" :key="idx">
                            <img :src="pic" class="pic" />
                            <div class="date"> {{ commonInfo.nowTime.year }}.{{ commonInfo.nowTime.month }}.{{ commonInfo.nowTime.day }}</div>
                            <div class="time">（11:30-12:30）</div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="order-wrapper">
                    <div class="date-wrapper">
                        <img class="image" :src="img_breakfast" />
                        <div class="detail">
                            <div class="type">早餐</div>
                            <div class="date"> {{ commonInfo.nowTime.year }}.{{ commonInfo.nowTime.month }}.{{ commonInfo.nowTime.day }}</div>
                            <div class="time">(7:30 - 9:00)</div>

                            <el-dropdown size="mini" trigger="click" split-button type="primary">
                                {{ days[dayIndex-1] }}
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>
                                        <span @click="selectDay(1)">周一</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <span @click="selectDay(2)">周二</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <span @click="selectDay(3)">周三</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <span @click="selectDay(4)">周四</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <span @click="selectDay(5)">周五</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <span @click="selectDay(6)">周六</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <span @click="selectDay(7)">周日</span>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
            dayIndex: 0,
            days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    },
    computed:{
        commonInfo () {
            return this.$store.getters.getCommonInfo
        }
    },

    methods: {
        selectDay (dayIdx) {
            this.dayIndex = dayIdx
        },

        onIndexChange (index) {
            this.idx = index
        },

        getData () {
            this.$axios.get(`${prefix}/food/getFoodsByKeyword?keyword=`)
            .then((res) => {
                if (res.data.success) {
                    this.foods = [...res.data.relatedObject.myList]
                }
            })
            .catch((err) => {
                alert(err)
            })
        },

        getWhichDay () {
            let date = new Date()
            this.dayIndex = date.getDay()
            // alert(this.dayIndex)
        }
    },

    mounted () {
        this.getData()
        this.getWhichDay()
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
                height: px2rem(69px);
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
                        margin-top: px2rem(5px);
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
