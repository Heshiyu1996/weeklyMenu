<template>
    <div>
        <div class="reply">
            <div class="filter-wrapper">
                <el-dropdown trigger="click" class="dd-replied">
                    <span class="el-dropdown-link">
                        {{ dd_selected_replied }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span class="dd-txt" @click="select('r0')">全部</span>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span class="dd-txt" @click="select('r1')">未回复</span>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span class="dd-txt" @click="select('r2')">已回复</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        {{ dd_selected_time }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span class="dd-txt" @click="select('t0')">时间降序</span>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span class="dd-txt" @click="select('t1')">时间升序</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="reply-wrapper">
                <div class="items">
                    <div class="item" v-for="(item, idx) in feedBackList" :key="idx">
                        <div class="name">{{ item.user }}
                            <el-tag v-if="item.isReplied !== 0" size="mini">已回复</el-tag>
                            <el-tag v-else type="info" size="mini">未回复</el-tag>
                        </div>
                        <div class="reply-btn" @click="openReply(item.fid, item.user, item.content)">
                            {{(item.isReplied !== 0) ? '重新' : ''}}回复
                        </div>
                        <div ref="content" class="content f-ellipsis3">{{ item.content }}</div>
                        <div class="time">{{ item.createTime }}</div>
                        <div class="extend-btn" v-if="item.needExtend" @click="extend($event, item)">展开</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'

export default {
    name: 'reply',
    data () {
        return {
            dd_selected_replied: '全部',
            dd_selected_replied_val: -1,
            dd_selected_time: '时间降序',
            dd_selected_time_val: 'desc',
            feedBackList: {
                fid: '',
                user: '',
                content: '',
                time: '',
                isReplied: 0
            }
        }
    },
    computed: {
        userInfo () {
            return this.$store.getters.getUserInfo
        }
    },
    watch: {
        dd_selected_replied_val: 'loadFeedBackList',
        dd_selected_time_val: 'loadFeedBackList'
    },

    methods: {
        extend (ev, item) {
            let parentNode = ev.target.parentNode
            let txtBtn = parentNode.getElementsByClassName('extend-btn')[0].innerText
            if (txtBtn === '展开') {
                parentNode.getElementsByClassName('content')[0].classList.remove('f-ellipsis3')
                parentNode.getElementsByClassName('extend-btn')[0].innerText = '收起'
            } else {
                parentNode.getElementsByClassName('content')[0].classList.add('f-ellipsis3')
                parentNode.getElementsByClassName('extend-btn')[0].innerText = '展开'
            }
        },

        openReply (id, user, cnt) {
            let that = this
            let content = cnt.slice(0, 15)
            this.$prompt(`${user}：${content}...`, '回复用户反馈', {
                confirmButtonText: '提交',
                cancelButtonText: '取消'
            }).then((obj) => {
                that.submit(id, obj.value)
                this.$message({
                    type: 'success',
                    message: '回复成功！'
                })
            }).catch(() => {
            })
        },

        submit (fid, repliedMsg) {
            this.$axios.post(`${prefix}/admin/update`, {
                    fid: fid,
                    isReplied: 1,
                    repliedMsg: repliedMsg
                })
                .then((res) => {
                    if (res.data.success) {
                        this.loadFeedBackList()
                        this.$alert('好了!', '回复成功', {
                            confirmButtonText: '好的'
                        })
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },

        select (type) {
            switch (type) {
            case 'r0':
                this.dd_selected_replied = '全部'
                this.dd_selected_replied_val = -1
                break
            case 'r1':
                this.dd_selected_replied = '未回复'
                this.dd_selected_replied_val = 0
                break
            case 'r2':
                this.dd_selected_replied = '已回复'
                this.dd_selected_replied_val = 1
                break
            case 't0':
                this.dd_selected_time = '时间降序'
                this.dd_selected_time_val = 'desc'
                break
            case 't1':
                this.dd_selected_time = '时间升序'
                this.dd_selected_time_val = 'asc'
                break
            }
        },

        loadFeedBackList () {
            this.$axios.get(`${prefix}/admin/loadFeedBackList?isReplied=${this.dd_selected_replied_val}&order=${this.dd_selected_time_val}`)
            .then((res) => {
                if (res.data.success) {
                    this.feedBackList = [...res.data.relatedObject.myList]
                    this.feedBackList.forEach(elem => {
                        if (elem.content.length > 50) {
                            this.$set(elem, 'needExtend', true)
                        } else {
                            this.$set(elem, 'needExtend', false)
                        }
                    })
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    },
    mounted () {
        this.loadFeedBackList()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../../common.css";
.reply {
    position: absolute;
    width: 100%;
    background: $gray1;

    .filter-wrapper {
        height: px2rem(35px);
        background: $white;
    }

    .reply-wrapper {
        .items {
            .item {
                padding: px2rem(10px) 0 px2rem(10px);
                margin-top: px2rem(8px);
                background: $white;
                border-bottom: px2rem(1px) solid $gray3;

                .name {
                    display: inline-block;
                    max-width: px2rem(200px);
                    margin-left: px2rem(15px);
                    font-size: px2rem(16px);
                    color: $black;
                }

                .reply-btn, .extend-btn {
                    display: inline-block;
                    position: absolute;
                    right: px2rem(15px);
                    width: px2rem(60px);
                    font-size: px2rem(14px);
                    text-align: right;
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
                    padding: 0 px2rem(15px);
                    min-height: px2rem(15px);
                    font-size: px2rem(14px);
                    color: $black1;
                }

                &:last-child {
                    border-bottom: 0 solid $gray2;
                }
            }
        }
    }
}
</style>
