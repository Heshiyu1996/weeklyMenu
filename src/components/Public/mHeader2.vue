<template>
    <nav class="header-wrapper" :class="{isSuper: isSuper}">
        <router-link to="/">
            <div class="flag">
                <i class="back_link el-icon-arrow-left"></i>
            </div>
        </router-link>
        <div class="title">
             {{ isSuper ? '超级管理员' : title }}
        </div>
    </nav>
</template>

<script>
export default {
    name: 'mHeader2',
    props: {
        title: {
            default: '个人中心',
            type: String
        },
        isSuper: {
            default: false,
            type: Boolean
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../../common.css";

.header-wrapper {
    position: relative;
    padding: px2rem(5px) 0;
    width: 100%;
    height: px2rem(40.5px);
    text-align: center;
    color: #FFF;
    background-image: linear-gradient(-1deg, $blue1 10%, $blue 100%);

    &.isSuper {
        background: $black;
    }

    .flag {
        display: inline-block;
        position: absolute;
        top: px2rem(11px);
        left: px2rem(15px);
        width: px2rem(24px);
        height: px2rem(24px);

        .back_link {
            color: $white;
        }
    }
    
    .title {
        display: inline-block;
        position: relative;
        top: px2rem(2px);
        width: px2rem(100px);
        height: px2rem(24px);
        font-size: px2rem(18px);
    }
}
</style>