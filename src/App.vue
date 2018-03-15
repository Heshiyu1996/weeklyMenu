<template>
  <div id="app">
    <transition name="el-fade-in-linear">
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </transition>
    <transition name="el-fade-in-linear">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <div class="switch-bar">
        <div class="index bar " @click="clickBar($event)">
            <i class="icon icon-home3"></i>
            <div class="txt">首页</div>
        </div>
        <div class="book bar" @click="clickBar($event)">
            <i class="icon icon-tongue2"></i>
            <div class="txt">订餐</div>
        </div>
        <div class="user bar" @click="clickBar($event)">
            <i class="icon icon-user"></i>
            <div class="txt">我的</div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'app',

    methods: {
        clickBar (ev) {
            let barList = document.getElementsByClassName('bar')
            let len = barList.length
            for (let i=0; i < len; i++) {
                barList[i].classList.remove('selected')
            }
            ev.currentTarget.classList.add('selected')
        }
    },

    mounted () {
    },
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "./common.css";

#app {
    position: relative;
    height: 100%;
    color: #3893E5;

    .switch-bar {
        display: flex;
        position: fixed;
        background: $blue;
        bottom: 0;
        width: 100%;
        height: px2rem(45px);
        z-index: 999999;
        color: $white;

        .index, .book, .user {
            display: inline-block;
            flex: 1;
            height: 100%;
            text-align: center;

            .txt {
                position: relative;
                font-size: px2rem(12px);
                bottom: px2rem(-2px);
            }

            .icon {
                position: relative;
                top: px2rem(5px);
                font-size: px2rem(24px);
            }

            &.selected {
                background: $blue2;
                padding: 0 px2rem(10px);
                transition: padding .5s, background .5s;
            }
        }
    }
}
</style>
