<template>
  <div class="login">
    <m-header text="扫码登录"></m-header>
    <div class="box">
      <div class="logo-box">
        <img class="logo" src="../../common/image/logo.png" alt="">
      </div>
      <login-form></login-form>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import LoginForm from 'base/LoginForm'

export default {
  name: 'ScanLogin',
  components: {
    MHeader,
    LoginForm
  },
  created() {
    this.$store.commit('SET_MACHINE_NUM', this.$route.query.machineNum)
  }
}
</script>

<style lang="stylus" scoped>
.box
  position: absolute 
  top: 1.25rem
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  z-index: 0
  .logo-box
    height: 4.16rem
    display: flex
    justify-content: center
    align-items: center
    .logo
      width: 2.56rem
      height: 2.18rem
      display: block
      border: 0
</style>
