<template>
  <div class="box">
    <ul v-if="items.length > 0">
      <li class="item" v-for="item in items" :key="item.orderId">
        <div class="media">
          <i class="iconfont icon-balanceWithdraw"
            :class="item.tradeType === 0 ? 'icon-balanceWithdraw' : 'icon-balanceRecharge'"
            :style="item.tradeType === 0 ? 'color: #fe7a4a' : 'color: #1b82d1'"></i>
        </div>
        <div class="content">
          <div class="top">
            <span class="tit">{{item.tradeType === 0 ? '余额提现' : '余额充值'}}</span>
            <span class="time">{{item.createTime}}</span>
          </div>
          <div class="bottom">
            <span class="account">{{item.tradeMoney}} DDO</span>
            <span class="state">{{item.status === 1 ? '处理中' : '已完成'}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TradeList',
  props: {
    items: {
      type: Array | Object,
      default: null
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  padding: 0 0.24rem
  .item
    height: 1.26rem
    display: flex
    align-items: center
    justify-content: center
    &:last-child
      .content
        border-bottom: 0
    .media
      display: flex
      align-items: center
      width: 1.03rem
      height: 1.26rem
      i 
        font-size: 0.86rem
    .content
      height: 1.26rem
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      border-bottom: 1px solid #e8e8e8
      .top
        display: flex
        justify-content: space-between
        padding-bottom: 0.2rem
        padding-top: 0.1rem
        .tit
          font-size: 0.3rem
          color: #444444
        .time
          font-size: 0.24rem
          color: #666666
      .bottom
        display: flex
        justify-content: space-between
        .account
          font-size: 0.26rem
          color: #666666
        .state
          font-size: 0.3rem
          color: #db2048
</style>
