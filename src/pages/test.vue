<template>
    <div class="test">
        <FoodCard></FoodCard>
    </div>
</template>

<script>
import FoodCard from '@/components/foodCard'
export default {
    name: 'test',
    components: {
        FoodCard
    },

    data () {
        return {
        }
    },

    methods: {
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.test {
    position: absolute;
    height: 100%;
    width: 100%;
    background: red;
}

</style>