<template>
    <div class="search">
        <nav class="header-wrapper">
            <router-link to="/">
                <div class="flag">
                    <i class="back_link el-icon-arrow-left"></i>
                </div>
            </router-link>
            <div class="input-wrapper">
                <input v-model="keyword" class="searchInput" type="text" @keyup.enter="search()" placeholder="想吃什么搜这里，如粤菜" />
                <div class="btn" @click="search()">搜索</div>
            </div>
        </nav>
        <!-- 初次进入 开始 -->
        <div v-if="firstEnter" class="init">
            <div class="hot-wrapper">
                <div class="title">热门搜索</div>
                <div class="list">
                    <div class="item" v-for="(item, idx) in keywords" :key="idx" @click="quicklySearch(item)">
                        {{ item }}
                    </div>
                </div>
            </div>
            <div class="recent-wrapper">
                <div class="title">最近搜索
                    <a href="javascript:;" class="remove el-icon-delete"></a>
                </div>
                <div class="list">
                    <div class="item" v-for="(i, key) in 4" :key="key">粤菜</div>
                </div>
            </div>
        </div>
        <!-- 初次进入 结束 -->
        <div v-else class="result-wrapper">
            <div v-if="lastKeyword.length !== 0" class="tip">以下为 “{{ lastKeyword }}” 的搜索结果，共 {{ foods.length }} 个</div>
            <FoodCard size="big" :foodInfo="item" v-for="(item, idx) in foods" :key="idx"></FoodCard>
        </div>
    </div>
</template>
       
<script>
import { prefix } from '@/publicAPI/config'
import mHeader2 from '@/components/Public/mHeader2'
import FoodCard from '@/components/foodCard'

export default {
    name: 'search',
    components: {
        mHeader2,
        FoodCard
    },
    data () {
        return {
            firstEnter: true,
            img_food: require('./../../static/food/ws.jpg'),
            keyword: '',
            lastKeyword: '',
            keywords: [],
            foods: []
        }
    },
    methods: {
        quicklySearch (val) {
            this.keyword = val
            this.search(val)
        },

        search (val) {
            this.firstEnter = false
            this.lastKeyword = this.keyword
            this.$axios.get(`${prefix}/food/getFoodsByKeyword?keyword=${val || this.keyword}`)
            .then((res) => {
                if (res.data.success) {
                    this.foods = [...res.data.relatedObject.myList]
                    if (this.keyword !== '') {
                        this.recordKeyword(this.keyword)
                    }
                }
            })
            .catch((err) => {
                alert(err)
            })
        },

        getHotKeywords () {
            this.$axios.get(`${prefix}/search/getKeywords`)
            .then((res) => {
                if (res.data.success) {
                    this.keywords = [...res.data.relatedObject.myList]
                }
            })
            .catch((err) => {
                alert(err)
            })
        },

        recordKeyword () {
            var querystring = require('querystring')
            this.$axios.post(`${prefix}/search/addKeywordCount`,
                querystring.stringify({
                    keyword: this.keyword
                }))
                .then((res) => {
                    if (res.data.success) {
                        console.log(res.data.success)
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        }
    },

    mounted () {
        this.getHotKeywords()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../common.css";

.search {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: px2rem(14px);
    background: $gray1;
        
    .header-wrapper {
        position: relative;
        padding: px2rem(5px) 0;
        width: 100%;
        height: px2rem(40.5px);
        text-align: center;
        color: #FFF;
        background-image: linear-gradient(-1deg, $blue1 10%, $blue 100%);
        box-shadow: 0 12px 14px 0 rgba(209, 209, 209, .27);

        .flag {
            display: inline-block;
            position: relative;
            top: px2rem(2px);
            left: px2rem(-15px);
            width: px2rem(24px);
            height: px2rem(24px);

            .back_link {
                color: $white;
            }
        }
        
        .title {
            display: inline-block;
            position: relative;
            top: px2rem(10px);
            width: px2rem(100px);
            height: px2rem(24px);
        }
        
        .input-wrapper {
            display: inline-block;
            position: relative;

            .searchInput {
                width: px2rem(265px);
                height: px2rem(30px);
                padding-left: px2rem(28px);
                font-size: px2rem(12px);
                color: $white;
                border: 0 solid $white;
                border-radius: px2rem(4px);
                background: rgba(71, 114, 241, .7);

                &:focus {
                    color: $white;
                }
            }

            .btn {
                display: inline-block;
                margin-left: px2rem(10px);
                font-size: px2rem(12px);
            }
        }
    }

    .init {
        .hot-wrapper {
            height: px2rem(106px);
            background: $white;

            .title {
                height: px2rem(36px);
                margin-left: px2rem(15px);
                line-height: px2rem(36px);
                color: $gray2;
                border-bottom: px2rem(1px) solid $gray1;
            }

            .list {
                padding: px2rem(4px) 0;

                .item {
                    display: inline-block;
                    width: 20%;
                    height: px2rem(32px);
                    line-height: px2rem(32px);
                    text-align: center;
                    color: $black2;
                }
            }
        }

        .recent-wrapper {
            margin-top: px2rem(10px);
            background: $white;

            .title, .list .item {
                margin-left: px2rem(15px);
                color: $gray2;
                border-bottom: px2rem(1px) solid $gray1;
            }

            .title {
                height: px2rem(36px);
                line-height: px2rem(36px);

                .remove {
                    float: right;
                    margin: px2rem(10px) px2rem(15px) 0 0;
                    font-size: px2rem(18px);
                    color: $gray2;
                }
            }

            .list {
                .item {
                    height: px2rem(48px);
                    line-height: px2rem(48px);
                    color: $black2;
                }
            }
        }
    }

    .result-wrapper {
        padding: px2rem(5px) px2rem(15px);

        .tip {
            margin: px2rem(5px) 0;
            color: $gray2;
            font-size: px2rem(12px);
        }

        .food {
            height: px2rem(76px);
            padding: px2rem(5px) 0;
            border-bottom: px2rem(1px) solid $gray2;

            & a {
                display: flex;
                height: 100%;

                .img, .desc {
                    display: inline-block;
                }

                .img {
                    width: px2rem(110px);
                    height: 100%;
                }

                .desc {
                    width: 100%;
                    height: 100%;
                    margin-left: px2rem(4px);
                    vertical-align: top;

                    .name {
                        max-width: 80%;
                        color: $black2;
                        font-size: px2rem(16px);
                    }

                    .material, .hot {
                        max-width: px2rem(280px);;
                        margin-top: px2rem(3px);
                        color: $gray2;
                        font-size: px2rem(12px);
                    }
                }
            }

            &:last-child {
                border-bottom: 0 solid $gray2;
            }
        }
    }
}
</style>
