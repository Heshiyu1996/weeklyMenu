<template>
    <div>
        <div class="dateTime-bar">
            <div class="title">{{ weekAbbr[dayIndex] }} / {{ dateCode.slice(4, 6) }}-{{ dateCode.slice(6, 8) }} {{ periods[pid-1].time }}</div>
            <div class="desc">{{ periods[pid-1].txt }}</div>
            <div class="back el-icon-arrow-left" @click="goBack()"></div>
        </div>
        <div class="bookDetail">
            <div class="recommends">
                <div class="title">猜你喜欢</div>
                <div class="body">
                    <div class="item"
                    v-for="(item, idx) in foodRecommond"
                    :key="idx"
                    :style="{ backgroundImage: 'url(' + prefix + item.imgUrl + ')'  }"
                    @click="selectCategory2(item.categoryId)"
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
            <div class="main-wrapper">
                <div class="order-wrapper">
                    <div class="food-wrapper">
                        <el-tabs class="food-body" v-model="categoryIndex" tab-position="left" @tab-click="selectCategory">
                            <el-tab-pane :cid="category.cid" :name="category.cid.toString()" v-for="(category, idx) in categories" :key="idx" :label="category.cname">
                                <FoodCard :recentCid="categoryIndex" @emitFromChild="sumTheFoods" type="bookCard" size="normal" :foodInfo="item" v-for="(item, idx) in foods" :key="idx"></FoodCard>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>

        <div class="count-bar">
            <div ref="total" class="total bar">
                <div class="totalCount">总计： ￥ {{ sum }}</div>
            </div>
            <div ref="submit" class="submit bar"
                :class="{notEmpty: Object.keys(bookDetail).length === 0}"
                @click="submit()">
                <div class="btn">提交</div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import mHeader2 from '@/components/Public/mHeader2'
import FoodCard from '@/components/foodCard'

