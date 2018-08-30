<template>
  <div class="header">
    <div class="back" v-if="showBack" @click="handleBack"><i class="iconfont icon-back"></i></div>
    <h3 class="title">{{text}}</h3>
    <div class="right" v-if="showIcon" @click="handleClick"><i class="iconfont" :class="icon"></i></div>
    <div class="right" v-if="showRight" @click="handleClick">{{rightText}}</div>
  </div>
</template>

<script>
export default {
  name: 'MHeader',
  props: {
    text: {
      type: String,
      required: true
    },
    showBack: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    showRight: {
      type: Boolean,
      default: false
    },
    rightText: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleBack() {
      this.$emit('back')
    },
    handleClick() {
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
  .back
    position: absolute
    top: 0
    left: 0
    display: flex
    align-items: center
    justify-content: center
    padding: 0 0.24rem
    i
      font-size: 0.36rem
      color: #fff
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
    padding: 0 0.24rem
    font-size: 0.28rem
    color: #fff
    i
      font-size: 0.5rem
      color: #fff
      margin-top: 1px
</style>


