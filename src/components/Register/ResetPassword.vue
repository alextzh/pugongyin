<template>
  <transition name="slide">
    <div id="resetPassword">
      <m-header :showBack="showBack" @back="handleBack" text="重新设置密码"></m-header>
      <div class="box">
        <img class="image" src="../../common/image/pwd.png" alt="手势密码">
        <div class="title">{{title}}</div>
        <gesture ref="gesture"></gesture>
      </div>
    </div>
  </transition>
</template>

<script>
import MHeader from 'base/MHeader'
import Gesture from 'base/Gesture'
export default {
  name: 'ResetPassword',
  data() {
    return {
      title: '请重新确认您的手势密码',
      showBack: true
    }
  },
  mounted() {
    this.$refs.gesture.updatePassword()
  },
  methods: {
    handleBack() {
      this.$router.back()
    }
  },
  components: {
    MHeader,
    Gesture
  }
}
</script>

<style lang="stylus" scoped>
.box
  box-sizing:border-box
  margin-top: 1.4rem
  width: 100%;
  padding: 0 0.84rem
  display: flex
  flex-direction: column
  align-items: center
  .image
    display: inline-block
    width: 0.5rem
    height: 0.5rem
    margin-bottom: 0.76rem
  .title
    font-weight: 600
    font-size: 0.32rem
    margin-bottom: 0.44rem
    color: #666
</style>


