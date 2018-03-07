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
                <el-select v-model="foodInfo.categoryId" slot="prepend" placeholder="请选择">
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
                        <img v-if="foodInfo.imgUrl" :src="foodInfo.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
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
                categoryId: ''
            },
            categories: []
        }
    },
    methods: {
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

        toLogin (ev) {
            // if (ev.target.classList.contains('noInput')) return false
            // this.$refs.btn.innerText = '登录中...'
            // this.$refs.btn.style.backgroundColor = '#4FA34B'
            // setTimeout(() => {
            //     this.login()
            // }, 100)
        },

        submit () {
            var querystring = require('querystring')
            let that = this
            this.$axios.post(`${prefix}/admin/insertFood`,
                querystring.stringify({
                    name: this.foodInfo.name,
                    // imgUrl: this.foodInfo.imgUrl,
                    imgUrl: "www.baidu.com",
                    material: this.foodInfo.material,
                    description: this.foodInfo.description,
                    categoryId: this.foodInfo.categoryId

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
