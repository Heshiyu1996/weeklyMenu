<template>
    <div class="newIndex">
        <mHeader></mHeader>
        <div class="main-wrapper">
            <div class="datePicker">
                <div class="whichDay">
                    <span class="txt" v-for="(item, idx) in whichDay" :key="idx">{{ item }}</span>
                </div>
                <div class="day">
                    <span class="txt selected" v-for="(item, idx) in thisWeek" :key="idx">{{ item }}</span>
                </div>
            </div>
            <div class="bookPicker">
                <el-tag>
                    <img class="imgPeriod" :src="img_period[0]" />
                    <div class="time">&nbsp;&nbsp;7：00 早餐</div>
                    <div class="btn">可点餐</div>
                </el-tag>
                <el-tag>
                    <img class="imgPeriod" :src="img_period[1]" />
                    <div class="time">11：00 午餐</div>
                    <div class="btn">可点餐</div>
                </el-tag>
                <el-tag type="info">
                    <img class="imgPeriod" :src="img_period[2]" />
                    <div class="time">18：00 晚餐</div>
                    <div class="btn">可点餐</div>
                </el-tag>
            </div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import mHeader from '@/components/Public/mHeader'

export default {
    name: 'newIndex',
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
            thisWeek: ['11', '12', '13', '14', '15', '16', '17']
        }
    },

    methods: {
    },

    mounted () {
    },

    watch: {
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.newIndex {
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
