<template>
  <div class="winning">
    <header class="header">
      <span class="back" @click="handleBack"><i class="iconfont icon-back"></i></span>
    </header>
    <div class="box">
      <div class="top"></div>
      <div class="middle">
        <div class="content" v-if="winResult">
          <p class="msg">恭喜您，挖到{{winResult.prizeName}}</p>
          <img :src="winResult.prizeUrl" alt="">
        </div>
        <p class="tip">在蒲公英看广告，你的目光可以挖到宝</p>
        <a class="btn" href="javascript:;" @click.stop="handleExchange">兑换</a>
      </div>
      <div class="bottom"></div>
      <div class="bag"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Winning',
  mounted() {
    console.log(this.$store.getters.winResult)
  },
  computed: {
    ...mapGetters([
      'winResult'
    ])
  },
  methods: {
    handleBack() {
      this.$router.replace({
        path: '/home'
      })
    },
    handleExchange() {
      this.$store.dispatch('ExchangeReward', {winId: this.winResult.winId}).then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        console.log(res)
        this.$toast('兑换成功', 'correct')
        setTimeout(() => {
          this.$router.replace({
            path: '/mine'
          })
        }, 1000)
      }).catch(err => {
        console.log(err)
        this.$toast('兑换失败', 'error')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  position: absolute 
  top: 0
  left: 0
  right: 0
  height: 0.88rem
  background: transparent
  z-index: 1
  .back
    display: flex
    height: 0.88rem
    width: 0.88rem
    align-items: center
    justify-content: center
    i 
      font-size: 0.4rem
      color: #575757
.box
  position: absolute 
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 0
  display: flex
  flex-direction: center
  align-items: center
  justify-content: center
  .top
    position: absolute 
    z-index: 0
    top: 0.3rem
    left: 50%
    width: 6.16rem
    height: 2.16rem
    margin-left: -3.08rem
    background: url('./winning_top.png') no-repeat center center
    background-size: cover
  .middle
    position: relative
    height: 8.5rem
    width: 6.86rem
    background: url('./winning_bg.png') no-repeat center top
    background-size: contain
    .content
      padding-top: 1.24rem
      display: flex
      flex-direction: column 
      align-items: center
      justify-content flex-start
      .msg
        font-size: 0.3rem
        color: #fff
        padding-bottom: 0.5rem
      img 
        display: block
        width: 3.7rem
        height: 3.7rem
        border: 0
    .tip
      padding-top: 1rem
      font-size: 0.28rem
      color: #d42b46
      text-align: center
    .btn
      position: absolute
      bottom: 0
      left: 50%
      margin-left: -1.87rem
      width: 3.74rem
      height: 0.7rem
      font-size: 0.28rem
      color: #ffffff
      display: flex
      align-items: center
      justify-content: center
      background: url('./winning_btn.png') no-repeat center center
      background-size: cover
  .bottom
    position: absolute 
    z-index: 0
    bottom: 0
    left: 0
    width: 100%
    height: 0
    overflow hidden
    padding-top: 22.4%
    background: url('./winning_bottom.png') no-repeat center center
    background-size: cover
  .bag
    position: absolute 
    z-index: 0
    bottom: 2.75rem
    right: 0.3rem
    width: 0.75rem
    height: 0.83rem
    background: url('./winning_bag.png') no-repeat center center
    background-size: cover
</style>
