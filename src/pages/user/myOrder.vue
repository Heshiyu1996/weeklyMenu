<template>
    <div>
        <mHeader2 title="我的订单"></mHeader2>
        <div class="myOrder">
            <div class="total-wrapper">
                <div class="userInfo">heshiyu</div>
                <div class="consumeTotal">
                    <div class="lf">消费总额（元）：</div>
                    <div class="rt">9.8</div>
                </div>
            </div>
            <div class="detail-wrapper">
                <div class="record">
                    <div class="info">
                        <div class="pid">一心食堂（晚餐）</div>
                        <div class="createTime">2018-03-18 16:35</div>
                    </div>
                    <div class="money">15.0 元</div>
                </div>
                <div class="record">
                    <div class="info">
                        <div class="pid">晚餐</div>
                        <div class="createTime">2018-03-18 16:35</div>
                    </div>
                    <div class="money">15.0 元</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import mHeader2 from '@/components/Public/mHeader2'

export default {
    name: 'myOrder',
    components: {
        mHeader2
    },
    data () {
        return {
            foods: [],
            removingId: ''
        }
    },

    methods: {
        updateList (id) {
            this.removingId = id
            this.foods.forEach((elem, idx) => {
                if (elem.foodId === id) {
                    this.foods.splice(idx, 1)
                }
            })
        },

        getMyMarksList () {
            this.$axios.get(`${prefix}/food/getMyMarksList`)
            .then((res) => {
                if (res.data.success) {
                    this.foods = [...res.data.relatedObject]
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    },
    mounted () {
        // this.getMyMarksList()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../../common.css";

.myOrder {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: px2rem(10px);
    margin-bottom: px2rem(50px);
    background: $white;

    .total-wrapper {
        position: relative;
        width: 100%;
        height: px2rem(90px);
        padding: px2rem(10px);
        border-radius: px2rem(4px);
        background: $blue1;
        color: $white;
        box-shadow: px2rem(1px) px2rem(1px) px2rem(7px) $black2;

        .userInfo {
            font-size: px2rem(12px);
            text-align: right;
        }

        .consumeTotal {
            height: px2rem(60px);

            .lf, .rt {
                display: inline-block;
                height: 100%;
            }

            .lf {
                width: px2rem(100px);
                font-size: px2rem(12px);
                line-height: px2rem(98px);
            }

            .rt {
                width: px2rem(200px);
                font-size: px2rem(42px);
                text-align: right;
                vertical-align: bottom;
                line-height: px2rem(74px);
            }
        }
    }

    .detail-wrapper {
        margin-top: px2rem(10px);

        .record {
            width: 100%;
            height: px2rem(60px);
            border-bottom: px2rem(1px) solid $gray2;
            border-radius: px2rem(2px);
            padding: px2rem(10px);
            margin-top: px2rem(10px);
            background: $black2;
            color: $white;
            box-shadow: 0 0 px2rem(5px) $black2;

            .info, .money {
                display: inline-block;
                height: 100%;
                font-family: "黑体";
            }

            .info {
                width: 82%;

                .pid {
                    height: 70%;
                }

                .createTime {
                    font-size: px2rem(12px);
                }
            }

            .money {
                width: 15%;
                text-align: right;
                vertical-align: top;
                line-height: px2rem(39px);
            }

            &:first-child {
                margin-top: 0;
            }
        }
    }
}
</style>
