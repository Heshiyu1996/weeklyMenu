<template>
    <div>
        <mHeader2 title="提交反馈"></mHeader2>
        <div class="feedBack">
            <div class="input-wrapper">    
                <el-input
                    class="content"
                    type="textarea"
                    :rows="5"
                    placeholder="请输入您的建议/意见..."
                    v-model="cnt">
                </el-input>
            </div>
            <div class="btn-submit" :class="{ noInput: (cnt.length === 0) }" @click="submit()">
                提交
            </div>
        </div>
    </div>
</template>

<script>
import mHeader2 from '@/components/Public/mHeader2'
import { prefix } from '@/publicAPI/config'

export default {
    name: 'feedBack',
    components: {
        mHeader2
    },
    data () {
        return {
            cnt: ''
        }
    },
    computed: {
        userInfo () {
            return this.$store.getters.getUserInfo
        }
    },
    methods: {
        submit () {
            var querystring = require('querystring')
            let that = this
            this.$axios.post(`${prefix}/feedBack/insert`,
                querystring.stringify({
                    userId: that.userInfo.uid,
                    user: that.userInfo.uname,
                    content: that.cnt
                }))
                .then((res) => {
                    if (res.data.success) {
                        this.$alert('衷心感谢您对本食堂提出的建议，我们会认真对待。同时你也可以留意我们的回复。祝你生活愉快!', '提交成功', {
                            confirmButtonText: '好的',
                            callback: () => {
                                this.$router.push('/user')
                            }
                        })
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },

        logout () {
            let that = this
            this.$axios.get(`${prefix}/staff/logout.do`)
            .then((res) => {
                if (res.data.success) {
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
.feedBack {
    position: absolute;
    width: 100%;
    height: 100%;
    background: $gray1;
    
    .input-wrapper {
        margin: px2rem(10px);
    }

    .btn-submit {
        display: inline-block;
        position: absolute;
        right: px2rem(10px);
        width: px2rem(86px);
        height: px2rem(32px);
        padding-left: px2rem(8px);
        background: $white;
        border: 1px solid $blue;
        border-radius: px2rem(4px);
        line-height: px2rem(30px);
        text-align: center;
        letter-spacing: px2rem(8px);
        transition: all .3s ease;

        &.noInput {
            opacity: .3;
            transition: all .3s ease;
        }
    }
}
</style>
