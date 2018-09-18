<template>
  <transition name="slide">
    <div id="resetPassword">
      <m-header :showBack="showBack" @back="handleBack" text="重新设置密码"></m-header>
      <div class="container">
        <cube-scroll
          ref="scroll"
          :scroll-events="['before-scroll-start']"
          @before-scroll-start="onBeforeScrollHandle">
          <div class="box">
            <img class="image" src="../../common/image/pwd.png" alt="手势密码">
            <div class="title">{{title}}</div>
            <gesture ref="gesture" @onSuccess="handleSaveSuccess"></gesture>
          </div>
        </cube-scroll>
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
    handleSaveSuccess() {
      this.$toast('密码修改成功', 'correct')
      if (this.$store.getters.modifyState === 1) {
        setTimeout(() => {
          this.$router.replace({
            path: '/home'
          })
        }, 500)
      } else {
        setTimeout(() => {
          this.$router.replace({
            path: '/mine'
          })
        }, 500)
      }
    },
    onBeforeScrollHandle() {
      this.$refs.scroll.refresh()
    },
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
.container
  position: absolute 
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
  overflow hidden
  .box
    position: absolute
    box-sizing:border-box
    width: 100%;
    padding: 0.9rem 0.84rem 0.6rem
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


