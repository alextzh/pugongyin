<template>
  <div class="container">
    <!-- <div class="start-page" v-show="pageFlag"></div> -->
    <div class="main">
      <router-view/>
    </div>
    <div class="foot">
      <m-tabbar></m-tabbar>
    </div>
  </div>
</template>

<script>
import MTabbar from 'base/MTabbar'
import {mapGetters} from 'vuex'

export default {
  name: 'Layout',
  components: {
    MTabbar
  },
  created() {
    // setTimeout(() => {
    //   this.$store.commit('SET_PAGE_FLAG', false)
    // }, 2000)
  },
  computed: {
    ...mapGetters([
      'pageFlag'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.container
  overflow: hidden
  // .start-page
  //   position: absolute 
  //   top: 0
  //   left: 0
  //   right: 0
  //   bottom: 0
  //   background: url('../../common/image/start.jpg') no-repeat center center
  //   background-size: cover
  //   overflow: hidden
  //   z-index: 9999
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
