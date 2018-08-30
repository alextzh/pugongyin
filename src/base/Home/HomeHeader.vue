<template>
  <div class="header">
    <h3 class="title">蒲公英链</h3>
    <div class="right" @click="messageClick">
      <i class="iconfont icon-message"></i>
      <span v-show="messageState" class="dot"></span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'HomeHeader',
  computed: {
    ...mapGetters([
      'messageState'
    ])
  },
  methods: {
    // 跳转到信息列表页面
    messageClick() {
      this.$emit('handleClick')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.header
  position: relative
  width: 100%
  line-height: 0.88rem
  background: $color-theme
  color: #fff
  text-align: center
  font-size: 0.36rem
  box-shadow: 0 0 5px $color-theme
  .title
    width: 100%
    line-height: 0.88rem
    font-weight: 600
    letter-spacing: 1px
  .right
    position: absolute
    top: 0
    right: 0
    display: flex
    align-items: center
    justify-content: center
    padding: 0 0.3rem
    i
      font-size: 0.5rem
      color: #fff
      margin-top: 1px
    .dot
      position: absolute;
      right: 0.22rem;
      top: 0.2rem;
      display: block;
      width: 0.16rem;
      height: 0.16rem;
      border-radius: 50%;
      background: #fa332d;
</style>


