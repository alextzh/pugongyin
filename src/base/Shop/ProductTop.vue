<template>
  <div class="product-top" v-if="currentProduct">
    <div class="bg-box">
      <img class="image" :src="currentProduct.minImageUrl" alt="">
    </div>
    <div class="info">
      <div class="tit">
        <span class="price">{{currentProduct.goodsPrice}}（DDO）</span>
      </div>
      <p class="con">{{currentProduct.goodsName}}</p>
    </div>
    <div class="check-mes">
      <div class="mes border-top-1px border-bottom-1px">
        <span class="tit">已选</span>
        <div class="con">{{currentProduct.goodsDes}}, 1件</div>
      </div>
    </div>
    <div class="product-desc">
      <div class="title">
        <span class="con">商品介绍</span>
      </div>
      <div class="imgs-box">
        <img :src="currentProduct.imageUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'ProductTop',
  computed: {
    ...mapGetters([
      'currentProduct'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.bg-box
  position: relative;
  left: 0;
  height: 0;
  overflow: hidden;
  padding-bottom: 59.2%;
  z-index: 0;
  .image
    position: absolute
    top: 0
    left: 0
    z-index: 0
    display: flex
    width: 100%
    height: 100%
.info
  padding: 0 0.24rem
  .tit
    padding-top: 0.3rem
    display: flex
    align-items: center
    justify-content: space-between
    .price
      font-size: 0.36rem
      color: $color-theme
  .con
    padding: 0.1rem 0
    line-height: 1.5
    font-size: 0.3rem
    color: #444
.check-mes
  padding-bottom: 0.4rem
  .mes
    display: flex
    align-items: center
    height: 0.8rem
    padding: 0 0.24rem
    box-sizing: border-box
    .tit
      font-size: 0.26rem
      color: #b9b9b9
      padding-right: 0.4rem
    .con
      flex: 1
      font-size: 0.26rem
      color: #444
.product-desc
  padding: 0 0.24rem 0.3rem
  .title
    display: flex
    justify-content: center
    align-items: center;
    padding-bottom: 0.3rem
    .con
      font-size: 0.3rem
      color: #444
      padding: 0 0.3rem
      position: relative
      &::before
        content: ''
        position: absolute
        left: 0
        top: 50%
        margin-top: -0.06rem
        display: flex
        width: 0.12rem
        height: 0.12rem
        border-radius: 50%
        background: $color-theme
        box-shadow: 0 0 5px rgba(27,130,209,.5)
      &::after
        content: ''
        position: absolute
        right: 0
        top: 50%
        margin-top: -0.06rem
        display: flex
        width: 0.12rem
        height: 0.12rem
        border-radius: 50%
        background: $color-theme
        box-shadow: 0 0 5px rgba(27,130,209,.5)
  .imgs-box
    width: 100%
    overflow: hidden
    img
      display: block
      max-width: 100%
      vertical-align: top
      border: 0
      border-radius: 4px
</style>