export default {
    name: 'BookDetail',
    components: {
        mHeader2,
        FoodCard
    },
    data () {
        return {
            weekAbbr: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT '],
            days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            prefix: prefix,
            periods: [{
                txt: '早餐',
                time: '7:00'
            }, {
                txt: '午餐',
                time: '11:00'
            }, {
                txt: '晚餐',
                time: '18:00'
            }],
            periodIndex: 1,
            allFoodsList: [],
            categories: [],
            categoryIndex: '',
            foods: [],
            sum: 0,
            bookDetail: {},
            dayIndex: 0,
            dateCode: '',
            pid: 1,
            foodRecommond: [],
            firstEnter: true
        }
    },

    methods: {
        mySort (property) {
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1;
            }
        },

        getFoodRecommondByOrder () {
            this.$axios.get(`${prefix}/order/loadRecommendFoodsByDayPid?day=${this.dayIndex}&pid=${this.pid}`)
            .then((res) => {
                if (res.data.success) {
                    this.foodRecommond = []
                    this.foodRecommond = [...res.data.relatedObject]
                    this.foodRecommond.sort(this.mySort('totalPoint'))
                    this.foodRecommond = this.foodRecommond.slice(0, 8)
                }
            })
            .catch((err) => {
                // alert(err)
            })
        },

        goBack () {
            this.$router.push('/')
        },

        sumTheFoods (id, count, price) {
            this.bookDetail[id] = `${price}-${count}`
            this.sum = 0
            if (count === 0){
                delete this.bookDetail[id]
            }
            for (let i in this.bookDetail) {
                let price = parseInt(this.bookDetail[i].split('-')[0])
                let count = parseInt(this.bookDetail[i].split('-')[1])
                this.sum += price * count
            }
        },

        selectCategory (tab, event) {
            this.categoryIndex = tab.$attrs.cid.toString()
        },

        selectCategory2 (cid) {
            this.categoryIndex = cid.toString()
        },

        getAllFoodsList () {
            this.$axios.get(`${prefix}/plan/getFoodsByDayPid?day=${this.dayIndex}&pid=${this.pid}`)
            .then((res) => {
                if (res.data.success) {
                    this.categories = []
                    this.foods = []
                    this.allFoodsList = [...res.data.relatedObject]
                    this.allFoodsList.forEach((item) => {
                        let obj = {}
                        obj.cid = item.cid
                        obj.cname = item.cname
                        this.categories.push(obj)
                        this.foods.push(...item.foods)
                    })
                    this.categoryIndex = this.categories[0].cid.toString()
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },

        submit () {
            if (Object.keys(this.bookDetail).length === 0) return
            // 提交前，在bookDetail新增dateCode和pid一起带过去给后台
            this.bookDetail.dateCode = this.dateCode
            this.bookDetail.pid = parseInt(this.pid)
            this.bookDetail.totalMoney = parseInt(this.sum)
            this.$axios.post(`${prefix}/order/addOrder`,this.bookDetail)
            .then((res) => {
                if (res.data.success) {
                    this.$alert('您可以在“我的” —— “我的订单” 中查看订单详情，提前祝您用餐愉快！', '订餐成功！', {
                        confirmButtonText: '好的',
                        callback: () => {
                            this.$router.push('/book')
                        }
                    })
                } else {
                    this.$alert('请检查网络配置，或您也可以致电088-68745111 寻找人工服务!', '订餐失败！', {
                        confirmButtonText: '好的',
                        callback: () => {
                            // this.$router.push('/user')
                        }
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },

        initData () {
            console.log(this.$route)
            this.dayIndex = this.$route.params.dayIndex
            this.dateCode = this.$route.params.dateCode
            this.pid = this.$route.params.pid
        }
    },

    activated () {
        if (!this.firstEnter) {
            this.initData()
            this.getAllFoodsList()
            this.getFoodRecommondByOrder()
        }
    },

    mounted () {
        this.firstEnter = false
        this.initData()
        this.getAllFoodsList()
        this.getFoodRecommondByOrder()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.dateTime-bar {
    position: relative;
    height: px2rem(60px);
    background: $blue;
    padding-top: px2rem(10px);

    .back {
        position: absolute;
        top: 50%;
        left: px2rem(15px);
        transform: translateY(-50%);
        color: $white;
    }

    .title {
        display: inline-block;
        width: 100%;
        font-family: "黑体";
        color: $white;
        font-size: px2rem(18px);
        text-align: center;
    }

    .desc {
        display: inline-block;
        width: 100%;
        font-family: "黑体";
        color: $white;
        font-size: px2rem(12px);
        text-align: center;
    }
}

.bookDetail {
    height: 100%;
    padding: 0 0;

    .recommends {
        margin-top: px2rem(5px);

        .title {
            font-size: px2rem(16px);
            font-weight: bold;
            padding-left: px2rem(5px);
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

    .main-wrapper {
        padding: px2rem(10px);

        .order-wrapper {
            position: relative;
            height: px2rem(422px);
            padding: px2rem(5px) px2rem(10px) px2rem(5px);
            margin-bottom: px2rem(50px);
            z-index: 5;
            border: 1px solid $gray;

            .food-wrapper {
                margin-top: px2rem(5px);

                .food-body {
                    height: px2rem(408px);
                }

                .el-tabs {
                    .el-tabs__header {
                        margin-left: 5px;
                    }
                }

                .el-tabs__content {
                    overflow: scroll !important;
                }

                .food {
                    height: px2rem(76px);
                    padding: px2rem(5px) 0;
                    border-bottom: px2rem(1px) solid $gray2;

                    &:last-child {
                        border-bottom: 0 solid $gray2;
                    }

                    .img, .desc {
                        display: inline-block;
                    }

                    .img {
                        width: px2rem(92px);
                        height: 100%;
                    }

                    .desc {
                        width: px2rem(160px);
                        height: 100%;
                        margin-left: px2rem(4px);
                        vertical-align: top;

                        .name {
                            max-width: px2rem(140px);
                            color: $black2;
                            font-size: px2rem(16px);
                        }

                        .material, .hot {
                            max-width: px2rem(140px);
                            margin-top: px2rem(3px);
                            color: $gray2;
                            font-size: px2rem(12px);
                        }
                    }
                }
            }
        }
    }
}

.count-bar {
    display: flex;
    position: fixed;
    background: $blue;
    bottom: 0;
    width: 100%;
    height: px2rem(45px);
    z-index: 999999;
    color: $white;

    .total {
        display: inline-block;
        flex: 2;
        height: px2rem(45px);
        text-align: left;
        background: $blue2;
        padding: 0 px2rem(10px);
        line-height: px2rem(45px);
        font-size: px2rem(16px);
        transition: padding .5s, background .5s;

        .totalCount {
            position: relative;
            height: 100%;
            font-size: px2rem(20px);
        }
    }

    .submit {
        display: inline-block;
        flex: 1;
        height: px2rem(45px);
        line-height: px2rem(45px);
        text-align: center;
        background: $blue;
        font-size: px2rem(16px);
        font-family: "黑体";
        transition: background .3s;

        .btn {
            color: $white;
        }

        &.notEmpty {
            background: gray;
            transition: background .3s;
        }
    }
}

</style>
