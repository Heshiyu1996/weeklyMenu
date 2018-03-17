<template>
    <div>
        <mHeader2 title="订单详情"></mHeader2>
        <div class="OrderDetail">
            <div class="detail-wrapper">
                <div class="record">
                    <div class="info">
                        <div class="pid">一心食堂（{{ periodTxt[orderInfo.pid - 1] }}）</div>
                        <div class="createTime">{{ orderInfo.createTime }}</div>
                    </div>
                    <div class="money">{{ orderInfo.totalMoney }}.0 元</div>
                </div>
                <FoodCard :showCount="true" type="orderCard" :commonType="true" @removeMark="updateList" size="big" :foodInfo="item" v-for="(item, idx) in foods" :key="idx"></FoodCard>
            </div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import mHeader2 from '@/components/Public/mHeader2'
import FoodCard from '@/components/foodCard'

export default {
    name: 'OrderDetail',
    components: {
        mHeader2,
        FoodCard
    },
    data () {
        return {
            foods: [],
            removingId: '',
            periodTxt: ['早餐', '午餐', '晚餐']
        }
    },

    computed: {
        orderInfo () {
            return this.$store.getters.getOrderInfo
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

        getOrderDetail () {
            this.$axios.get(`${prefix}/order/getOrderDetail?orderId=${this.$route.params.orderId}`)
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
        this.getOrderDetail()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../../common.css";

.OrderDetail {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: px2rem(10px);
    margin-bottom: px2rem(50px);
    background: $white;

    .detail-wrapper {
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
                width: 78%;

                .pid {
                    height: 70%;
                }

                .createTime {
                    font-size: px2rem(12px);
                }
            }

            .money {
                width: 19%;
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
