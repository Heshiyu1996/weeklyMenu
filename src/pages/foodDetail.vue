<template>
  <div class="foodDetail">
    <div class="img-wrapper">
        <img class="img" :src="img_food" />		
    </div>
    <img class="shadeBg"/>
    <div ref="content" class="content" >
        <div class="vidHeader">
            <div class="name f-ellipsis2">{{ foodInfo.name }}</div>
            <div class="tag">{{ foodInfo.category }}</div>
            <i class="mark-btn el-icon-star-on"></i>
            <div class="desc">{{ foodInfo.desc }}</div>
            <div class="hot f-ellipsis">{{ foodInfo.visitCount }} 浏览 {{ foodInfo.markCount }} 收藏</div>
        </div>
        <div class="vidLine"></div>
        <div class="vidBody">
            <div class="material">食材：{{ foodInfo.material }}</div>
            <div class="material">下次出现时间：周二、周三</div>
        </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'

export default {
    name: 'foodDetail',
    data () {
        return {
            foodInfo: {
                name: '',
                imageUrl: '',
                material: '',
                desc: '',
                markCount: 0,
                visitCount: 0,
                categoryId: 0,
                category: ''
            },
            img_food: require('./../../static/food/ws.jpg')
        }
    },

    methods: {
        getFoodInfo () {
            this.$axios.get(`${prefix}/food/getFoodInfoById?foodId=${this.$route.params.foodId}`)
            .then((res) => {
                if (res.data.success) {
                    Object.assign(this.foodInfo, res.data.relatedObject)
                    console.log(this.foodInfo)
                    this.addVisitCount()
                }
            })
            .catch((err) => {
                alert(err)
            })
        },

        addVisitCount () {
            var querystring = require('querystring')
            let that = this
            this.$axios.post(`${prefix}/food/addVisitCount`,
                querystring.stringify({
                    foodId: that.foodInfo.foodId
                }))
                .then((res) => {
                    if (res.data.success) {
                        console.log(res.data.msg)
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
        this.getFoodInfo()
    },

    watch: {
        '$route': 'getArticleDetail'
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.foodDetail {
    width: 100%;

    .img-wrapper {
        display: inline-block;
        position: relative;
        z-index: 5;
        height: px2rem(230px);

        .img {
            width: 100%;
            height: px2rem(230px);;
            z-index: 1;
            background-repeat: no-repeat;
        }
    }

    .shadeBg {
        position: absolute;
        width: 100%;
        height: 64.8%;
        background-color: $black;
        opacity: .4;
    }

    .content {
        opacity: .999;
        padding: px2rem(16px) px2rem(19px) px2rem(16px) px2rem(21px);

        .vidHeader {
            position: relative;
            color: $white;

            .name {
                display: inline-block;
                max-width: px2rem(240px);
                max-height: px2rem(55px);
                font-family: PingFang-SC-Medium;
                font-size: px2rem(18px);
                color: $white;
            }

            .desc, .hot {
                opacity: .6;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                margin-top: px2rem(10px);
                text-align: justify;
            }

            .tag, .mark-btn {
                display: inline-block;
                position: absolute;
                margin-top: px2rem(4px);
                vertical-align: super;
                text-align: center;
                width: px2rem(36px);
            }

            .tag {
                margin-left: px2rem(5px);
                background: linear-gradient(90deg, rgb(255, 94, 58), rgb(255, 149, 0));
                border-radius: px2rem(2px);
                font-size: px2rem(12px);
            }

            .mark-btn {
                right: 0;
                color: $blue;
                font-size: px2rem(20px);
            }
        }

        .vidLine {
            height: px2rem(1px);
            opacity: .2;
            background: $white;
            margin: px2rem(15px) 0 px2rem(16px) 0;
        }

        .vidBody {
            .material {
                color: $white;
                font-size: px2rem(12px);
            }
        }
    }
}
</style>
