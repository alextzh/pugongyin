<template>
  <div class="asset-top">
    <div class="account">
      <p class="title">账户金额 (DDO)</p>
      <p class="money" v-if="item">
        <span class="sum">{{item.totalSum}}</span>
        <span>≈ {{item.CNY}} CNY</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssetTop',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.asset-top
  height: 2.3rem
  background: $color-theme
  color: #ffffff
  padding: 0 0.24rem
  .account
    padding-top: 0.66rem
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: flex-start
    height: 1.24rem
    .title
      font-size: 0.26rem
    .money
      font-size: 0.28rem
      .sum
        font-size: 0.8rem
</style>

