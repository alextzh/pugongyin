<template>
  <div class="sorting">
    <home-title :content="title"></home-title>
    <div class="goods">
      <ul v-if="items.length > 0">
        <li class="item" v-for="item in items" :key="item.goodsId" @click="toDetail(item.goodsId)">
          <div class="media">
            <img :src="item.minImageUrl" alt="">
          </div>
          <p class="title">{{item.goodsName}}</p>
          <p class="doo">
            <span>{{item.goodsPrice}}</span>
            DOO
          </p>
          <p class="price">￥ {{item.goodsPrice}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HomeTitle from 'base/Home/HomeTitle'

export default {
  name: 'Sorting',
  components: {
    HomeTitle
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    toDetail(id) {
      this.$emit('toDetail', id)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.sorting
  padding: 0 0.24rem
  .goods
    padding: 0.28rem 0
    ul
      width: 100%
      display: flex
      justify-content: space-between
      flex-wrap: wrap
    .item
      width: 33.33%;
      padding: 0 0.08rem;
      box-sizing: border-box;
      margin-bottom: 0.26rem
      &:nth-child(3n+1)
        padding-left: 0
      &:nth-child(3n)
        padding-right: 0
      .media
        height: 2rem
        width: 100%
        box-shadow: 0 0 10px rgba(0,0,0,.09)
        border-radius: 5px;
        display: flex
        align-items: center
        justify-content: center
        overflow: hidden
        img 
          height: 2rem
          border: none 
          display: block
      .title
        padding-top: 0.2rem
        font-size: 0.26rem
        color: #444444
        text-align: center
      .doo
        padding-top: 0.1rem
        font-size: 0.24rem
        color: #6e6e6e
        text-align: center
        span 
          color: $color-theme
      .price
        padding-top: 0.1rem
        font-size: 0.2rem
        color: #db2048
        text-align: center
</style>
