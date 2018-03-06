<template>
  <div id="app">
    <!-- <mHeader></mHeader> -->
    <router-view/>
  </div>
</template>

<script>
// import mHeader from './components/Public/mHeader'
// import mFooter from './components/Public/mFooter'

export default {
    name: 'app',
    // components: {
    //     mHeader
    //     // mFooter
    // },
    mounted () {
        var el = document.createElement('div')
        document.body.appendChild(el)
        this.$eruda.init({
            container: el
        })
    },
    methods: {
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
#app {
    color: #3893E5;
}
</style>
