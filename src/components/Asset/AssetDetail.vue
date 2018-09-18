<template>
  <transition name="fade">
    <div class="assetDetail">
      <m-header text="资产" :showBack="showBack" @back="handleBack"></m-header>
      <div class="box">
        <asset-top :item="assetDetail"></asset-top>
        <asset-content :item="assetDetail"></asset-content>
      </div>
    </div>
  </transition>
</template>

<script>
import MHeader from 'base/MHeader'
import AssetTop from 'base/Asset/Top'
import AssetContent from 'base/Asset/Content'

export default {
  name: 'AssetDetail',
  components: {
    MHeader,
    AssetTop,
    AssetContent
  },
  data() {
    return {
      showBack: true,
      assetDetail: null
    }
  },
  created() {
    this.getAssetDetail()
  },
  methods: {
    handleBack() {
      this.$router.back()
    },
    // 获取资产详情
    getAssetDetail() {
      this.$store.dispatch('GetAssetDetail').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        const result = res.result
        this.assetDetail = result
      }).catch(err => {
        console.log(err)
        this.$toast('获取资产详情失败', 'error')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position: absolute 
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
  overflow hidden
</style>
