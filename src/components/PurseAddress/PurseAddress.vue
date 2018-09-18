<template>
  <div class="purse-address">
    <m-header text="钱包地址" :showBack="showBack" @back="handleBack"></m-header>
    <div class="container">
      <cube-scroll>
        <div class="box">
          <div class="head">
            <img class="avatar" :src="avatar" alt="">
          </div>
          <div class="main">
            <input id="address" type="text" v-model="message" hidden />
            <p class="address">{{message}}</p>
            <div class="weixin">
              <img :src="qrUrl" alt="">
            </div>
            <vue-qr style="display:none" :text="message" :callback="test" :size="215" :margin="15" colorDark="#fe7527"></vue-qr>
            <a class="copy" href="javascript:;" @click="doCopy">复制钱包地址</a>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import VueQr from 'vue-qr'

export default {
  name: 'PurseAddress',
  components: {
    MHeader,
    VueQr
  },
  data() {
    return {
      showBack: true,
      avatar: '',
      message: '0xaDDOaj28348190240192183ac2842710',
      qrUrl: ''
    }
  },
  mounted() {
    this.getWalletAddress()
  },
  methods: {
    test(dataUrl) {
      this.qrUrl = dataUrl
    },
    doCopy() {
      const vm = this
      this.$copyText(this.message).then(function(e) {
        vm.$toast('复制成功', 'correct')
      }, function(e) {
        vm.$toast('复制失败', 'error')
        console.log(e)
      })
    },
    handleBack() {
      this.$router.back()
    },
    // 获取钱包地址
    getWalletAddress() {
      this.$store.dispatch('GetWalletAddress').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        const result = res.result
        this.message = result.walletAddress ? result.walletAddress : ''
        this.avatar = result.profilePic
        this.message = result.walletAddress
      }).catch(err => {
        console.log(err)
        this.$toast('获取钱包地址失败', 'error')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.container
  position: absolute 
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  .box
    display: flex
    flex-direction: column
    align-items: center
    .head
      width: 100%
      height: 1.4rem
      position: relative
      background: $color-theme
      margin-bottom: 1.8rem
      .avatar
        display: block
        width: 1.82rem
        height: 1.82rem
        position: absolute 
        bottom: -0.91rem
        left: 50%
        margin-left: -0.91rem
        border-radius: 50%
        box-shadow: 0 3px 7px rgba(0,0,0,.35)
        background: #999
    .main
      display: flex
      flex-direction: column
      align-items: center
      width: 4.3rem
      margin: 0 auto
      .address
        font-size: 0.28rem;
        color: #444;
        width: 100%;
        word-break: break-all;
        line-height: 1.2;
        margin-bottom: 0.7rem;
        text-align: center
      .weixin
        box-sizing: border-box
        border: 1px solid #e8e8e8
        width: 100%
        height: 4.3rem
        margin-bottom: 1.05rem;
        img 
          width: 100%;
          height: 100%;
          display: block
          border: 0
      .copy
        width: 100%
        height: 0.78rem
        display: flex
        align-items: center
        justify-content: center
        font-size: 0.3rem
        color: $color-theme
        border: 1px solid $color-theme
        box-sizing: border-box
        border-radius: 50px
        margin-bottom: 1rem
        &:active
          background: $color-theme
          color: #fff
</style>
