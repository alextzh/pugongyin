<template>
  <div class="asset-detail" v-if="item">
    <div class="item">
      <div class="tit">
        <span class="left">总收入（DDO）</span>
      </div>
      <div class="con">
        <span>{{item.totalIncome}}</span>
      </div>
      <ul class="tr">
        <li class="td">
          <span class="top">充值收入</span>
          <span class="bottom">{{item.rechargeIncome}}</span>
        </li>
        <li class="td">
          <span class="top">挖矿收入</span>
          <span class="bottom">{{item.miningIncome}}</span>
        </li>
      </ul>
    </div>
    <div class="item">
      <div class="tit">
        <span class="left">总支出（DDO）</span>
      </div>
      <div class="con">
        <span>{{item.totalPay}}</span>
      </div>
      <ul class="tr">
        <li class="td">
          <span class="top">提现支出</span>
          <span class="bottom">{{item.withdrawPay}}</span>
        </li>
        <li class="td">
          <span class="top">购买支出</span>
          <span class="bottom">{{item.shopPay}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssetContent',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="stylus" scoped>
.asset-detail
  padding: 0 0.24rem
  .item
    padding-top: 0.3rem
    .tit
      display: flex
      justify-content: space-between
      font-size: 0.22rem
      color: #666
      .left
        font-size: 0.28rem
    .con
      display: flex
      justify-content: space-between
      font-size: 0.36rem
      color: #444
      font-weight: bold
      padding: 0.2rem 0
    .tr
      display: flex
      .td
        flex: 1
        height: 0.94rem
        display: flex
        flex-direction: column
        justify-content: center
        align-items: flex-start
        box-sizing: border-box
        border-top: 1px solid #e8e8e8
        border-bottom: 1px solid #e8e8e8
        border-right: 1px solid #e8e8e8
        &:last-child
          border-right: 0
          padding-left: 0.24rem
        .top
          font-size: 0.26rem
          color: #444
          padding-bottom: 0.12rem
        .bottom
          font-size: 0.28rem
          color: #b9b9b9
</style>

