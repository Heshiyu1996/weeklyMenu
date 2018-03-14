<template>
    <div>
        <mHeader2 title="我的喜好"></mHeader2>
        <div class="myCharacter">
            <div class="items-wrapper">
                <div class="item">
                    <span class="label">民族</span>
                    <el-select v-model="characterInfo.nation" slot="prepend" placeholder="请选择" size="mini">
                        <el-option v-for="(item, idx) in nations" :key="idx" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="btn-wrapper">
                <div ref="btn" class="btn" 
                :class="{ noInput: (uid.length === 0) }" @click="toRegist($event)">
                    保存
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mHeader2 from '@/components/Public/mHeader2'
import { prefix } from '@/publicAPI/config'
import { getUserInfo } from '@/publicAPI/util'

export default {
    name: 'myCharacter',
    components: {
        mHeader2
    },
    data () {
        return {
            uid: '',
            nations: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",  
               "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",  
               "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",  
              "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"
            ],
            characterInfo: {
                nation: ''
            }
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

.myCharacter {
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

            .el-select {
                position: relative;
                top: px2rem(-4px);
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
            background: $green;
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
