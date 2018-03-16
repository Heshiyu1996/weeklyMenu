<template>
    <div>
        <mHeader2 title="注册"></mHeader2>
        <div v-if="!isSuccess" class="regist">
            <div class="items-wrapper">
                <div class="item">
                    <span class="label">工号</span>
                    <input type="text" v-model="uid" class="inputBox" placeholder="请输入员工工号"/>
                </div>
                <div class="item">
                    <span class="label">密码</span>
                    <input type="password" v-model="upassword" class="inputBox" placeholder="请输入密码"/>
                </div>
                <div class="item">
                    <span class="label">确认密码</span>
                    <input type="password" v-model="uConfirmPassword" class="inputBox" placeholder="请再次输入密码"/>
                </div>
                <div class="item">
                    <span class="label">名字</span>
                    <input type="text" v-model="uname" class="inputBox" placeholder="请输入名字"/>
                </div>
                <div class="item">
                    <span class="label">手机</span>
                    <input type="text" v-model="umobile" class="inputBox" placeholder="请输入手机号"/>
                </div>
            </div>
            <div class="btn-wrapper">
                <div ref="btn" class="btn" 
                :class="{ noInput: ((uid.length === 0) || 
                (upassword.length === 0) || 
                (uConfirmPassword.length === 0) || 
                (umobile.length === 0) ||
                (uname.length === 0)) }" @click="toRegist($event)">
                    注册
                </div>
            </div>
        </div>
        <transition name="bounce">
            <div v-if="isSuccess" class="favorite-guide">
                <div class="txt">恭喜你，注册成功啦！<br /><br />请给我一个机会，让我更加懂你。</div>
                <div class="btns">
                    <el-button type="primary" @click="goTo('character')">好的！</el-button>
                    <el-button type="info" @click="goTo('')">不了，谢谢</el-button>
                    <div class="tip">(点击“好的”将前往设置个人性格、喜好，每天优先推送量身定做的菜品)</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import mHeader2 from '@/components/Public/mHeader2'
import { prefix } from '@/publicAPI/config'
import { getUserInfo } from '@/publicAPI/util'

export default {
    name: 'regist',
    components: {
        mHeader2
    },
    data () {
        return {
            uid: '',
            uname: '',
            umobile: '',
            upassword: '',
            uConfirmPassword: '',
            isSuccess: false
        }
    },
    methods: {
        goTo (destination) {
            this.$router.push(`/${destination}`)
        },

        toRegist (ev) {
            if (ev.target.classList.contains('noInput')) return false
            this.$refs.btn.innerText = '注册中...'
            this.$refs.btn.style.backgroundColor = '#4FA34B'
            setTimeout(() => {
                this.addUser()
            }, 100)
        },

        addUser () {
            var querystring = require('querystring')
            let that = this
            this.$axios.post(`${prefix}/staff/regist`,
                querystring.stringify({
                    uid: that.uid,
                    uname: that.uname,
                    umobile: that.umobile,
                    upassword: that.upassword
                }))
                .then((res) => {
                    if (res.data.success) {
                        getUserInfo(that)
                        this.isSuccess = true
                    } else {
                        this.$refs.btn.innerText = '注册'
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

.regist {
    height: px2rem(330px);

    .items-wrapper {
        .item {
            height: px2rem(50px);
            padding: 0 px2rem(20px) px2rem(9px);
            border-bottom: 1px solid $gray3;

            .label {
                display: inline-block;
                width: px2rem(70px);
                height: 100%;
                padding-top: px2rem(14px);
                color: $gray2;
            }

            .inputBox {
                width: px2rem(250px);
                height: 100%;
                border: 0 solid $white;
            }

            ::-webkit-input-placeholder {
                color: $gray2;
                font-size: 12px;
                padding-top: px2rem(1px);
            }

            :-moz-placeholder {
                color: $gray2;
                font-size: 12px;
                padding-top: px2rem(1px);
            }

            ::-moz-placeholder {
                color: $gray2;
                font-size: 12px;
                padding-top: px2rem(1px);
            }

            :-ms-input-placeholder { 
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
            background: $blue;
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

.favorite-guide {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: $white1;
    opacity: .9;
    text-aligh: center;

    .txt, .btns {
        display: inline-block;
        position: fixed;
        top: 40%;
        left: 50%;
        width: px2rem(250px);
        transform: translate(-50%, -50%);
        text-align: center;
    }
    
    .btns {
        top: 75%;
        width: 80%;
        height: px2rem(40px);

        .tip {
            background: $white1 !important;
            margin-top: px2rem(10px);
            color: $white;
            font-size: px2rem(12px);
        }
    }
}
</style>
