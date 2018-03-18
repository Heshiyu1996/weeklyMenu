<template>
    <div>
        <mHeader2 v-if="!$route.meta.inChild"></mHeader2>
        <div v-if="!$route.meta.inChild" class="user">
            <div class="items">
                <div class="section">菜品设置</div>
                <div class="item" @click="goTo('user/myMark')">
                    <span class="flag el-icon-star-off"></span>
                    <span class="txt">我的收藏</span>
                    <span class="extend el-icon-arrow-right"></span>
                </div>
                <div class="item" @click="goTo('user/myCharacter')">
                    <span class="flag icon icon-heart"></span>
                    <span class="txt">我的喜好</span>
                    <span class="extend el-icon-arrow-right"></span>
                </div>
            </div>
            <div class="items">
                <div class="section">订餐设置</div>
                <div class="item" @click="goTo('user/feedBack')">
                    <span class="flag el-icon-edit"></span>
                    <div class="txt">提交反馈</div>
                    <span class="extend el-icon-arrow-right"></span>
                </div>
                <div class="item" @click="goTo('user/myFeedBack')">
                    <span class="flag el-icon-document"></span>
                    <div class="txt">我的反馈</div>
                    <span class="extend el-icon-arrow-right"></span>
                </div>
            </div>
            <div class="items">
                <div class="section">订餐设置</div>
                <div class="item" @click="goTo('user/myOrder')">
                    <span class="flag el-icon-edit-outline"></span>
                    <div class="txt">我的订单</div>
                    <span class="extend el-icon-arrow-right"></span>
                </div>
            </div>
            <div class="items">
                <div class="item logout" @click="logout()">退出登录</div>
            </div>
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
        <mFooter></mFooter>
    </div>
</template>

<script>
import mHeader2 from '@/components/Public/mHeader2'
import mFooter from '@/components/Public/mFooter'
import { prefix } from '@/publicAPI/config'

export default {
    name: 'user',
    components: {
        mHeader2,
        mFooter
    },
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
            this.$router.push(`/${destination}`)
        },

        logout () {
            let that = this
            this.$axios.get(`${prefix}/staff/logout.do`)
            .then((res) => {
                if (res.data.success) {
                    that.$store.commit('setUserInfo', {})
                    that.$store.commit('setIflogin', false)
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
@import "../common.css";

.user {
    position: absolute;
    width: 100%;
    height: 100%;
    background: $gray1;

    .items {
        margin-top: px2rem(10px);

        .section {
            margin-left: px2rem(10px);
            height: px2rem(30px);
            line-height: px2rem(30px);
            color: $gray2;
            font-size: px2rem(12px);
        }

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
                color: $blue;
                font-size: px2rem(18px);
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
}
</style>
