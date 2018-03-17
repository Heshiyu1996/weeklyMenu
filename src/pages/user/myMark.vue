<template>
    <div>
        <mHeader2 title="我的收藏"></mHeader2>
        <div class="myMark">
            <FoodCard type="markCard" :commonType="true" @removeMark="updateList" size="normal" :showStar="true" :foodInfo="item" v-for="(item, idx) in foods" :key="idx"></FoodCard>
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
            foods: [],
            removingId: ''
        }
    },

    methods: {
        updateList (id) {
            this.removingId = id
            this.foods.forEach((elem, idx) => {
                if (elem.foodId === id) {
                    this.foods.splice(idx, 1)
                }
            })
        },

        getMyMarksList () {
            this.$axios.get(`${prefix}/food/getMyMarksList`)
            .then((res) => {
                if (res.data.success) {
                    this.foods = [...res.data.relatedObject]
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    },
    mounted () {
        this.getMyMarksList()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../../common.css";

.myMark {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 px2rem(10px);
    margin-bottom: px2rem(50px);
    background: $white;
}
</style>
