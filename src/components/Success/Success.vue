<template>
  <div class="success">
    <!-- <div class="header">
      <span class="close" v-show="showIcon" @click="closePage"><i class="iconfont icon-close-x"></i></span>
      <h1>登录成功</h1>
    </div> -->
    <div class="box">
      <img class="image" src="../../common/image/login_success.jpg" alt="">
      <p class="tip1">登录成功</p>
      <p>赶快开始您的挖矿之旅吧</p>
    </div>
  </div>
</template>

<script>
import {isWeiXin} from 'common/js/tool'

export default {
  name: 'SuccessTip',
  data() {
    return {
      showIcon: true
    }
  },
  methods: {
    closePage() {
      if (!isWeiXin()) {
        this.showIcon = true
        window.location.href = 'about:blank'
        window.close()
      } else {
        this.showIcon = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.header
  height: 0.88rem
  display flex
  justify-content center
  align-items: center
  font-size: 0.36rem
  color: #ffffff
  background: $color-theme
  h1
    flex: 1
    display: flex
    align-items center
    justify-content center
    height: 0.88rem
  .close
    display flex
    justify-content center
    align-items center
    height: 0.88rem
    width: 0.88rem
    position: absolute;
    left: 0;
    top: 0
    i
      font-size: 0.4rem
      color: #fff
.box
  position: absolute 
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
  display: flex
  flex-direction column
  align-items center
  justify-content center
  font-size: 0.34rem
  color: #444
  overflow hidden
  .image
    width: 4.96rem
    height: 3.9rem
    display: block
  .tip1
    font-size: 0.48rem
    color: $color-theme
    padding: 1.1rem 0 0.3rem
</style>
