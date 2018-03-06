<template>
    <div>
        <mHeader></mHeader>
        <div class="index">
            <div class="main-wrapper">
                <div class="time-wrapper">
                    <el-carousel trigger="click" height="75px" :autoplay="autoPlay">
                        <el-carousel-item v-for="(pic, idx) in pic_list" :key="idx">
                            <img :src="pic" class="pic" />
                            <div class="date">18.02.27</div>
                            <div class="time">（11:30-12:30）</div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="order-wrapper">
                    <div class="date-wrapper">
                        <img class="image" :src="img_breakfast" />
                        <div class="detail">
                            <div class="type">早餐</div>
                            <div class="date">18.02.27</div>
                            <div class="time">(7:30 - 9:00)</div>
                        </div>
                    </div>
                    <div class="food-wrapper">
                        <el-tabs tab-position="left" style="height: 360px;">
                            <el-tab-pane label="点心">
                                <div class="food" v-for="(item, idx) in 10" :key="idx">
                                    <img class="img" :src="img_food" />
                                    <div class="desc">
                                        <div class="name f-ellipsis">莴笋炒鸡蛋</div>
                                        <div class="material f-ellipsis">鸡蛋、莴笋、红椒、小葱</div>
                                        <div class="hot f-ellipsis">14浏览 7收藏</div>
                                    </div>
                                </div>
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
import mHeader from '@/components/Public/mHeader'

export default {
    name: 'Index',
    components: {
        mHeader
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
            autoPlay: false
        }
    },
    methods: {
        onIndexChange (index) {
            this.idx = index
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
