<template>
    <div class="editFood">
        <div class="items-wrapper">
            <div class="item">
                <span class="label">菜品名</span>
                <input type="text" v-model="foodInfo.name" class="inputBox" placeholder="请输入菜品名"/>
            </div>
            <div class="item">
                <span class="label">食材</span>
                <input type="text" v-model="foodInfo.material" class="inputBox" placeholder="请输入原料（用“、”隔开）"/>
            </div>
            <div class="item">
                <span class="label">简介</span>
                <input type="text" v-model="foodInfo.description" class="inputBox" placeholder="请输入菜品简介"/>
            </div>
            <div class="item">
                <span class="label">菜品分类</span>
                <!-- <input type="text" v-model="categoryId" class="inputBox" placeholder="请选择菜品分类"/> -->
                <el-select v-model="foodInfo.categoryId" slot="prepend" placeholder="请选择" size="mini">
                    <el-option v-for="(item, idx) in categories" :key="idx" :label="item.cname" :value="item.cid"></el-option>
                </el-select>
            </div>
            <div class="item"
                v-for="(period, index) in foodInfo.plans"
                :label="'供餐时段' + index"
                :key="period.key"
            >
                <span class="label">供应时段{{ index+1 }}</span>
                <el-select v-model="period.dayId" slot="prepend" placeholder="请选择" size="mini">
                    <el-option v-for="(day, idx) in days" :key="idx" :label="day.txt" :value="day.dayId"></el-option>
                </el-select>
                <el-checkbox-group v-model="period.pids" size="mini">
                    <!-- <el-checkbox-button label="早餐" name="type"></el-checkbox-button>
                    <el-checkbox-button label="午餐" name="type"></el-checkbox-button>
                    <el-checkbox-button label="晚餐" name="type"></el-checkbox-button> -->
                    <el-checkbox-button v-for="period in periods" :label="period.pid" :key="period.txt">{{period.txt}}</el-checkbox-button>
                </el-checkbox-group>
                <i v-if="index === 0" class="add-btn el-icon-circle-plus-outline" @click.prevent="addDomain"></i>
                <i v-else class="delete-btn el-icon-circle-close-outline" @click.prevent="removeDomain(period)"></i>
            </div>
            <!-- <div class="item image">
                <span class="label">图片</span>
                <el-upload
                    class="avatar-uploader"
                    action="http://up-z2.qiniup.com"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleError"
                    :before-upload="beforeAvatarUpload"
                    :data="postData">
                        <img v-if="foodInfo.imgUrl" :src="foodInfo.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div> -->
        </div>
        <div class="btn-wrapper">
            <div ref="btn" class="btn" :class="{ noInput: ((foodInfo.name.length === 0) || (foodInfo.material.length === 0) || (foodInfo.description.length === 0) || (foodInfo.categoryId.length === 0)) }" @click="submit()">添加</div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import { getUserInfo } from '@/publicAPI/util'

export default {
    name: 'editFood',
    data () {
        return {
            foodInfo: {
                name: '',
                material: '',
                description: '',
                imgUrl: '',
                categoryId: '',
                plans: [{
                    dayId: '',
                    pids: []
                }]
            },
            periods: [{
                pid: 1,
                txt: '早'
            }, {
                pid: 2,
                txt: '午'
            }, {
                pid: 3,
                txt: '晚'
            }],
            days: [{
                dayId: 1, 
                txt: '周一'
            }, {
                dayId: 2, 
                txt: '周二'
            }, {
                dayId: 3, 
                txt: '周三'
            }, {
                dayId: 4, 
                txt: '周四'
            }, {
                dayId: 5, 
                txt: '周五'
            }, {
                dayId: 6, 
                txt: '周六'
            }, {
                dayId: 7, 
                txt: '周日'
            }],
            categories: [],
            postData: {
                token: 'ANPdNJ3TJ0L5ZmI1ht91Pr1D1yAhbLM6DdrRs_If:7TnjVhycrXTu0kr7csnDhjKKYSo=:eyJzY29wZSI6IndlZWtseW1lbnUiLCJkZWFkbGluZSI6MTUyMDY5NTM4Mn0='
            }
        }
    },
    methods: {
        removeDomain(item) {
        var index = this.foodInfo.plans.indexOf(item)
            if (index !== -1) {
                this.foodInfo.plans.splice(index, 1)
            }
        },

        addDomain() {
            this.foodInfo.plans.push({
                dayId: '',
                pids: [],
                key: Date.now()
            });
        },

        handleAvatarSuccess(res, file) {
            this.foodInfo.imgUrl = 'http://p5cuf4ihy.bkt.clouddn.com/'+ res.key
            console.log(res)
        },

        handleError(res) {   //显示错误
        console.log(res)
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        getAllCategories () {
            let that = this
            this.$axios.get(`${prefix}/food/getAllCategories`)
            .then((res) => {
                if (res.data.success) {
                    this.categories = [...res.data.relatedObject]
                }
            })
            .catch((err) => {
                alert(err)
            })
        },

        toLogin (ev) {
            // if (ev.target.classList.contains('noInput')) return false
            // this.$refs.btn.innerText = '登录中...'
            // this.$refs.btn.style.backgroundColor = '#4FA34B'
            // setTimeout(() => {
            //     this.login()
            // }, 100)
        },

        submit () {
            let plansStrArr = []
            this.foodInfo.plans.forEach((plan) => {
                let str = plan.dayId
                plan.pids.forEach((pid) => {
                    str += '-' + pid
                })
                plansStrArr.push(str)
            })
            var querystring = require('querystring')
            let that = this
            this.$axios.post(`${prefix}/admin/insertFood`,
                querystring.stringify({
                    name: this.foodInfo.name,
                    // imgUrl: this.foodInfo.imgUrl,
                    imgUrl: '',
                    material: this.foodInfo.material,
                    description: this.foodInfo.description,
                    categoryId: this.foodInfo.categoryId,
                    plans: plansStrArr
                }))
                .then((res) => {
                    if (res.data.success) {
                        this.$alert('添加成功!', '温馨提示', {
                            confirmButtonText: '好的',
                            callback: () => {
                                this.$router.push('/super')
                            }
                        })
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
        this.getAllCategories()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../../common.css";

.editFood {
    height: px2rem(330px);

    .items-wrapper {
        .item {
            height: px2rem(50px);
            padding: 0 px2rem(15px) px2rem(9px);
            border-bottom: 1px solid $gray3;

            .label {
                display: inline-block;
                width: px2rem(75px);
                height: 100%;
                padding-top: px2rem(14px);
                color: $gray2;
            }

            .inputBox {
                width: px2rem(250px);
                height: 100%;
                margin-top: px2rem(-5px);
                border: 0 solid $white;
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

            .avatar-uploader {
                border: 1px dashed #D9D9D9;
                display: inline-block;
                width: px2rem(100px);
                height: px2rem(65px);
                margin-top: px2rem(2px);
                vertical-align: middle;

                .el-upload {
                    width: 100%;
                    height: 100%;
                    border: 1px dashed #D9D9D9;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }

                .el-upload:hover {
                    border-color: #409EFF;
                }

                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }

                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }
            }

            &.image {
                height: px2rem(70px);
            }

            .el-checkbox-group {
                display: inline-block;
                margin-left: px2rem(8px);
                vertical-align: super;

                .el-checkbox-button {
                    .el-checkbox-button__inner {
                        padding: px2rem(7px) px2rem(12px);
                    }
                }
            }

            .el-select {
                width: px2rem(82px);
            }

            .add-btn, .delete-btn {
                margin-left: px2rem(8px);
            }

            .delete-btn {
                color: $red;
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
