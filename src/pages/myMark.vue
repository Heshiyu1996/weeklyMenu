<template>
    <div>
        <mHeader2 title="我的收藏"></mHeader2>
        <div class="myMark">
            <FoodCard size="normal" :showStar="true" :foodInfo="item" v-for="(item, idx) in foods" :key="idx"></FoodCard>
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'
import mHeader2 from '@/components/Public/mHeader2'
import FoodCard from '@/components/foodCard'

export default {
    name: 'myMark',
    components: {
        mHeader2,
        FoodCard
    },
    data () {
        return {
            foods: []
        }
    },

    methods: {
        getData () {
            this.$axios.get(`${prefix}/food/getFoodsByKeyword?keyword=米`)
            .then((res) => {
                if (res.data.success) {
                    this.foods = [...res.data.relatedObject.myList]
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    },
    mounted () {
        this.getData()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../common.css";

.myMark {
    position: relative;
    width: 100%;
    height: 100%;
    background: $gray1;
}
</style>
