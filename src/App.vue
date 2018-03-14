<template>
  <div id="app">
    <transition name="el-fade-in-linear">
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </transition>
    <transition name="el-fade-in-linear">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
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
    position: relative;
    height: 100%;
    color: #3893E5;
}
</style>
