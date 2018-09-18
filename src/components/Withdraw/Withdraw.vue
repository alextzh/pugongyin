<template>
  <transition name="fade">
    <div class="withdraw">
      <m-header text="提现" :showBack="showBack" @back="handleBack"></m-header>
      <div class="box">
        <div class="card">
          <div class="card-title">
            <label class="label" for="imtoken">钱包地址</label>
            <input class="input" type="text" v-model="imtoken" id="imtoken" placeholder="请输入数字钱包地址，例如imtoken" />
          </div>
          <div class="card-content">
            <div class="title">
              <span class="p1">提现数量</span>
              <span class="p2">总额 {{balance}}</span>
            </div>
            <div class="field">
              <label for="rechargeNum">DDO</label>
              <input class="input" type="number" value="1000" v-model="withdrawNum" id="rechargeNum" placeholder="请输入提现数量" />
              <a class="anchor" href="javascript:;" @click="getAll">全部提现</a>
            </div>
            <div class="remark">
              <p class="mark">≈ ETH <span>{{ethNum}}</span></p>
              <p class="mark">≈ CNY <span>{{cnyNum}}</span></p>
            </div>
            <div class="btn" @click="handleSubmit">
              <a class="anchor" href="javascript:;">提交</a>
            </div>
            <p class="tip">请填写您需要提现的DDO数量，我们工作人员会在24小时内与您取得联系。</p>
          </div>
        </div>
        <div class="legend">
          <p>DDO是您的数字资产，基于国内政策法规要求，暂时不能直接兑换成人民币，您可提现到您的数字钱包，或在app中兑换成商品。想要了解更多数字钱包内容，可到token.im浏览。</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import MHeader from 'base/MHeader'
import Validate from 'common/js/validate'

export default {
  name: 'Withdraw',
  components: {
    MHeader
  },
  data() {
    return {
      showBack: true,
      withdrawNum: '',
      imtoken: '',
      balance: 0,
      ethRate: '',
      cnyRate: ''
    }
  },
  computed: {
    ethNum() {
      return parseFloat(this.withdrawNum * this.ethRate).toFixed(3)
    },
    cnyNum() {
      return parseFloat(this.withdrawNum * this.cnyRate).toFixed(3)
    }
  },
  mounted() {
    this.getBalance()
    this.getCurrencyRate()
  },
  methods: {
    handleBack() {
      this.$router.back()
    },
    // 获取全部余额
    getAll() {
      this.withdrawNum = this.balance
    },
    // 获取余额
    getBalance() {
      this.$store.dispatch('GetAllAsset').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return false
        }
        const result = res.result
        this.balance = result
      }).catch(err => {
        console.log(err)
        this.$toast('获取余额失败')
      })
    },
    // 获取币种兑换比率
    getCurrencyRate() {
      this.$store.dispatch('GetCurrencyRate').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        const result = res.result
        this.ethRate = result[0].exchangeRate
        this.cnyRate = result[1].exchangeRate
      }).catch(err => {
        console.log(err)
      })
    },
    // 提交提现申请
    handleSubmit() {
      if (Validate.checkImtoken(this.imtoken) && Validate.checkWithdraw(this.withdrawNum, this.balance)) {
        const data = {
          tradeMoney: this.withdrawNum,
          userId: localStorage.getItem('userId'),
          walletAddress: this.imtoken
        }
        this.$store.dispatch('SubmitWithdraw', data).then(res => {
          if (res.code === 0) {
            this.$toast(res.msg, 'warn')
            return
          }
          this.$toast('提现申请成功', 'correct')
          setTimeout(() => {
            this.$router.push({
              path: '/mine'
            })
          }, 1000)
        }).catch(err => {
          console.log(err)
          this.$toast('提现申请失败', 'error')
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.box
  padding: 1.24rem 0.24rem 0.36rem
  .card
    border-radius: 0.1rem
    box-shadow: 0 3px 10px rgba(0,0,0,.36)
    .card-title
      height: 1.3rem
      display: flex
      align-items: center
      padding: 0 0.3rem
      border-bottom: 1px solid #e8e8e8
      box-sizing: border-box
      .label
        font-size: 0.32rem
        color: #444
      .input
        flex: 1
        padding: 0 0.25rem
        box-sizing: border-box;
        width: 100%;
        outline: none;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        font-size: 0.26rem;
        color: #444
        &::-webkit-input-placeholder
          color: #b9b9b9
    .card-content
      padding: 0.4rem 0.5rem 0.2rem
      display: flex
      flex-direction: column
      justify-content: center
      .title
        font-size: 0.24rem
        color: #444
        padding-bottom: 0.12rem
        display: flex;
        justify-content: space-between
        .p2
          color: #666
      .field
        height: 0.8rem
        display: flex
        align-items: center
        border-bottom: 1px solid #e8e8e8
        box-sizing: border-box
        label 
          width: 1rem
          display: inline-block
          font-size: 0.38rem
          color: #444
        .input
          flex: 1
          padding: 0 0.25rem
          box-sizing: border-box
          width: 100%
          outline: none
          padding-top: 0.1rem
          padding-bottom: 0.1rem
          font-size: 0.5rem
          &::-webkit-input-placeholder
            color: #b9b9b9
        .anchor
          display: inline-block
          padding: 0.24rem 0
          font-size: 0.22rem
          color: $color-theme
      .remark
        display: flex
        align-items: center
        padding-top: 0.22rem
        font-size: 0.28rem
        color: #b9b9b9
        .mark
          &:first-child
            padding-right: 0.5rem
      .btn
        height: 0.8rem
        display: flex
        justify-content: center
        align-items: center
        font-size: 0.3rem
        background: $color-theme
        border-radius: 0.1rem
        margin: 0.2rem 0
        .anchor
          display: block
          color: #fff
      .tip
        font-size: 0.24rem
        line-height: 1.5
        color: #b9b9b9
  .legend
    padding: 0.3rem 0.24rem
    p
      font-size: 0.28rem;
      line-height: 1.5;
      color: $color-theme;
</style>