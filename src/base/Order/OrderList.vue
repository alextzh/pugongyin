<template>
  <div class="box">
    <ul v-if="items.length > 0">
      <li class="item" v-for="item in items" :key="item.orderId">
        <div class="title">
          <span class="orderNo">订单编号：{{item.orderNum}}</span>
          <span class="time">{{item.createTime}}</span>
        </div>
        <div class="content">
          <img class="media" src="../../common/image/good.jpg" alt="">
          <div class="desc">
            <span class="tit">{{item.goodsName}}</span>
            <span class="account">{{item.goodsPrice}} DDO</span>
          </div>
          <span class="state">{{item.status}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  props: {
    items: {
      type: Array | Object,
      default: null
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.box
  padding: 0 0.24rem
  .item
    padding: 0.3rem 0
    border-bottom: 1px solid #e8e8e8
    &:last-child
      border-bottom: 0
    .title
      display: flex
      align-items: center
      justify-content: space-between
      color: #666666
      padding-bottom: 0.2rem
      .orderNo
        font-size: 0.26rem
        flex: 1
        no-wrap()
      .time
        font-size: 0.24rem
        padding-left: 0.1rem
    .content
      height: 1rem
      display: flex
      align-items: center
      .media
        display: block
        width: 1rem
        height: 1rem
        border-radius: 0.1rem
        border: 0
      .desc
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        padding: 0 0.15rem
        no-wrap()
        .tit
          font-size: 0.3rem
          color: #444444
          padding-bottom: 0.2rem
          no-wrap()
        .account
          font-size: 0.26rem
          color: #666666
      .state
        font-size: 0.3rem
        color: #db2048
</style>

