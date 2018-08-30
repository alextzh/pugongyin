<template>
  <div class="error">
    <m-header text="蒲公英"></m-header>
    <div class="container">
      <div class="content">
        <img class="image" src="../../common/image/error.png" alt="">
      </div>
      <p class="text">您的网络好像不给力，请稍后尝试</p>
      <a class="reload" href="javascript:;" @click="reload">重新加载</a>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'

export default {
  name: 'Error',
  components: {
    MHeader
  },
  methods: {
    reload() {
      this.$router.back()
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
  .content
    display: block
    width: 3.92rem
    height: 3.35rem
    margin: 1.6rem auto 0;
    .image
      display: block
      max-width: 100%
      border: 0
  .text
    font-size: 0.28rem
    color: #666
    letter-spacing: 1px
    padding-top: 0.3rem
    text-align: center
  .reload
    display: block
    width: 3.16rem
    height: 0.7rem
    text-align: center
    line-height: 0.7rem
    border: 1px solid $color-theme
    box-sizing: border-box
    border-radius: 0.35rem
    font-size: 0.3rem
    color: $color-theme
    background: #edf4fd
    margin: 0 auto
    margin-top: 1.5rem;
    &:active
      background: $color-theme
      color: #fff
</style>
