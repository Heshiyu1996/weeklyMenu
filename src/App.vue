<template>
  <div id="app">
    <transition name="el-fade-in-linear">
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </transition>
    <transition name="el-fade-in-linear">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <div class="switch-bar">
        <div ref="index" class="index bar selected" @click="selectIndex()">
            <i class="icon icon-home3"></i>
            <div class="txt">首页</div>
        </div>
        <div ref="book" class="book bar" @click="selectBook()">
            <i class="icon icon-tongue2"></i>
            <div class="txt">订餐</div>
        </div>
        <div ref="user" class="user bar" @click="selectUser()">
            <i class="icon icon-user"></i>
            <div class="txt">我的</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'app',

    computed: {
        ifLogin () {
            return this.$store.getters.getIflogin
        },
        userInfo () {
            return this.$store.getters.getUserInfo
        }
    },

    methods: {
        goTo (destination) {
            if ((destination === 'user') && (this.userInfo.utype === 1)) {
                destination = 'super'
            }
            this.$router.push(`/${destination}`)
        },

        preventGo () {
            this.$alert('此功能需要登录后才能使用', '请先登录', {
                confirmButtonText: '好的',
                callback: () => {
                    this.$router.push('/login')
                }
            })
        },

        selectIndex () {
            this.cleanFlag()
            this.$refs.index.classList.add('selected')
            this.goTo('')
        },

        selectBook () {
            this.cleanFlag()
            if (!this.ifLogin) {
                this.preventGo()
                return
            }
            this.$refs.book.classList.add('selected')
            this.goTo('book')
        },

        selectUser () {
            this.cleanFlag()
            if (!this.ifLogin) {
                this.preventGo()
                return
            }
            this.$refs.user.classList.add('selected')
            this.goTo('user')
        },

        cleanFlag () {
            let barList = document.getElementsByClassName('bar')
            let len = barList.length
            for (let i=0; i < len; i++) {
                barList[i].classList.remove('selected')
            }
        }
    },

    watch: {
        $route: function (newRoute) {
            console.log(newRoute)
            if (newRoute.name === 'index') {
                this.selectIndex()
            }
            if (newRoute.name === 'book') {
                this.selectBook()
            }
        }
    }
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
