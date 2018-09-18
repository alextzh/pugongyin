<template>
  <div class="feature">
    <ul class="box">
      <li class="item" @click="toAssertDetail">
        <div class="media">
          <i class="iconfont icon-asset" style="color:#1b82d1"></i>
        </div>
        <div class="content border-bottom-1px">
          <h4>
            <span>资产</span>
            <span class="arm"><i style="color: #000;font-size: 0.36rem;font-weight: bold;font-style: normal">{{allAsset}}</i> DDO</span>
          </h4>
          <span class="icon"><i class="iconfont icon-link"></i></span>
        </div>
      </li>
      <!-- <li class="item" @click="toRecharge">
        <div class="media">
          <i class="iconfont icon-recharge" style="color:#2fa995"></i>
        </div>
        <div class="content border-bottom-1px">
          <h4>充值</h4>
          <span class="icon"><i class="iconfont icon-link"></i></span>
        </div>
      </li> -->
      <li class="item" @click="toWithdraw">
        <div class="media">
          <i class="iconfont icon-withdraw" style="color:#d92a2a"></i>
        </div>
        <div class="content border-bottom-1px">
          <h4>提现</h4>
          <span class="icon"><i class="iconfont icon-link"></i></span>
        </div>
      </li>
      <li class="item" @click="toMyOrder">
        <div class="media">
          <i class="iconfont icon-order" style="color:#f39f22"></i>
        </div>
        <div class="content border-bottom-1px">
          <h4>我的订单</h4>
          <span class="icon"><i class="iconfont icon-link" style="font-size: 0.4rem"></i></span>
        </div>
      </li>
      <li class="item" @click="toWinningRecord">
        <div class="media">
          <i class="iconfont icon-zhongjiangjilu" style="color:#d92a2a"></i>
        </div>
        <div class="content">
          <h4>我的奖励</h4>
          <span class="icon"><i class="iconfont icon-link" style="font-size: 0.4rem"></i></span>
        </div>
      </li>
    </ul>
    <ul class="box">
      <li class="item" @click="toTradeRecord">
        <div class="media">
          <i class="iconfont icon-transactionRecord" style="color:#1b82d1"></i>
        </div>
        <div class="content border-bottom-1px">
          <h4>提现记录</h4>
          <span class="icon"><i class="iconfont icon-link"></i></span>
        </div>
      </li>
      <li class="item" @click="toShouzhiRecord">
        <div class="media">
          <i class="iconfont icon-shouzhi" style="color:#d92a2a"></i>
        </div>
        <div class="content border-bottom-1px">
          <h4>收支记录</h4>
          <span class="icon"><i class="iconfont icon-link"></i></span>
        </div>
      </li>
      <li class="item" @click="toPurseAddress">
        <div class="media">
          <i class="iconfont icon-purseAddress" style="color:#f49e23"></i>
        </div>
        <div class="content">
          <h4>
            <span>钱包地址</span>
            <span class="arm"><i class="iconfont icon-qr"></i></span>
          </h4>
          <span class="icon"><i class="iconfont icon-link"></i></span>
        </div>
      </li>
    </ul>
    <ul class="box">
      <li class="item" @click="toSetting">
        <div class="media">
          <i class="iconfont icon-setting" style="color:#1b82d1"></i>
        </div>
        <div class="content">
          <h4>设置</h4>
          <span class="icon"><i class="iconfont icon-link"></i></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Feature',
  computed: {
    getText() {
      return this.$store.getters.password ? '修改密码' : '设置密码'
    },
    ...mapGetters([
      'allAsset'
    ])
  },
  methods: {
    toShouzhiRecord() {
      this.$router.push({
        path: '/shouzhiRecord'
      })
    },
    toAssertDetail() {
      this.$router.push({
        path: '/assetDetail'
      })
    },
    // toRecharge() {
    //   this.$router.push({
    //     path: '/recharge'
    //   })
    // },
    toWithdraw() {
      this.$router.push({
        path: '/withdraw'
      })
    },
    toTradeRecord() {
      this.$router.push({
        path: '/tradeRecord'
      })
    },
    toMyOrder() {
      this.$router.push({
        path: '/myOrder'
      })
    },
    toPurseAddress() {
      this.$router.push({
        path: '/purseAddress'
      })
    },
    toWinningRecord() {
      this.$router.push({
        path: '/winningRecord'
      })
    },
    toSetting() {
      this.$router.push({
        path: '/setting'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  padding-bottom: 0.15rem;
  background: #e8e8e8;
  .item
    display: flex
    align-items: center
    height: 0.85rem
    background: #fff
    &:active
      background: rgba(0,0,0,.2)
    .media
      display: flex
      width: 0.9rem
      height: 100%
      align-items: center
      justify-content: center
      i 
        font-size: 0.46rem
    .content
      flex: 1
      display: flex
      align-items: center
      height: 0.85rem
      font-size: 0.28rem
      color: #444444
      box-sizing: border-box
      // border-bottom: 1px solid #e8e8e8
      padding-right: 0.25rem
      h4
        flex: 1
        display: flex
        align-items: center
        justify-content: space-between
        .arm
          color: #a0a0a0
          font-size: 0.24rem
          i 
            font-size: 0.46rem
      .icon
        i
          font-size: 0.36rem
          color: #a1a1a1
</style>


