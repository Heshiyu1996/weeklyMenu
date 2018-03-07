<template>
    <div>
        <mHeader2 title="我的收藏"></mHeader2>
        <div class="myMark">
            <FoodCard @removeMark="updateList" size="normal" :showStar="true" :foodInfo="item" v-for="(item, idx) in foods" :key="idx"></FoodCard>
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
                    console.log('删了一个id为' + id)
                    console.log(this.foods)
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
@import "../common.css";

.myMark {
    position: relative;
    width: 100%;
    height: 100%;
    background: $gray1;
}
</style>
