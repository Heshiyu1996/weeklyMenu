<template>
    <div v-show="commonType || recentCid === foodInfo.categoryId.toString()" class="foodCard" :class="typeObj">
        <img class="img" :src="prefix + foodInfo.imgUrl" @click="gotoDetail($event, foodInfo.foodId)"/>
        <div class="desc" :class="sizeObj">
            <div class="name f-ellipsis">{{ foodInfo.name }}</div>
            <div class="material f-ellipsis2">{{ foodInfo.material }}</div>
            <div class="hot f-ellipsis">{{ foodInfo.visitCount }} 浏览 {{ foodInfo.markCount }} 收藏</div>
            <div v-show="showPrice" class="price f-ellipsis">
                    ￥ {{ foodInfo.price }}
                    <span v-show="showCount" class="showCount"> x {{ foodInfo.count }}</span>
            </div>
            <span v-show="showCount" class="showTotal">￥ {{ foodInfo.price * foodInfo.count }}</span>
            <div v-if="type === 'bookCard'" class="count-btn">
                <i v-show="count !== 0" class="el-icon-remove-outline" @click="changeCount(0, foodInfo.foodId, count, foodInfo.price)"></i>
                <span v-show="count !== 0" class="count">{{ count }}</span>
                <i class="el-icon-circle-plus" @click="changeCount(1, foodInfo.foodId, count, foodInfo.price)"></i>
            </div>
        </div>
        <div v-if="showStar" class="star" @click="removeMarks(foodInfo.foodId)" @click.stop>
            <i class="star_link el-icon-star-on"></i>
        </div>
        <div v-if="showSelect" class="select" @click="select(foodInfo.foodId)" @click.stop >
            <el-checkbox class="star_link" size="medium" v-model="foodInfo.checked"></el-checkbox>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'

export default {
    name: 'foodCard',
    props: {
        foodInfo: {
            default: {},
            type: Object
        },
        size: {
            default: '',
            type: String
        },
        type: {
            default: '',
            type: String
        },
        showStar: {
            default: false,
            type: Boolean
        },
        showSelect: {
            default: false,
            type: Boolean
        },
        showPrice: {
            default: true,
            type: Boolean
        },
        showCount: {
            default: false,
            type: Boolean
        },
        commonType: {
            default: false,
            type: Boolean
        },
        recentCid: {
            default: '',
            type: String
        }
    },
    computed: {
        userInfo () {
            return this.$store.getters.getUserInfo
        }
    },

    data () {
        return {
            img_food: require('./../../static/food/ws.jpg'),
            sizeObj: {
                'small': this.size === 'small',     // 55%
                'normal': this.size === 'normal',    // 58%
                'big': this.size === 'big'    // 76%
            },
            typeObj: {
                'bookCard': this.type === 'bookCard',
                'markCard': this.type === 'markCard',
                'orderCard': this.type === 'orderCard',
                'searchCard': this.type === 'searchCard'
            },
            checked: false,
            prefix: prefix,
            count: 0
        }
    },
    methods: {
        changeCount (func, id, count, price) {
            this.count = (func === 0) ? this.count - 1 : this.count + 1
            this.$emit("emitFromChild", id, this.count, price)
        },

        removeMarks (id) {
            let that = this
            this.$axios.post(`${prefix}/food/removeMarks`,{
                    foodId: id,
                    userId: that.userInfo.uid
                })
                .then((res) => {
                    if (res.data.success) {
                        this.foodInfo.markCount--
                        this.$emit('removeMark', id)
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },

        gotoDetail (ev, id) {
            if (this.$route.name === 'foodSearch') {
                this.$store.commit('setFoodInfo', this.foodInfo)
                this.$router.push(`/super/editFood`)
            } else {
                this.$router.push(`/foodDetail/${id}`)
            }
        }
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.foodCard {
    width: 100%;
    height: px2rem(79px);
    padding: px2rem(5px) 0;
    margin-top: px2rem(5px);
    border-bottom: px2rem(1px) solid $gray2;
    background: $white;

    .img, .desc {
        display: inline-block;
    }

    .img {
        width: px2rem(100px);
        height: 100%;
    }

    .desc {
        width: 68%;
        height: 100%;
        margin-left: px2rem(4px);
        vertical-align: top;

        .name {
            color: $black2;
            font-size: px2rem(16px);
        }

        .material, .hot {
            max-width: px2rem(280px);
            color: $gray2;
            font-size: px2rem(12px);
        }

        .material {
            min-height: px2rem(30px);
        }

        .price {
            display: inline-block;
            width: 60%;
            color: $red;
            font-size: px2rem(16px);
            font-weight: bold;
        }

        &.small {
            width: 55%;
        }

        &.normal {
            width: 58%;
        }

        &.big {
            width: 76%;
        }
    }

    .star, .select {
        display: inline-block;
        position: absolute;
        right: 0;
        width: px2rem(60px);
        height: px2rem(76px);
        margin-top: px2rem(-5px);
        text-align: center;
        line-height: px2rem(76px);

        .star_link, .select {
            color: $blue;
            font-size: px2rem(28px);
        }

        &:first-child {
            margin-top: 0;
        }
    }

    &:last-child {
        border-bottom: 0 solid $gray2;
    }

    &.bookCard, &.markCard, &.orderCard, &.searchCard {
        height: px2rem(100px);
        border-bottom: px2rem(1px) solid $gray2;

        .img {
            width: px2rem(75px);
            height: px2rem(65px);
        }
    }

    &.orderCard {
        .price {
            width: 75%;

            .showCount {
                color: gray;
            }
        }

        .showTotal {
            display: inline-block;
            vertical-align: top;
        }
    }

    &.searchCard {
        height: px2rem(85px);
        padding: px2rem(5px) px2rem(10px);
        margin-top: px2rem(10px);
        box-shadow: 0 0 px2rem(5px) $black2;

        .material, .hot {
            display: inline-block;
        }

        .price {
            display: inline-block;
            position: absolute;
            right: 0;
            margin-top: px2rem(-25px);
            width: 20%;
        }

        .img {
            border-radius: px2rem(4px);
        }
    }

    .count-btn {
        display: inline-block;
        position: absolute;
        right: 0;
        width: px2rem(80px);

        .el-icon-circle-plus {
            position: absolute;
            top: px2rem(2px);
            right: px2rem(5px);
        }

        .count {
            display: inline-block;
            width: px2rem(30px);
            color: $black;
            text-align: center;
        }
    }
}
</style>
