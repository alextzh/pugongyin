<template>
  <div class="box">
    <div class="top">
      <div class="bg">
        <img src="./mine_bg.jpg" alt="">
      </div>
      <div class="nav">
        <span class="right" @click="toEdit">编辑资料</span>
      </div>
      <div class="userinfo">
        <div class="image" @click="toEditInfo">
          <img :src="avatar" alt="">
        </div>
        <p class="name">{{nickname}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'MineTop',
  computed: {
    ...mapGetters([
      'nickname',
      'avatar'
    ])
  },
  methods: {
    toEdit() {
      this.$router.push({
        path: '/editInformation'
      })
    },
    toEditInfo() {
      this.$router.push({
        path: '/editInformation'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.top
  position: relative
  height: 3.7rem
  background: transparent
  .bg
    position: absolute 
    top: 0
    left: 0
    right: 0
    height: 100%
    z-index: 1
    img 
      width: 100%
      height: 100%
  .nav
    height: 0.88rem
    display: flex
    align-items: center
    justify-content: center
    font-size: 0.36rem
    color: #fff
    position: relative;
    z-index: 1;
    .right
      display: block
      line-height: 0.88rem
      position: absolute
      top: 0
      right: 0
      font-size: 0.28rem
      padding: 0 0.24rem
  .userinfo
    margin-top: -0.2rem
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    position: relative;
    z-index: 1;
    .image
      width: 1.86rem
      height: 1.86rem
      border-radius: 50%
      overflow: hidden
      box-shadow: 0 0 8px rgba(0,0,0,.2)
      background: #999
      img 
        display: flex
        width: 100%
        height: 100%
        border-radius: 50%
    .name
      padding-top: 0.2rem
      font-size: 0.3rem
      color: #ffffff
</style>

