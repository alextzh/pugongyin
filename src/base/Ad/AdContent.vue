<template>
  <div class="detail" v-if="currentAd">
    <div class="title">
      <img class="avatar" :src="currentAd.brandUrl" alt="">
      <div class="info">
        <p class="tit">{{currentAd.brandName}}</p>
        <p class="num">观看<span>{{plays}}</span>次</p>
      </div>
      <span class="time">{{currentAd.createTime}}</span>
    </div>
    <div class="img-box">
      <img :src="currentAd.contentUrl" alt="">
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'AdContent',
  props: {
    plays: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters([
      'currentAd'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.detail
  padding: 0 0.24rem
  .title
    padding: 0.25rem 0
    display: flex
    align-items: center
    .avatar
      display: inline-block
      width: 0.8rem
      height: 0.8rem
      border-radius: 50%
      box-shadow: 0 0 13px rgba(0,0,0,.14)
    .info
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      padding-left: 0.16rem
      .tit
        font-size: 0.32rem
        color: #444
      .num
        padding-top: 0.1rem
        font-size: 0.24rem
        color: #666
    .time
      font-size: 0.22rem
      color: #797979
  .img-box
    position: relative
    overflow: hidden
    box-shadow: 0 0 13px rgba(0,0,0,.22)
    border-radius: 5px
    img 
      display: block
      width: 100%
</style>

