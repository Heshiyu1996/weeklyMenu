<template>
    <div>
        <mHeader2 title="我的反馈"></mHeader2>
        <div class="myFeedBack">
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
                        <router-link :to="'/myFeedBackDetail/' + item.fid">
                            <div class="enter">
                                <i class="login_link el-icon-arrow-right"></i>
                            </div>
                            <div class="name">{{ item.user }}
                                <el-tag v-if="item.isReplied !== 0" size="mini">已回复</el-tag>
                                <el-tag v-else type="info" size="mini">未回复</el-tag>
                            </div>
                            <div ref="content" class="content f-ellipsis2">{{ item.content }}</div>
                            <div class="time">{{ item.createTime }}</div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import mHeader2 from '@/components/Public/mHeader2'

export default {
    name: 'myFeedBack',
    components: {
        mHeader2
    },
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

    watch: {
        dd_selected_replied_val: 'loadMyFeedBackList',
        dd_selected_time_val: 'loadMyFeedBackList'
    },

    methods: {
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

        loadMyFeedBackList () {
            this.$axios.get(`${prefix}/feedBack/getFeedBackList?isReplied=${this.dd_selected_replied_val}&order=${this.dd_selected_time_val}`)
            .then((res) => {
                if (res.data.success) {
                    this.feedBackList = [...res.data.relatedObject.myList]
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    },
    mounted () {
        this.loadMyFeedBackList()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../../common.css";

.myFeedBack {
    position: relative;
    width: 100%;
    height: 100%;
    margin-bottom: px2rem(45px);
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
                    padding: 0 px2rem(75px) 0 px2rem(20px);
                    min-height: px2rem(32px);
                    font-size: px2rem(12px);
                    text-align: justify;
                    max-height: px2rem(32px);
                    color: $black1;
                }

                .enter {
                    display: inline-block;
                    position: absolute;
                    right: 0;
                    background: $blue;
                    width: px2rem(60px);
                    height: px2rem(105px);
                    margin-top: px2rem(-10px);
                    text-align: center;
                    line-height: px2rem(125px);

                    .login_link {
                        color: $white;
                        font-size: px2rem(50px);
                    }
                }

                &:last-child {
                    border-bottom: 0 solid $gray2;
                }
            }
        }
    }
}
</style>
