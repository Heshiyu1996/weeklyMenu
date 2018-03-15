<template>
    <div class="foodCard" @click="gotoDetail($event, foodInfo.foodId)">
        <img class="img" :src="prefix + foodInfo.imgUrl" />
        <div class="desc" :class="sizeObj">
            <div class="name f-ellipsis">{{ foodInfo.name }}</div>
            <div class="material f-ellipsis2">{{ foodInfo.material }}</div>
            <div class="hot f-ellipsis">{{ foodInfo.visitCount }} 浏览 {{ foodInfo.markCount }} 收藏</div>
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
        showStar: {
            default: false,
            type: Boolean
        },
        showSelect: {
            default: false,
            type: Boolean
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
                'normal': this.size === 'normal'    // 58%
            },
            checked: false,
            prefix: prefix
        }
    },
    methods: {
        select (id) {

        },

        removeMarks (id) {
            var querystring = require('querystring')
            let that = this
            this.$axios.post(`${prefix}/food/removeMarks`,
                querystring.stringify({
                    foodId: id,
                    userId: that.userInfo.uid
                }))
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

        &.small {
            width: 55%;
        }

        &.normal {
            width: 58%;
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
}
</style>
