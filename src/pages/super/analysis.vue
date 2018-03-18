<template>
    <div>
        <div class="analysis">
            <schart
                class="prov"
                :canvasId="canvasId"
                :type="type"
                :width="width"
                :height="height"
                :data="provData"
                :options="options"
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
                    this.provData = [...res.data.relatedObject]
                    let obj = {
                        name: '其他',
                        value: 0
                    }
                    for (let i=this.provData.length / 2; i<this.provData.length; i++) {
                        obj.value += this.provData[i].value
                    }
                    let middle = this.provData.length / 2
                    this.provData = this.provData.slice(0, middle)
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
