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
                <span class="label">价格</span>
                <input type="text" v-model="foodInfoCopy.price" class="inputBox price" placeholder="请输入价格"/> 元
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
                <img :src="foodInfoCopy.imgUrl" class="avatar-uploader" @click="openUploadBox()"/>
                <input ref="fileInput" @change="changeFileBox()" v-show="false" type="file" name="fileToUpload" id="fileToUpload" />
                
                <input ref="uploadBtn" v-show="false" type="button" @click="uploadFile()" value="Upload" />
            </div>
        </div>
        <div class="btn-wrapper">
            <div ref="btn" class="btn" :class="{ noInput: ((foodInfoCopy.foodId.length === 0) || (foodInfoCopy.name.length === 0) || (foodInfoCopy.material.length === 0) || (foodInfoCopy.description.length === 0) || (foodInfoCopy.categoryId.length === 0)) }" @click="beforeSubmit()">修改</div>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'

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
                categoryId: '',
                price: 0
            },
            categories: [],
            default_imageUrl: '/img/default.png'
        }
    },
    computed: {
        foodInfo () {
            return this.$store.getters.getFoodInfo
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
                this.$set(this.foodInfoCopy, 'imgUrl' , '')
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
                            this.$set(this.foodInfoCopy,'imgUrl' ,prefix + '/img/image.jpg?radom' + Math.random())
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },

        goToSearch () {
            this.$router.push('/super/foodSearch')
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

        beforeSubmit () {
            let that = this
            this.$confirm('确认修改此菜品吗?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.editFoodInfo()
            }).catch(() => {
                console.log('取消本次修改')
            })
        },

        editFoodInfo () {
            this.$axios.post(`${prefix}/admin/updateFood`,{
                    foodId: this.foodInfoCopy.foodId,
                    name: this.foodInfoCopy.name,
                    imgUrl: this.foodInfoCopy.imgUrl,
                    material: this.foodInfoCopy.material,
                    description: this.foodInfoCopy.description,
                    categoryId: this.foodInfoCopy.categoryId,
                    price: this.foodInfoCopy.price
                })
                .then((res) => {
                    if (res.data.success) {
                        this.$alert('编辑成功!', '温馨提示', {
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
        if (this.foodInfo.imgUrl === null || this.foodInfo.imgUrl === '' || typeof this.foodInfo.imgUrl === 'undefined') {
            this.$set(this.foodInfoCopy, 'imgUrl', prefix + this.default_imageUrl)
        } else {
            this.$set(this.foodInfoCopy, 'imgUrl', prefix + this.foodInfo.imgUrl)
        }
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

                &.price {
                    width: px2rem(50px);
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
        }
    }

    .btn-wrapper {
        margin-top: px2rem(20px);
        
        .btn {
            margin: 0 auto;
            width: px2rem(300px);
            height: px2rem(45px);
            line-height: px2rem(45px);
            letter-spacing: px2rem(4px);
            border-radius: 25px;
            background: $blue;
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
