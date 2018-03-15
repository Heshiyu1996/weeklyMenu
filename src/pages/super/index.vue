<template>
    <div>
        <mHeader2 :isSuper="true"></mHeader2>
        <div v-if="!this.$route.meta.inChild" class="super">
            <div class="manager">
                <div class="item" @click="goTo('addFood')">
                    <span class="flag el-icon-circle-plus-outline"></span>
                    <div class="txt">添加菜品</div>
                    <span class="extend el-icon-arrow-right"></span>
                </div>
                <div class="item" @click="goTo('editFood')">
                    <span class="flag el-icon-edit"></span>
                    <div class="txt">编辑菜品</div>
                    <span class="extend el-icon-arrow-right"></span>
                </div>
                <div class="item" @click="goTo('deleteFood')">
                    <span class="flag el-icon-remove-outline"></span>
                    <div class="txt">删除菜品</div>
                    <span class="extend el-icon-arrow-right"></span>
                </div>
                <div class="item" @click="goTo('checkFood')">
                    <span class="flag el-icon-remove-outline"></span>
                    <div class="txt">查看菜品</div>
                    <span class="extend el-icon-arrow-right"></span>
                </div>
            </div>
            <div class="manager">
                <div class="item" @click="goTo('reply')">
                    <span class="flag el-icon-edit-outline"></span>
                    <div class="txt">查看反馈</div>
                    <span class="extend el-icon-arrow-right"></span>
                </div>
            </div>
            <div class="item logout" @click="logout()">退出登录</div>
        </div>
        <router-view v-else></router-view>
    </div>
</template>

<script>
import mHeader2 from '@/components/Public/mHeader2'
import { prefix } from '@/publicAPI/config'

export default {
    name: 'addFood',
    components: {
        mHeader2
    },
    data () {
        return {
        }
    },
    methods: {
        goTo (destination) {
            this.$router.push(`/super/${destination}`)
        },

        logout () {
            let that = this
            this.$axios.get(`${prefix}/staff/logout.do`)
            .then((res) => {
                if (res.data.success) {
                    that.$store.commit('setUserInfo', {})
                    myVue.$store.commit('setIflogin', false)
                    that.$router.push('/')
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../../common.css";
.super {
    position: absolute;
    width: 100%;
    height: 100%;
    background: $gray1;

    .item {
        position: relative;
        height: px2rem(49px);
        padding: px2rem(15px) px2rem(15px) 0;
        font-size: px2rem(14px);
        color: $black1;
        background: $white;
        border-bottom: 1px $gray3 solid;
        
        &.logout {
            margin-top: px2rem(16px);
            padding-left: px2rem(37px);
            color: red;
        }

        .flag {
            display: inline-block;
            position: absolute;
            font-size: px2rem(18px);
            color: $blue;
        }

        .txt {
            margin-left: px2rem(22px);
        }

        .extend {
            position: absolute;
            top: px2rem(18.75px);
            right: px2rem(15px);
        }
    }
}
</style>
