<template>
  <div id="app">
    <keepAlive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keepAlive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {

    name: 'app',

    methods: {
    },

    watch: {
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "./common.css";

#app {
    position: relative;
    height: 100%;
    color: #3893E5;
}
</style>
