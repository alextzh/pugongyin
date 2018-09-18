<template>
  <div class="container">
    <div class="main">
      <router-view/>
    </div>
    <div class="foot">
      <m-tabbar @callCamera="callCamera"></m-tabbar>
    </div>
  </div>
</template>

<script>
import MTabbar from 'base/MTabbar'

export default {
  name: 'Layout',
  components: {
    MTabbar
  },
  methods: {
    callCamera() {
      // 调用扫描二维码功能
      window.postMessage()
      document.addEventListener('message', this.getMessage, false)
    },
    /* eslint-disable */
    getMessage(e) {
      let str = e.data
      if (!str) {
        this.$toast('请扫描宝盒相关二维码', 'warn')
        return
      }
      if (str.indexOf('advertId') >= 0 && str.indexOf('machineNum') >= 0) {
        let arr = str.split('&')
        let advertId = arr[0].split('=')[1]
        let machineNum = arr[1].split('=')[1]
        this.$store.commit('SET_MACHINE_NUM', machineNum)
        setTimeout(() => {
          document.removeEventListener('message', this.getMessage, false)
          this.$router.push({
            path: `/ad/${advertId}`
          })
        }, 500)
      } else if (str && str.indexOf('machineNum') >= 0 && str.indexOf('advertId') < 0) {
        let arr = str.split('=')
        let machineNum = arr[1]
        this.$store.commit('SET_MACHINE_NUM', machineNum)
        setTimeout(() => {
          document.removeEventListener('message', this.getMessage, false)
          this.$router.push({
            path: '/authLogin'
          })
        }, 500)
      } else {
        this.$toast(`请扫描宝盒相关二维码`, 'warn')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  overflow: hidden
  .main
    position: absolute 
    top: 0
    left: 0
    right: 0
    bottom: 1rem
    overflow: hidden
  .foot
    position: absolute 
    z-index: 999
    bottom: 0
    left: 0
    right: 0
</style>
