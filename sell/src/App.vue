<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path: '/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path: '/ratings'}">评价</a>
      </div>
      <div class="tab-item">
        <a v-link="{path: '/seller'}">商家</a>
      </div>
    </div>
    <router-view :seller="seller.data"></router-view>   <!-- 路由改变就会刷新router-view的内容，类似于这部分跳转的别的内容-->
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';

  export default {
    // vuejs中默认定义data函数
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.$http.get('/api/seller').then(response => {
        response = response.body;
        if (response.errno === 0) {
          this.seller = response;
          console.log(this.seller);
        };
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin'
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    flex: 1
    text-align: center
    & > a
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)

      &.active
        color: rgb(240, 20, 20)
</style>
