<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" v-if="seller.data" :src='seller.data.avatar' track-by="$index">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span v-if="seller.data" class="name">{{seller.data.name}}</span>
        </div>
        <div class="description">
          {{seller.data.description}}/{{seller.data.deliveryTime}}送达
        </div>
        <div v-if="seller.data.supports" class="support">
          <span class="icon" :class="classMap[seller.data.supports[0].type]"></span>
          <span class="text">{{seller.data.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.data.supports" class="support-counts" @click="showDetail">
        <span class="count">{{seller.data.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.data.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.data.avatar">
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.data.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.data.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.data.supports" class="supports">
            <li class="support-item" v-for="item in seller.data.supports">
              <span class="icon" :class="classMap[seller.data.supports[$index].type]"></span>
              <span class="content">{{seller.data.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.data.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="closeDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  export default {
    props: {
      seller: {            // App.vue中的data数据传递到这里，App.vue是header.vue的父组件
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      closeDetail () {
        this.detailShow = false;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .header
    background: rgba(7,17,27,0.5)
    color: #fff
    overflow: hidden   // 隐藏溢出边框的部分
    position: relative
    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size: 0
      position: relative
      .avatar
        display: inline-block
        vertical-align: top
        .img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          padding: 2px 0 8px 0

          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px // 这里是设定图片区域的宽高
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          // 这里是设定图片本身的宽高
          .name
            margin-left: 6px
            display: inline-block
            font-size: 16px
            line-height: 18px
            font-weight: blod
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          font-size: 0
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
        .text
          line-height: 12px
          font-size: 10px
          font-weight: 200
      .support-counts
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          margin-right: 2px
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 24px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        font-size: 10px
        font-weight: 200
        font-height: 28px
        margin: 0 4px
        vertical-align: top
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1            // 这里应该是个悬浮透明之类
      filter: blur(10px)     // 增强图片的模糊度
    .detail
      position: fixed
      z-index: 100
      width: 100%
      height: 100%
      top: 0
      left: 0
      overflow: auto
      backdrop-filter: blur(10px)
      transition: all 1s                 // CSS设置动画效果
      &.fade-transition
        opacity: 1                       // 透明度为1
        background: rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 128px
          .name
            font-size: 16px
            font-weight: 700
            line-height: 16px
            text-align: center
            color: rgb(255, 255, 255)
          .star-wrapper
            margin-top: 16px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
            .icon
              display: inline-block
              height: 16px
              width: 16px
              vertical-align: top
              margin-right: 6px
              background-size: 16px
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
            .content
              font-size: 12px
              font-weight: 200
              color: rgb(255, 255, 255)
              line-height: 16px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              font-size: 12px
              font-weight: 200
              color: rgb(255, 255, 255)
              line-height: 24px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
