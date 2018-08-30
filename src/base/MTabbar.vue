<template>
  <div class="box">
    <div class="mid-bg"></div>
    <div class="tabbar-bg"></div>
    <div class="tabbar">
      <router-link :to="{name: 'Home'}" exact tag="div" class="item">
        <span class="icon"><i class="iconfont " :class="$route.name === 'Home' ? 'icon-homefill' : 'icon-home'"></i></span>
        <p class="title">首页</p>
      </router-link>
      <router-link :to="{name: 'Community'}" exact tag="div" class="item">
        <span class="icon"><i class="iconfont " :class="$route.name === 'Community' ? 'icon-communityfill' : 'icon-community'"></i></span>
        <p class="title">社区</p>
      </router-link>
      <div class="item" @click="callCamera">
        <div class="icon mid" id="scan">
          <div class="mid-icon">
            <img src="../common/image/mining.png" alt="">
          </div>
        </div>
        <p class="title">挖矿</p>
      </div>
      <router-link :to="{name: 'Shop'}" exact tag="div" class="item">
        <span class="icon"><i class="iconfont " :class="$route.name === 'Shop' ? 'icon-shopfill' : 'icon-shop'"></i></span>
        <p class="title">商城</p>
      </router-link>
      <router-link :to="{name: 'Mine'}" exact tag="div" class="item">
        <span class="icon"><i class="iconfont " :class="$route.name === 'Mine' ? 'icon-myfill' : 'icon-my'"></i></span>
        <p class="title">我的</p>
      </router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'MTabbar',
  methods: {
    callCamera() {
      console.log('扫码')
      // window.toastandroid.openCamera()
      // window.scan.openCamera()
      if (!this.$store.getters.isLogin) {
        this.$router.push({
          path: '/mobileLogin'
        })
        return false
      }
      var me = this
      cordova.plugins.barcodeScanner.scan((result) => {
        let str = result.text
        if (str && str.indexOf('advertId') >= 0 && str.indexOf('machineNum') >= 0) {
          let arr = str.split('&')
          let advertId = arr[0].split('=')[1]
          let machineNum = arr[1].split('=')[1]
          me.$store.commit('SET_MACHINE_NUM', machineNum)
          me.$router.push({
            path: `/ad/${advertId}`
          })
        }
        if (str && str.indexOf('machineNum') >= 0 && str.indexOf('advertId') < 0) {
          let arr = str.split('=')
          let machineNum = arr[1]
          me.$store.commit('SET_MACHINE_NUM', machineNum)
          me.$router.push({
            path: '/autnLogin'
          })
        }
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.box
  position: relative
  .mid-bg
    position: absolute;
    width: 1rem;
    height: 1rem;
    background: #fff;
    border-radius: 50%;
    top: -0.48rem;
    z-index: -1;
    box-shadow: 0 0 14px rgba(0,0,0,.16);
    left: 50%;
    transform: translateX(-50%);
  .tabbar-bg
    position: absolute;
    top: 1px
    left: 0
    z-index: -2;
    width: 100%;
    height: 1rem;
    box-shadow: 0 0 14px rgba(0,0,0,.16);
  .tabbar
    position: relative
    display: flex
    align-items: center
    justify-content: center
    height: 1rem
    z-index: 0;
    background: #fff;
    .item
      flex: 1
      height: 1rem
      display: flex
      flex-direction: column
      justify-content: center
      .icon
        position: relative
        display: flex
        width: 100%
        height: 0.44rem
        align-items: center
        justify-content: center
        i 
          font-size: 0.44rem
          color: #999999
      .title
        font-size: 0.22rem
        color: #676767
        text-align: center
        padding-top: 0.05rem
      .mid
        .mid-icon
          position: absolute;
          z-index: 10;
          width: 0.8rem;
          height: 0.8rem;
          background: $color-theme;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          top: -0.5rem;
          left: 0.35rem;
          img
            width: 0.55rem
            height: 0.55rem
      &.active
        i, .title
          color: $color-theme
</style>

