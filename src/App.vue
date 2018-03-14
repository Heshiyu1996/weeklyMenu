<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
    name: 'app',

    mounted () {
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
