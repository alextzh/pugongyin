<template>
  <transition name="slide">
    <div id="setPassword">
      <m-header :showBack="showBack" :showRight="showRight" @back="handleBack" @handleClick="handleJump" text="设置手势密码" rightText="跳过"></m-header>
      <div class="container">
        <cube-scroll
          ref="scroll"
          :scroll-events="['before-scroll-start']"
          @before-scroll-start="onBeforeScrollHandle">
          <div class="box">
            <img class="image" src="../../common/image/pwd.png" alt="手势密码">
            <div class="title">{{title}}</div>
            <gesture tip="至少4个点以上" @onSuccess="handleSaveSuccess"></gesture>
          </div>
        </cube-scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import MHeader from 'base/MHeader'
import Gesture from 'base/Gesture'
import {mapGetters} from 'vuex'

export default {
  name: 'SetPassword',
  data() {
    return {
      title: '请输入您的手势密码',
      showBack: true,
      showRight: true
    }
  },
  computed: {
    ...mapGetters([
      'routerQuery'
    ])
  },
  methods: {
    handleJump() {
      if (this.routerQuery) {
        setTimeout(() => {
          this.$router.replace({
            path: this.routerQuery
          })
        }, 500)
      } else {
        setTimeout(() => {
          this.$router.replace({
            path: '/home'
          })
        }, 500)
      }
    },
    handleSaveSuccess() {
      this.$toast('密码设置成功', 'correct')
      if (this.routerQuery) {
        setTimeout(() => {
          this.$router.replace({
            path: this.routerQuery
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


