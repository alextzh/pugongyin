<template>
  <div class="capital">
    <home-title content="我的资产"></home-title>
    <div class="card-list">
      <div class="card-box" @click="toAssertDetail">
        <div class="card">
          <div class="media">
            <i class="iconfont icon-moneybag"></i>
          </div>
          <div class="txt">
            <p class="arm"><span>{{formatAllAsset}}</span>(DDO)</p>
            <p class="tit">累计收益</p>
          </div>
        </div>
      </div>
      <div class="card-box" @click="toAssertDetail">
        <div class="card">
          <div class="media">
            <i style="font-size: 0.65rem" class="iconfont icon-money"></i>
          </div>
          <div class="txt">
            <p class="arm"><span>{{formatdayAsset}}</span>(DDO)</p>
            <p class="tit">今日收益</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTitle from 'base/Home/HomeTitle'
import {mapGetters} from 'vuex'

export default {
  name: 'Capital',
  components: {
    HomeTitle
  },
  computed: {
    formatAllAsset() {
      return this.allAsset > 9999 ? Math.round((this.allAsset / 10000) * 100) / 100 + '万' : this.allAsset
    },
    formatdayAsset() {
      return this.dayAsset > 9999 ? Math.round((this.dayAsset / 10000) * 100) / 100 + '万' : this.dayAsset
    },
    ...mapGetters([
      'allAsset',
      'dayAsset'
    ])
  },
  methods: {
    toAssertDetail() {
      this.$router.push({
        path: '/assetDetail'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.capital
  padding: 0.2rem 0.24rem
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
  .card-list
    padding: 0.24rem 0
    display: flex
    justify-content: space-between
    .card-box
      width: 50%
      box-sizing: border-box
      padding: 0 0.18rem
      .card
        overflow: hidden
        width: 100%
        height: 1.24rem
        padding: 0.3rem
        box-sizing: border-box
        background: #ffffff
        border-radius: 0.08rem
        box-shadow: 0 0 0.1rem rgba(0,0,0,0.14)
        display: flex
        align-items: center
        justify-content: center
        .media
          width: 0.6rem
          height: 0.6rem
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.2rem
          i 
            font-size: 0.7rem
            color: $color-theme
        .txt
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          .arm
            font-size: 0.24rem
            color: $color-theme
            padding-bottom: 0.15rem
            span 
              font-size: 0.36rem
              font-weight: 600
              padding-right: 0.1rem
          .tit
            color: #666
            font-size: 0.28rem
            letter-spacing:1px
@media (max-width: 450px) {
  .arm {
    max-width: 2rem
    no-wrap()
  }
}
</style>

