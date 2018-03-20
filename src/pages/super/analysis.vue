<template>
    <div>
        <div class="analysis">
            <schart
                class="prov"
                :canvasId="provInfo.canvasId"
                :type="provInfo.type"
                :width="provInfo.width"
                :height="provInfo.height"
                :data="provInfo.provData"
                :options="provInfo.options"
            ></schart>
            <schart
                class="prov"
                :canvasId="tasteInfo.canvasId"
                :type="tasteInfo.type"
                :width="tasteInfo.width"
                :height="tasteInfo.height"
                :data="tasteInfo.tasteData"
                :options="tasteInfo.options"
            ></schart>
            <schart
                class="prov"
                :canvasId="prepareInfo.canvasId"
                :type="prepareInfo.type"
                :width="prepareInfo.width"
                :height="prepareInfo.height"
                :data="prepareInfo.prepareData"
                :options="prepareInfo.options"
            ></schart>
            <schart
                class="prov"
                :canvasId="habitInfo.canvasId"
                :type="habitInfo.type"
                :width="habitInfo.width"
                :height="habitInfo.height"
                :data="habitInfo.habitData"
                :options="habitInfo.options"
            ></schart>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import Schart from 'vue-schart';

export default {
    name: 'Analysis',
    data () {
        return {
            provInfo: {
                canvasId: 'prov',
                type: 'bar',
                width: 375,
                height: 300,
                provData: [],
                options: {
                    padding: 30,
                    title: '员工的来源分布',
                    titlePosition: 'bottom'
                }
            },
            tasteInfo: {
                canvasId: 'taste',
                type: 'pie',
                width: 375,
                height: 300,
                tasteData: [],
                options: {
                    padding: 30,
                    title: '员工的口味',
                    titlePosition: 'bottom'
                }
            },
            prepareInfo: {
                canvasId: 'prepare',
                type: 'ring',
                width: 375,
                height: 300,
                prepareData: [],
                options: {
                    padding: 30,
                    title: '员工的倾向',
                    titlePosition: 'bottom'
                }
            },
            habitInfo: {
                canvasId: 'habit',
                type: 'ring',
                width: 375,
                height: 300,
                habitData: [],
                options: {
                    padding: 30,
                    title: '员工的饮食习惯',
                    titlePosition: 'bottom'
                }
            }
        }
    },

    components:{
        Schart
    },

    computed: {
        userInfo () {
            return this.$store.getters.getUserInfo
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

        getAnalysisByProvince () {
            let that = this
            this.$axios.get(`${prefix}/admin/getAnalysisByProvince`)
            .then((res) => {
                if (res.data.success) {
                    this.provInfo.provData = [...res.data.relatedObject]
                    let obj = {
                        name: '其他',
                        value: 0
                    }
                    for (let i=this.provInfo.provData.length / 2; i<this.provInfo.provData.length; i++) {
                        obj.value += this.provInfo.provData[i].value
                    }
                    let middle = this.provInfo.provData.length / 2
                    this.provInfo.provData = this.provInfo.provData.slice(0, middle)

                    this.getAnalysisByTaste()
                }
            })
            .catch((err) => {
                alert(err)
            })
        },

        

        getAnalysisByTaste () {
            let that = this
            this.$axios.get(`${prefix}/admin/getAnalysisByTaste`)
            .then((res) => {
                if (res.data.success) {
                    this.tasteInfo.tasteData = [...res.data.relatedObject]
                    this.getAnalysisByPrepare()
                }
            })
            .catch((err) => {
                alert(err)
            })
        },
        getAnalysisByPrepare () {
            let that = this
            this.$axios.get(`${prefix}/admin/getAnalysisByPrepare`)
            .then((res) => {
                if (res.data.success) {
                    this.prepareInfo.prepareData = [...res.data.relatedObject]
                    this.getAnalysisByHabit()
                }
            })
            .catch((err) => {
                alert(err)
            })
        },

        getAnalysisByHabit () {
            let that = this
            this.$axios.get(`${prefix}/admin/getAnalysisByHabits`)
            .then((res) => {
                if (res.data.success) {
                    this.habitInfo.habitData = [...res.data.relatedObject]
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    },

    mounted () {
        this.getAnalysisByProvince()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../../common.css";

.analysis {
    position: absolute;
    width: 100%;
    background: $gray1;

    .prov {
        width: px2rem(340px);
        height: px2rem(290px);
        margin: 0 auto;
        padding: px2rem(10px) 0;
        text-align: center;

        #prov {
            width: 100% !important;
        }
    }
}
</style>
