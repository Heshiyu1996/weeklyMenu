<template>
    <div>
        <mHeader2 title="我的喜好"></mHeader2>
        <div class="myCharacter">
            <div class="items-wrapper">
                <div class="item">
                    <div class="question">你来自哪个省市？</div>
                    <div class="answer">
                        <el-select v-model="characterInfo.provinceCode" slot="prepend" placeholder="请选择" size="mini">
                            <el-option v-for="(item, idx) in provinces" :key="idx" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                        <el-select v-model="characterInfo.cityCode" slot="prepend" placeholder="请选择" size="mini">
                            <el-option v-for="(item, idx) in cities" :key="idx" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="question">你来自哪个民族？</div>
                    <div class="answer">
                        <el-select v-model="characterInfo.nation" slot="prepend" placeholder="请选择" size="mini">
                            <el-option v-for="(item, idx) in nations" :key="idx" :label="item" :value="item"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="question">你平时喜欢吃辣吗？</div>
                    <div class="answer">
                        <el-radio-group v-model="characterInfo.taste" size="mini">
                            <el-radio-button v-for="(item, idx) in tastes" :label="item" :key="idx">{{item}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="item">
                    <div class="question">你的身高体重是多少？</div>
                    <div class="answer">
                        <input type="text" v-model="characterInfo.tall" class="inputBox mini" placeholder="请输入身高"/>cm
                        <input type="text" v-model="characterInfo.height" class="inputBox mini height" placeholder="请输入体重"/>kg
                    </div>
                </div>
                <div class="item">
                    <div class="question">你的饮食习惯是怎样的？</div>
                    <div class="answer">
                        <el-radio-group v-model="characterInfo.eatHabit" size="mini">
                            <el-radio-button v-for="(item, idx) in habits" :label="item" :key="idx">{{item}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="item">
                    <div class="question">对于平时的饮食你更注重？</div>
                    <div class="answer">
                        <el-radio-group v-model="characterInfo.prepare" size="mini">
                            <el-radio-button v-for="(item, idx) in prepares" :label="item" :key="idx">{{item}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="item">
                    <div class="question">你对酒精过敏吗？</div>
                    <div class="answer">
                        <el-radio-group v-model="characterInfo.alcohol" size="mini">
                            <el-radio-button v-for="(item, idx) in alcohols" :label="idx" :key="idx">{{item}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="item attention">
                    <div class="question">最近的身体状况如何？（非必填）</div>
                    <div class="answer attention">
                        <el-input v-model="characterInfo.attention" type="textarea" :rows="2" placeholder="我们必定严格尊重每一位用户的隐私并保密"></el-input>
                    </div>
                </div>
            </div>
            <div class="btn-wrapper">
                <div ref="btn" class="btn" 
                :class="{ noInput: !isFinished }" @click="updateCharacter()">
                    保存
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mHeader2 from '@/components/Public/mHeader2'
import { prefix } from '@/publicAPI/config'
import { getUserInfo } from '@/publicAPI/util'

export default {
    name: 'myCharacter',
    components: {
        mHeader2
    },
    data () {
        return {
            uid: '',
            provinces: new this.$gb2260.GB2260('201410').provinces(),
            cities: [],
            nations: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",  
               "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",  
               "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",  
              "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"
            ],
            tastes: ['清淡', '麻辣', '油炸', '都可以'],
            habits: ['多肉少菜', '荤素均衡', '素食为主', '都可以'],
            prepares: ['口味', '价格', '营养价值', '都可以'],
            alcohols: ['是', '不是'],
            characterInfo: {
                provinceCode: '',
                province: '',
                cityCode: '',
                city: '',
                nation: '',
                taste: '',
                tall: '',
                height: '',
                eatHabit: '',
                prepare: '',
                alcohol: '',
                attention: ''
            },
            isFinished: false,
            isExistOldData: false
        }
    },

    methods: {
        ifExistCharacter () {
            this.$axios.get(`${prefix}/staff/ifExistCharacter`)
            .then((res) => {
                if (res.data.success) {
                    if (res.data.relatedObject.ifExist) {
                        this.isExistOldData = true
                    }
                    this.getCharacter()
                }
            })
            .catch((err) => {
                alert(err)
            })
        },
        

        getCharacter () {
            this.$axios.get(`${prefix}/staff/getCharacter`)
            .then((res) => {
                if (res.data.success) {
                    Object.assign(this.characterInfo, res.data.relatedObject)
                }
            })
            .catch((err) => {
                alert(err)
            })
        },

        goTo (destination) {
            this.$router.push(`/${destination}`)
        },

        updateCharacter () {
            var querystring = require('querystring')
            if (!this.isFinished) return
            this.$axios.post(`${prefix}/staff/updateCharacter`, 
                querystring.stringify({
                    provinceCode: this.characterInfo.provinceCode,
                    province: this.characterInfo.province,
                    cityCode: this.characterInfo.cityCode,
                    city: this.characterInfo.city,
                    nation: this.characterInfo.nation,
                    taste: this.characterInfo.taste,
                    tall: this.characterInfo.tall,
                    height: this.characterInfo.height,
                    eatHabit: this.characterInfo.eatHabit,
                    prepare: this.characterInfo.prepare,
                    alcohol: this.characterInfo.alcohol,
                    attention: this.characterInfo.attention
            }))
                .then((res) => {
                    if (res.data.success) {
                        this.$alert('保存成功!', '温馨提示', {
                            confirmButtonText: '好的',
                            callback: () => {
                                this.$router.push('/user')
                            }
                        })
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        }
    },

    watch: {
        'characterInfo.provinceCode': function (newVal) {
            this.characterInfo.province = new this.$gb2260.GB2260('201410').get(newVal).name
            
            this.cities = new this.$gb2260.GB2260('201410').prefectures(newVal)
            if (!this.isExistOldData) {
                this.characterInfo.cityCode = ''
                this.characterInfo.city = ''
            }
            this.isExistOldData = false

        },
        'characterInfo.cityCode': function (newVal) {
            if (newVal !== '') {
                this.characterInfo.city = new this.$gb2260.GB2260('201410').get(newVal).name
            }
        },
        characterInfo: {
            handler: function (newVal, oldVal) {
                this.isFinished = true
                for (let idx in newVal) {
                    if (newVal[idx].length === 0 && idx !== 'attention') {
                        this.isFinished = false
                    }
                }
            },
            deep: true
        }
    },

    mounted () {
        this.ifExistCharacter()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.myCharacter {
    height: px2rem(330px);

    .items-wrapper {
        .item {
            height: px2rem(70px);
            padding: 0 px2rem(20px) px2rem(9px);
            border-bottom: 1px solid $gray3;

            .question {
                height: px2rem(30px);
                padding-top: px2rem(5px);
                font-size: px2rem(14px);
                color: $gray2;
            }

            .answer {
                .inputBox {
                    width: px2rem(250px);
                    height: 100%;
                    border: 0 solid $white;

                    &.mini {
                        position: relative;
                        width: px2rem(60px);
                        border-bottom: px2rem(1px) solid $gray5;
                        text-align: center;

                        &.height {
                            margin-left: px2rem(10px);
                        }
                    }
                }

                .el-select {
                    width: px2rem(110px);
                    position: relative;
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
            }

            &.attention {
                height: px2rem(90px);
            }

            &:last-child {
                border-bottom: 0 solid $gray3;
            }
        }
    }

    .btn-wrapper {
        .btn {
            margin: 0 auto;
            width: px2rem(300px);
            height: px2rem(45px);
            line-height: px2rem(45px);
            letter-spacing: px2rem(4px);
            background: $blue;
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
