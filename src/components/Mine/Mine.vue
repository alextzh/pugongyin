<template>
  <div class="mine">
    <mine-top></mine-top>
    <div class="content-box">
      <feature></feature>
    </div>
  </div>
</template>

<script>
import MineTop from 'base/Mine/MineTop'
import Feature from 'base/Mine/Feature'

export default {
  name: 'Mine',
  components: {
    Feature,
    MineTop
  },
  mounted() {
    this.getUserInfo()
    this.getAllAsset()
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.$store.dispatch('GetUserInfo').then((res) => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        this.$store.commit('SET_PASSWORD', res.result.userPassword)
      }).catch((err) => {
        console.log(err)
        this.$toast('获取用户信息失败', 'error')
      })
    },
    // 获取总资产
    getAllAsset() {
      this.$store.dispatch('GetAllAsset').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
      }).catch(err => {
        console.log(err)
        this.$toast('获取累计收益失败', 'error')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.content-box >>> .cube-pullup-wrapper .before-trigger{
  font-size: 0.28rem;
  color: #999;
}
.content-box
  position: absolute
  z-index: 0
  top: 3.7rem
  left: 0
  right: 0
  bottom: 0.5rem
</style>
