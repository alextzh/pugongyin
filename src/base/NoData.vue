<template>
  <div class="no-data">
    <div class="content" v-if="showImg">
      <img class="image" src="../common/image/nodata.png" alt="">
    </div>
    <p class="text">{{content}}</p>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    content: {
      type: String,
      default: '暂无数据'
    },
    showImg: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus" scoped>
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
</style>

