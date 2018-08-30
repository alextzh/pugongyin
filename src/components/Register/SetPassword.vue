<template>
  <transition name="slide">
    <div id="setPassword">
      <m-header :showBack="showBack" @back="handleBack" text="设置手势密码"></m-header>
      <div class="box">
        <img class="image" src="../../common/image/pwd.png" alt="手势密码">
        <div class="title">{{title}}</div>
        <gesture tip="至少4个点以上"></gesture>
      </div>
    </div>
  </transition>
</template>

<script>
import MHeader from 'base/MHeader'
import Gesture from 'base/Gesture'
export default {
  name: 'SetPassword',
  data() {
    return {
      title: '请输入您的手势密码',
      showBack: true
    }
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


