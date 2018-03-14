<template>
    <div>
        <mHeader2 title="登录"></mHeader2>
        <div class="login">
            <div class="items-wrapper">
                <div class="item">
                    <span class="label">工号</span>
                    <input type="text" v-model="account" class="inputBox" placeholder="请输入员工工号"/>
                </div>
                <div class="item">
                    <span class="label">密码</span>
                    <input type="password" v-model="password" class="inputBox" placeholder="请输入密码"/>
                </div>
            </div>
            <div class="btn-wrapper">
                <div ref="btn" class="btn" :class="{ noInput: ((account.length === 0) || ((password.length === 0))) }" @click="toLogin($event)">登录</div>
            </div>
        </div>
    </div>
</template>

<script>
import mHeader2 from '@/components/Public/mHeader2'
import { prefix } from '@/publicAPI/config'
import { getUserInfo } from '@/publicAPI/util'

export default {
    name: 'login',
    components: {
        mHeader2
    },
    data () {
        return {
            account: '',
            password: ''
        }
    },
    methods: {
        toLogin (ev) {
            if (ev.target.classList.contains('noInput')) return false
            this.$refs.btn.innerText = '登录中...'
            this.$refs.btn.style.backgroundColor = '#4FA34B'
            setTimeout(() => {
                this.login()
            }, 100)
        },

        login () {
            var querystring = require('querystring')
            let that = this
            this.$axios.post(`${prefix}/staff/login`,
                querystring.stringify({
                    uid: that.account,
                    upassword: that.password
                }))
                .then((res) => {
                    if (res.data.success) {
                        getUserInfo(that)
                        that.$router.push('/')
                    } else {
                        this.$refs.btn.innerText = '登录'
                        this.$refs.btn.style.backgroundColor = '#1F9B16'
                        alert(res.data.msg)
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
@import "../common.css";

.login {
    height: px2rem(330px);

    .items-wrapper {
        .item {
            height: px2rem(50px);
            padding: 0 px2rem(20px) px2rem(9px);
            border-bottom: 1px solid $gray3;

            .label {
                display: inline-block;
                width: px2rem(50px);
                height: 100%;
                padding-top: px2rem(14px);
                color: $gray2;
            }

            .inputBox {
                width: px2rem(250px);
                height: 100%;
                border: 0 solid $white;
            }

            ::-webkit-input-placeholder { /* WebKit browsers */
                color: $gray2;
                font-size: 12px;
                padding-top: px2rem(1px);
            }

            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color: $gray2;
                font-size: 12px;
                padding-top: px2rem(1px);
            }

            ::-moz-placeholder { /* Mozilla Firefox 19+ */
                color: $gray2;
                font-size: 12px;
                padding-top: px2rem(1px);
            }

            :-ms-input-placeholder { /* Internet Explorer 10+ */
                color: $gray2;
                font-size: 12px;
                padding-top: px2rem(1px);
            }
        }
    }

    .btn-wrapper {
        margin-top: px2rem(100px);
        
        .btn {
            margin: 0 auto;
            width: px2rem(300px);
            height: px2rem(45px);
            line-height: px2rem(45px);
            letter-spacing: px2rem(4px);
            border-radius: 25px;
            color: $white;
            text-align: center;
        }

        .noInput {
            background: $gray2;
            opacity: .6;
        }
    }
}
</style>
