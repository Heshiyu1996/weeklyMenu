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
            <div class="item image">
                <span class="label">图片</span>
                <img :src="imgTemp" class="avatar-uploader" @click="openUploadBox()"/>
                <input ref="fileInput" @change="changeFileBox()" v-show="false" type="file" name="fileToUpload" id="fileToUpload" />
                
                <input ref="uploadBtn" v-show="false" type="button" @click="uploadFile()" value="Upload" />
            </div>
        </div>
        <div class="btn-wrapper">
            <div ref="btn" class="btn" :class="{ noInput: ((foodInfo.name.length === 0) || (foodInfo.material.length === 0) || (foodInfo.description.length === 0) || (foodInfo.categoryId.length === 0)) }" @click="submit()">添加</div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'

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
            imgTemp: prefix + '/img/default.png'
        }
    },
    methods: {
        openUploadBox () {
            this.$refs.fileInput.click()
        },

        changeFileBox () {
            console.log(document.getElementById('fileToUpload').files)
            if (document.getElementById('fileToUpload').files.length !== 0) {
                this.$refs.uploadBtn.click()
            } else {
                this.imgTemp = ''
            }
        },

        uploadFile () {
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            var fd = new FormData()
            fd.append('imageFile', document.getElementById('fileToUpload').files[0])

            this.$axios.post(`${prefix}/admin/uploadFile`, fd, config)
                .then((res) => {
                    if (res.data.success) {
                            this.imgTemp = prefix + '/img/image.jpg?radom' + Math.random()
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },

        removeDomain (item) {
            var index = this.foodInfo.plans.indexOf(item)
            if (index !== -1) {
                this.foodInfo.plans.splice(index, 1)
            }
        },

        addDomain () {
            this.foodInfo.plans.push({
                dayId: '',
                pids: [],
                key: Date.now()
            })
        },

        handleAvatarSuccess (res, file) {
            this.foodInfo.imgUrl = 'http://p5cuf4ihy.bkt.clouddn.com/' + res.key
            console.log(res)
        },

        handleError (res) {
            console.log(res)
        },

        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },

        getAllCategories () {
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
            if (!this.imgTemp.includes('default')) {
                this.foodInfo.imgUrl = this.imgTemp
            } else {
                this.foodInfo.imgUrl = ''
            }
            let plansStrArr = []
            this.foodInfo.plans.forEach((plan) => {
                let str = plan.dayId
                plan.pids.forEach((pid) => {
                    str += '-' + pid
                })
                plansStrArr.push(str)
            })
            var querystring = require('querystring')
            this.$axios.post(`${prefix}/admin/insertFood`,
                querystring.stringify({
                    name: this.foodInfo.name,
                    imgUrl: this.foodInfo.imgUrl,
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
                border: 2px dashed $blue;
                border-radius: px2rem(3px);
                padding: px2rem(5px);
                display: inline-block;
                width: px2rem(225px);
                height: px2rem(150px);
                margin: px2rem(10px) 0 px2rem(10px);
                vertical-align: middle;
            }

            &.image {
                height: px2rem(172px);
                padding-bottom: 0;
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
