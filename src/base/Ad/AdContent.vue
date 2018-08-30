<template>
  <div class="detail" v-if="currentAd">
    <div class="title">
      <img class="avatar" :src="currentAd.brandUrl" alt="">
      <div class="info">
        <p class="tit">{{currentAd.brandName}}</p>
        <p class="num">观看<span>{{currentAd.plays}}</span>次</p>
      </div>
      <span class="time">{{currentAd.createTime}}</span>
    </div>
    <div class="img-box">
      <img :src="currentAd.contentUrl" alt="">
      <span v-show="!flag" class="countdown">{{time}}s</span>
    </div>
    <div class="con">
      <p class="txt">公司地址：{{currentAd.address}}</p>
      <p>联系电话：{{currentAd.telephone}}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'AdContent',
  data() {
    return {
      time: 5,
      flag: false
    }
  },
  computed: {
    ...mapGetters([
      'currentAd'
    ])
  },
  mounted() {
    setTimeout(() => {
      this.autoRun()
    }, 1000)
  },
  methods: {
    autoRun() {
      this.run()
    },
    run() {
      if (this.time > 0) {
        this.flag = false
        this.$store.commit('SET_FLAG', false)
        this.time--
        this.$emit('timeLeft', this.time)
        setTimeout(this.run, 1000)
      } else {
        this.flag = true
        this.$store.commit('SET_FLAG', true)
      }
    }
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
    .countdown
      position: absolute 
      right: 0.3rem
      top: 0.25rem
      width: 0.5rem
      height: 0.5rem
      line-height: 0.5rem
      text-align: center
      background: #545455
      font-size: 0.24rem
      color: #fff
      border-radius: 50%
  .con
    padding: 0.3rem 0
    p
      font-size: 0.26rem
      color: #666
    .txt
      padding-bottom: 0.15rem
</style>

