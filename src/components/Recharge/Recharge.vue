<template>
  <transition name="fade">
    <div class="recharge">
      <m-header text="充值" :showBack="showBack" @back="handleBack"></m-header>
      <div class="box">
        <div class="card">
          <div class="title">代充数量</div>
          <div class="field">
            <label for="rechargeNum">DDO</label>
            <input class="input" type="number" placeholder="请输入充值数量" v-model="rechargeNum" id="rechargeNum" />
          </div>
          <div class="btn" @click="handleSubmit">
            <a class="anchor" href="javascript:;">提交</a>
          </div>
          <p class="tip">请填写您需要充值的DDO数量，我们工作人员会在24小时内与您取得联系。</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import MHeader from 'base/MHeader'
import Validate from 'common/js/validate'

export default {
  name: 'Recharge',
  components: {
    MHeader
  },
  data() {
    return {
      showBack: true,
      rechargeNum: '',
      checkValue: 0
    }
  },
  methods: {
    handleBack() {
      this.$router.back()
    },
    // 充值提交申请
    handleSubmit() {
      if (Validate.checkRecharge(this.rechargeNum)) {
        const data = {
          userId: localStorage.getItem('userId'),
          tradeMoney: this.rechargeNum
        }
        this.$store.dispatch('SubmitRecharge', data).then(res => {
          if (res.code === 0) {
            this.$toast(res.msg, 'warn')
            return
          }
          this.$toast('充值申请成功', 'correct')
          setTimeout(() => {
            this.$router.push({
              path: '/mine'
            })
          }, 1000)
        }).catch(err => {
          console.log(err)
          this.$toast('充值申请失败', 'error')
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.box
  padding: 0.36rem 0.24rem
  .card
    padding: 0.4rem 0.5rem
    border-radius: 0.1rem
    box-shadow: 0 3px 10px rgba(0,0,0,.36)
    display: flex
    flex-direction: column
    justify-content: center
    .title
      font-size: 0.24rem
      color: #444
      padding-bottom: 0.12rem
    .field
      height: 0.8rem
      display: flex
      align-items: center
      border-bottom: 1px solid #e8e8e8
      box-sizing: border-box;
      label 
        width: 1rem
        display: inline-block
        font-size: 0.38rem
        color: #444
      .input
        flex: 1
        padding: 0 0.25rem
        box-sizing: border-box;
        width: 100%;
        outline: none;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        font-size: 0.5rem;
        &::-webkit-input-placeholder
          color: #b9b9b9
    .btn
      height: 0.8rem
      display: flex
      justify-content: center
      align-items: center
      font-size: 0.3rem
      background: $color-theme
      border-radius: 0.1rem
      margin: 0.36rem 0
      .anchor
        display: block
        color: #fff
    .tip
      font-size: 0.24rem
      line-height: 1.5
      color: #b9b9b9
</style>
