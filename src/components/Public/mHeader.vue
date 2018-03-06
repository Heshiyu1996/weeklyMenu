<template>
    <nav class="header-wrapper">
        <router-link to="/">
            <img class="logo" src="./../../../static/logo.png">
            <span class="title">每日菜单</span>
        </router-link>
        <div class="login_area">
            <span v-if="Object.keys(userInfo).length !== 0">
                <span @click="goTo('user')">{{ userInfo.uname }}</span>
                <span class="logout" @click="logout()">退出</span> 
            </span>
            <span v-else @click="goTo('login')">登录</span>
        </div>
    </nav>
</template>

<script>
import { prefix } from '@/publicAPI/config'

export default {
    name: 'mHeader',
    data () {
        return {
        }
    },
    computed: {
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

        logout () {
            let that = this
            this.$axios.get(`${prefix}/staff/logout.do`)
            .then((res) => {
                if (res.data.success) {
                    that.$store.commit('setUserInfo', {})
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../../common.css";

.header-wrapper {
    position: relative;
    width: 100%;
    height: px2rem(40.5px);
    color: #FFF;
    background-image: linear-gradient(-1deg, $blue1 10%, $blue 100%);
    box-shadow: 0 12px 14px 0 rgba(209, 209, 209, .27);

    .logo, .title, .login_area {
        position: absolute;
    }

    .logo {
        top: px2rem(9.5px);
        bottom: px2rem(10.1px);
        left: px2rem(20px);
        width: px2rem(18px);
        height: px2rem(21px);
    }

    .title {
        color: $white;
        top: px2rem(9.5px);
        bottom: px2rem(11px);
        left: px2rem(47px);
        width: px2rem(106px);
        height: px2rem(20px);
        line-height: px2rem(25px);
    }

    .login_area {
        display: inline-block;
        top: px2rem(12.5px);
        bottom: px2rem(13px);
        right: px2rem(15px);
        font-size: px2rem(16px);
        height: px2rem(16px);
        font-size: px2rem(14px);
        color: #FFF;
        
        .logout {
            margin-left: px2rem(8px);
            color: $red;
        }
    }
}
</style>