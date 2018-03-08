<template>
    <div class="editFood">
        <div class="items-wrapper">
            <div class="item">
                <span class="label">菜品id</span>
                <input type="text" v-model="foodInfoCopy.foodId" disabled class="inputBox id" placeholder="请选取菜品id"/>
                <span class="search-btn el-icon-search" @click="goToSearch()"></span>
            </div>
            <div class="item">
                <span class="label">菜品名</span>
                <input type="text" v-model="foodInfoCopy.name" class="inputBox" placeholder="请输入菜品名"/>
            </div>
            <div class="item">
                <span class="label">食材</span>
                <input type="text" v-model="foodInfoCopy.material" class="inputBox" placeholder="请输入原料（用“、”隔开）"/>
            </div>
            <div class="item">
                <span class="label">简介</span>
                <input type="text" v-model="foodInfoCopy.description" class="inputBox" placeholder="请输入菜品简介"/>
            </div>
            <div class="item">
                <span class="label">菜品分类</span>
                <!-- <input type="text" v-model="categoryId" class="inputBox" placeholder="请选择菜品分类"/> -->
                <el-select v-model="foodInfoCopy.categoryId" slot="prepend" placeholder="请选择">
                    <el-option v-for="(item, idx) in categories" :key="idx" :label="item.cname" :value="item.cid"></el-option>
                </el-select>
            </div>
            <div class="item image">
                <span class="label">图片</span>
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="foodInfoCopy.imgUrl" :src="foodInfoCopy.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>
        <div class="btn-wrapper">
            <div ref="btn" class="btn" :class="{ noInput: ((foodInfoCopy.foodId.length === 0) || (foodInfoCopy.name.length === 0) || (foodInfoCopy.material.length === 0) || (foodInfoCopy.description.length === 0) || (foodInfoCopy.categoryId.length === 0)) }" @click="beforeSubmit()">修改</div>
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
            foodInfoCopy: {
                foodId: '',
                name: '',
                material: '',
                description: '',
                imgUrl: '',
                categoryId: ''
            },
            categories: []
        }
    },
    computed: {
        foodInfo () {
            return this.$store.getters.getFoodInfo
        }
    },
    methods: {
        goToSearch () {
            this.$router.push('/super/foodSearch')
        },

        handleAvatarSuccess(res, file) {
            this.foodInfo.imgUrl = URL.createObjectURL(file.raw);
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

        beforeSubmit () {
            this.$confirm('确认修改此菜品吗?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.submit()
            }).catch(() => {
                console.log('取消本次修改')
            })
        },

        submit () {
            var querystring = require('querystring')
            let that = this
            this.$axios.post(`${prefix}/admin/updateFood`,
                querystring.stringify({
                    foodId: this.foodInfoCopy.foodId,
                    name: this.foodInfoCopy.name,
                    // imgUrl: this.foodInfoCopy.imgUrl,
                    imgUrl: "www.baidu.com",
                    material: this.foodInfoCopy.material,
                    description: this.foodInfoCopy.description,
                    categoryId: this.foodInfoCopy.categoryId

                }))
                .then((res) => {
                    if (res.data.success) {
                        this.$alert('修改成功!', '温馨提示', {
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
        Object.assign(this.foodInfoCopy, this.foodInfo)
        this.$store.commit('setFoodInfo', {})
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
            padding: 0 px2rem(20px) px2rem(9px);
            border-bottom: 1px solid $gray3;

            .label {
                display: inline-block;
                width: px2rem(70px);
                height: 100%;
                padding-top: px2rem(14px);
                color: $gray2;
            }

            .inputBox {
                width: px2rem(250px);
                height: 100%;
                margin-top: px2rem(-5px);
                border: 0 solid $white;

                &.id {
                    width: px2rem(100px);
                    background: $white;
                }
            }

            .search-btn {
                font-size: px2rem(24px);
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
                    color: #8C939D;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }

                .avatar {
                    display: block;
                    height: 100%;
                    width: 100%;
                }
            }

            &.image {
                height: px2rem(70px);
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
