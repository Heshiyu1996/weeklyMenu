<template>
    <div>
        <div class="reply">
            s
        </div>
    </div>
</template>

<script>
import { prefix } from '@/publicAPI/config'

export default {
    name: 'Analysis',
    data () {
        return {
        }
    },
    computed: {
        userInfo () {
            return this.$store.getters.getUserInfo
        }
    },

    methods: {
    },
    
    mounted () {
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../../common.css";

.reply {
    position: absolute;
    width: 100%;
    background: $gray1;
}
</style>
