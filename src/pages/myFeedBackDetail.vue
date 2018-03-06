<template>
    <div>
        <mHeader2 title="反馈详情"></mHeader2>
        <div class="feedbackDetail">
            <div class="feedback-wrapper">
                <div class="item-wrapper">
                    <div class="name">{{ feedBackInfo.user }}
                        <el-tag v-if="feedBackInfo.isReplied !== 0" size="mini">已回复</el-tag>
                        <el-tag v-else type="info" size="mini">未回复</el-tag>
                    </div>
                    <div ref="content" class="content f-ellipsis3">{{ feedBackInfo.content }}</div>
                    <div class="time">{{ feedBackInfo.time }}</div>
                    <div class="extend-btn" v-if="feedBackInfo.needExtend" @click="extend($event, feedBackInfo)">展开</div>
                </div>
                <div class="reply-wrapper" v-if="feedBackInfo.isReplied !== 0">
                    <div class="content">{{ feedBackInfo.repliedMsg }}</div>
                    <div class="time">{{ feedBackInfo.repliedTime }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import mHeader2 from '@/components/Public/mHeader2'

export default {
    name: 'myFeedBackDetail',
    components: {
        mHeader2
    },
    data () {
        return {
            dd_selected_replied: '全部',
            dd_selected_time: '时间降序',
            feedBackInfo: {
                fid: '',
                user: '',
                content: '',
                time: '',
                isReplied: 0,
                repliedMsg: '',
                repliedTime: ''
            }
        }
    },
    methods: {
        select (type) {
            switch (type) {
            case 'r0':
                this.dd_selected_replied = '全部'
                break
            case 'r1':
                this.dd_selected_replied = '未回复'
                break
            case 'r2':
                this.dd_selected_replied = '已回复'
                break
            case 't0':
                this.dd_selected_time = '时间降序'
                break
            case 't1':
                this.dd_selected_time = '时间升序'
                break
            }
        },

        loadFeedBackInfo () {
            this.$axios.get(`${prefix}/feedBack/getFeedBackListById?fid=${this.$route.params.fid}`)
            .then((res) => {
                if (res.data.success) {
                    Object.assign(this.feedBackInfo, res.data.relatedObject)
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    },
    mounted () {
        this.loadFeedBackInfo()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../common.css";
.feedbackDetail {
    position: absolute;
    width: 100%;
    background: $gray1;

    .feedback-wrapper {
        .item-wrapper {
            padding: px2rem(10px) 0 px2rem(10px);
            margin: px2rem(8px) 0 px2rem(10px);;
            background: $gray3;
            border-bottom: px2rem(1px) solid $gray3;

            .name {
                display: inline-block;
                max-width: px2rem(200px);
                margin-left: px2rem(15px);
                font-size: px2rem(16px);
                color: $black;
            }

            .extend-btn {
                display: inline-block;
                position: absolute;
                right: px2rem(15px);
                width: px2rem(30px);
                font-size: px2rem(14px);
            }

            .extend-btn {
                color: $red1;
            }

            .time {
                display: inline-block;
                max-width: px2rem(200px);
                margin-left: px2rem(15px);
                font-size: px2rem(14px);
                color: $gray2;
            }

            .content {
                text-indent: px2rem(18px);
                margin: px2rem(5px) 0;
                min-height: px2rem(15px);
                font-size: px2rem(14px);
                color: $black1;
            }

            &:last-child {
                border-bottom: 0 solid $gray2;
            }
        }

        .reply-wrapper {
            position: relative;
            margin: px2rem(15px) px2rem(10px) 0;
            color: $black2;
            border: 1px dashed $blue;
            padding: px2rem(20px);
            text-indent: px2rem(10px);

            .content {
                text-indent: px2rem(18px);
                margin: px2rem(5px) 0;
                min-height: px2rem(15px);
                font-size: px2rem(14px);
                color: $black1;
            }

            .time {
                display: inline-block;
                position: absolute;
                top: px2rem(5px);
                right: px2rem(5px);
                max-width: px2rem(200px);
                font-size: px2rem(14px);
                color: $gray2;
            }
        }
    }
}
</style>
