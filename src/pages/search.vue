<template>
    <div class="search">
        <nav class="header-wrapper">
            <router-link to="/">
                <div class="flag">
                    <a href="javascript:;" class="login_link icon icon-user"></a>
                </div>
            </router-link>
            <div class="input-wrapper">
                <input class="searchInput" type="text" placeholder="想吃什么搜这里，如粤菜" />
                <div class="btn">搜索</div>
            </div>
        </nav>

        <!-- 初次进入 开始 -->
        <div class="hot-wrapper">
            <div class="title">热门搜索</div>
            <div class="list">
                <div class="item" v-for="(i, key) in 7" :key="key">青鸡蛋椒</div>
            </div>
        </div>
        <div class="recent-wrapper">
            <div class="title">最近搜索
                <a href="javascript:;" class="remove icon icon-user"></a>
            </div>
            <div class="list">
                <div class="item" v-for="(i, key) in 4" :key="key">粤菜</div>
            </div>
        </div>
        <!-- 初次进入 结束 -->
    </div>
</template>

<script>
import mHeader2 from '@/components/Public/mHeader2'

export default {
    name: 'search',
    components: {
        mHeader2
    },
    data () {
        return {
            isSearch: true
        }
    },
    methods: {
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
                    color:  $white;
                }
            }

            .btn {
                display: inline-block;
                margin-left: px2rem(10px);
                font-size: px2rem(12px);
            }
        }
    }

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

            .remove:before {
                position: absolute;
                right: 0;
                margin: px2rem(10px) px2rem(20px) 0 0;
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
</style>
