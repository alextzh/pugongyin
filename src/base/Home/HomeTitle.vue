<template>
  <div class="title-box">
    <span class="bar"></span>
    {{content}}
  </div>
</template>

<script>
export default {
  name: 'HomeTitle',
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.title-box
  position: relative
  padding-left: 0.24rem
  line-height: 0.36rem
  text-align: left
  color: #333
  font-size: 0.3rem
  font-weight: bold
  letter-spacing: 1px
  .bar
    position: absolute 
    top: 0
    left: 0
    width: 0.1rem
    height: 0.36rem
    border-radius: 50px
    background: $color-theme
</style>

