<template>
    <div class="foodCard" @click="gotoDetail(foodInfo.foodId)">
        <img class="img" :src="img_food" />
        <div class="desc" :class="sizeObj">
            <div class="name f-ellipsis">{{ foodInfo.name }}</div>
            <div class="material f-ellipsis">{{ foodInfo.material }}</div>
            <div class="hot f-ellipsis">{{ foodInfo.visitCount }} 浏览 {{ foodInfo.markCount }} 收藏</div>
        </div>
        <div v-if="showStar" class="star" @click="say($event, foodInfo.foodId)" @click.stop>
            <i class="star_link el-icon-star-on"></i>
        </div>
    </div>
</template>

<script>
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
        }
    },

    data () {
        return {
            img_food: require('./../../static/food/ws.jpg'),
            sizeObj: {
                'small': this.size === 'small',     // 55%
                'normal': this.size === 'normal'    // 58%
            }
        }
    },
    methods: {
        say (ev, val) {
            alert(11)

        },

        gotoDetail (id) {
            this.$router.push(`/foodDetail/${id}`)
        }
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.foodCard {
    width: 100%;
    height: px2rem(76px);
    padding: px2rem(5px) 0;
    border-bottom: px2rem(1px) solid $gray2;
    background: $white;

    .img, .desc {
        display: inline-block;
    }

    .img {
        width: px2rem(100px);
        height: 100%;
        background: green;
    }

    .desc {
        width: 68%;
        height: 100%;
        margin-left: px2rem(4px);
        vertical-align: top;

        .name {
            max-width: 80%;
            color: $black2;
            font-size: px2rem(18px);
        }

        .material, .hot {
            max-width: px2rem(280px);
            color: $gray2;
            font-size: px2rem(14px);
        }

        &.small {
            width: 55%;
        }

        &.normal {
            width: 58%;
        }
    }

    .star {
        display: inline-block;
        position: absolute;
        right: 0;
        width: px2rem(60px);
        height: px2rem(76px);
        margin-top: px2rem(-5px);
        text-align: center;
        line-height: px2rem(76px);

        .star_link {
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