<template>
  <div>
    <div class="u-type">
      <div class="u-type-title">热门分类</div>
      <div class="u-type-list">
        <div class="u-type-item" v-for="item in items">
          {{ item }}
        </div>
      </div>
      <div class="u-type-title">菜式</div>
      <div class="u-type-list">
        <div class="u-type-item" v-for="item in items">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
    name: 'test',
    data () {
        return {
            items: ['家常菜', '下饭菜', '烘培', '肉类', '早餐', '蔬菜', '汤粥主食', '松下厨房']
        }
    },
    methods: {
        say () {
            console.log('')
        }
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.u-type {
    padding: 0 px2rem(12px);

    .u-type-title {
        padding-top: px2rem(35px);
    }

    .u-type-list {
        padding: px2rem(1px);

        .u-type-item {
            display: inline-block;
            width: (82/375) * 100%;
            height: px2rem(75px);
            margin-left: px2rem(10px);
            margin-top: px2rem(12px);
            background-color: red;
            border-radius: px2rem(4px);

            &:nth-child(4n+1) {
                margin-left: 0;
            }  
        }
    }
}
</style>