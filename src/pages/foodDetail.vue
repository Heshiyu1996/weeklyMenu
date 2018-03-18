<template>
  <div class="foodDetail">
    <mHeader2 :title="foodInfo.name"></mHeader2>
    <div class="img-wrapper">
        <img class="img" :src="prefix + foodInfo.imgUrl" />
    </div>
    <div ref="content" class="content" >
        <div class="vidHeader">
            <div class="name f-ellipsis2">{{ foodInfo.name }}</div>
            <div class="tag">{{ foodInfo.category }}</div>
            <i v-if="!isExistMark" class="mark-btn el-icon-star-off" @click="insertMarks()"></i>
            <i v-if="isExistMark" class="mark-btn el-icon-star-on" @click="removeMarks()"></i>
            <div class="desc">{{ foodInfo.desc }}</div>
            <div class="hot f-ellipsis">{{ foodInfo.visitCount }} 浏览， {{ foodInfo.markCount }} 收藏</div>
            <div class="price">￥ {{ foodInfo.price }}.0</div>
        </div>
        <div class="vidLine"></div>
        <div class="vidBody">
            <el-collapse v-model="activeInfo">
                <el-collapse-item title="食材" name="1">
                    <div>{{ foodInfo.material }}</div>
                </el-collapse-item>
                <el-collapse-item title="供应时段" name="2">
                    <div v-for="(item, idx) in plans" :key="idx">{{ days[parseInt(idx) - 1] }}： {{ item }}</div>
                </el-collapse-item>
            </el-collapse>
            <div class="recommends">
                <div class="title">吃过这道菜的人，还吃过：</div>
                <div class="body">
                    <div class="item"
                    v-for="(item, idx) in foodRecommond"
                    :key="idx"
                    :style="{ backgroundImage: 'url(' + prefix + item.imgUrl + ')'  }"
                    @click="goToDetail(item.foodId)"
                    >
                        <div class="info">
                            <div class="name">
                                {{ item.name }}
                            </div>
                            <div class="price">
                               ￥ {{ item.price }}.0
                            </div>
                        </div>
                    </div>
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
    name: 'foodDetail',
    components: {
        mHeader2
    },
    data () {
        return {
            isExistMark: false,
            foodInfo: {
                foodId: '',
                name: '',
                imageUrl: '',
                material: '',
                desc: '',
                markCount: 0,
                visitCount: 0,
                categoryId: 0,
                category: ''
            },
            plans: {},
            days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            prefix: prefix,
            activeInfo: ['1', '2'],
            foodRecommond: []
        }
    },
    computed: {
        userInfo () {
            return this.$store.getters.getUserInfo
        },

        ifLogin () {
            return this.$store.getters.getIflogin
        }
    },

    methods: {
        goToDetail (id) {
            this.$router.push(`/foodDetail/${id}`)
        },

        getFoodRecommondByOrder () {
            this.$axios.get(`${prefix}/food/getFoodRecommondByOrder?foodId=${this.$route.params.foodId}`)
            .then((res) => {
                if (res.data.success) {
                    this.foodRecommond = [...res.data.relatedObject.foodRecommond]
                }
            })
            .catch((err) => {
                alert(err)
            })
        },

        checkMarks () {
            this.isExistMark = false
            if (!this.ifLogin) return
            this.$axios.get(`${prefix}/food/checkMarks?foodId=${this.$route.params.foodId}`)
            .then((res) => {
                if (res.data.success) {
                    if (res.data.relatedObject.isExist) {
                        this.isExistMark = true
                    }
                }
            })
            .catch((err) => {
                alert(err)
            })
        },

        insertMarks () {
            if (!this.ifLogin) {
                this.$alert('请先登录!', '收藏失败！', {
                    confirmButtonText: '好的',
                    callback: () => {
                    }
                })
                return
            }
            var querystring = require('querystring')
            let that = this
            this.$axios.get(`${prefix}/food/insertMarks?foodId=${that.foodInfo.foodId}&userId=${that.userInfo.uid}`)
                .then((res) => {
                    if (res.data.success) {
                        this.isExistMark = true
                        this.foodInfo.markCount++
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },

        removeMarks () {
            var querystring = require('querystring')
            let that = this
            this.$axios.post(`${prefix}/food/removeMarks`,
                querystring.stringify({
                    foodId: that.foodInfo.foodId,
                    userId: that.userInfo.uid
                }))
                .then((res) => {
                    if (res.data.success) {
                        this.isExistMark = false
                        this.foodInfo.markCount--
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },

        getFoodInfo () {
            this.$axios.get(`${prefix}/food/getFoodInfoById?foodId=${this.$route.params.foodId}`)
            .then((res) => {
                if (res.data.success) {
                    Object.assign(this.foodInfo, res.data.relatedObject)
                    this.getPlanByFoodId(this.foodInfo)
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
                        this.foodInfo.visitCount++
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },

        getPlanByFoodId (food) {
            this.$axios.get(`${prefix}/food/getPlanByFoodId?foodId=${food.foodId}`)
            .then((res) => {
                if (res.data.success) {
                    this.plans = {}
                    let hotFoodsTemp = []
                    hotFoodsTemp = [...res.data.relatedObject]
                    hotFoodsTemp.forEach((item, idx) => {
                        if (item.day in this.plans) {
                            this.$set(this.plans, item.day, `${this.plans[item.day]}、${item.pname}`)
                        } else {
                            this.$set(this.plans, item.day, `${item.pname}`)
                        }
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
    },

    mounted () {
        this.checkMarks()
        this.getFoodInfo()
        this.getFoodRecommondByOrder()
    },

    watch: {
        '$route.params.foodId': function (newVal) {
            this.getFoodInfo()
            this.getFoodRecommondByOrder()
            this.checkMarks()
        }
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
            box-shadow: 0 0 px2rem(5px) $black2;
        }
    }

    .content {
        opacity: .999;
        padding: px2rem(10px);

        .vidHeader {
            position: relative;
            color: $black2;
            background: #D3D3D347;
            padding: px2rem(5px);
            border-radius: px2rem(4px);

            .name {
                display: inline-block;
                max-width: px2rem(240px);
                max-height: px2rem(55px);
                font-family: PingFang-SC-Medium;
                font-size: px2rem(18px);
                color: $black2;
            }

            .desc, .hot {
                opacity: .6;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                margin-top: px2rem(5px);
                text-align: justify;
            }

            .hot {
                display: inline-block;
                width: 78%;
            }

            .price {
                display: inline-block;
                margin-top: px2rem(5px);
                width: 20%;
                color: $red;
                text-align: right;
                vertical-align: top;
            }

            .tag, .mark-btn {
                display: inline-block;
                position: absolute;
                margin-top: px2rem(2px);
                vertical-align: super;
                text-align: center;
                width: px2rem(36px);
            }

            .tag {
                width: px2rem(45px);
                height: px2rem(20px);
                line-height: px2rem(20px);
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
            background: $black2;
            margin: px2rem(10px) 0;
        }

        .vidBody {
            .material {
                margin-bottom: px2rem(16px);
                color: $black2;
                font-size: px2rem(12px);
            }

            .plansTable {
                margin: 0 auto;
                width: px2rem(200px);
                border: px2rem(4px) solid $blue;
                border-radius: px2rem(4px);
                color: $black2;
                font-size: px2rem(12px);
            }

            .recommends {
                margin-top: px2rem(10px);

                .title {
                    font-size: px2rem(16px);
                    font-weight: bold;
                }

                .body {
                    height: px2rem(100px);
                    padding: px2rem(5px) 0;
                    display: -webkit-box;
                    overflow-x: scroll;
                    -webkit-overflow-scrolling: touch;

                    .item {
                        position: relative;
                        width: px2rem(150px);
                        height: 100%;
                        border: px2rem(1px) solid #CCC;
                        border-radius: px2rem(4px);
                        margin-right: px2rem(10px);
                        background-repeat: repeat;
                        background-position: center;
                        background-size: cover;

                        .info {
                            position: absolute;
                            bottom: 0;
                            width: 100%;
                            height: px2rem(25px);
                            color: $white;
                            font-size: px2rem(14px);
                            line-height: px2rem(25px);
                            background: #414141AD;

                            .name {
                                display: inline-block;
                                margin-left: px2rem(5px);
                                max-width: px2rem(100px);
                            }

                            .price {
                                display: inline-block;
                                position: absolute;
                                right: px2rem(5px);
                                color: $red2;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
