<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods.data" class="menu-item"
            :class="{'current':currentIndex===$index}" @click="selectMenu($index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods.data" class="food-list foods-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <span v-if="food.description" class="description">{{food.description}}</span>
                <div class="extra">
                  <span class="extra-count">月售{{food.sellCount}}份</span><span class="extra-rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :seller="seller.data" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <!-- 这里的 delivery-price 是固定写法，遇到变量是驼峰写法时，传递数据一定要换成这种写法 -->
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';

  const ERR_NO = 0;
  export default {
    props: {
      seller: {
        type: Object
      },
      goods: {
        type: Object
      }
    },
    data () {
      return {              // 每次有更新这里的数据都会重新初始化
        goots: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('/api/goods').then(response => {
        response = response.body;
        if (response.errno === ERR_NO) {
          this.goods = response;
          this.$nextTick(() => {    // $nextTick函数意为拿到数据后DOM更新
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$els.foodsWrapper.getElementsByClassName('foods-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          probeType: 3 // 在Scroll滚动时实时获取位置信息
        });
        this.foodsScroll.on('scoll', (pos) => {    // 监听scroll事件，回调函数的参数是位置信息
          this.scrollY = Math.abs(Math.round(pos.y));  // 取Y轴，这样在Scroll滚动时可以实时拿到scrollY
        });
      },
      _calculateHeight () {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('foods-list-hook');
          // 这里的 foodList 是标题并包括下面的小食品item的数组
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;  // 把标题并包括下面的小食品item的每个小区块元素的高度相加
          this.listHeight.push(height);    // 这里的height就是要实现效果区块的总高度
        }
      }
    },
    components: {
      shopcart
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        vertical-align: center
        font-size: 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          text-align: center
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f4f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 14px
          .description, .extra
            margin-top: 8px
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
          .extra
            .extra-count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .new
              font-size: 14px
              margin-right: 8px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
</style>
