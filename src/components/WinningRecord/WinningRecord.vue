<template>
  <div class="winning-record">
    <m-header text="我的奖励" :showBack="showBack" @back="handleBack"></m-header>
    <div class="box">
      <div class="tabBar border-bottom-1px">
        <cube-tab-bar v-model="selectedLabel"
                      showSlider
                      :useTransition="disabled"
                      ref="tabNav"
                      :data="tabLabels">
        </cube-tab-bar>
      </div>
      
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <!-- 未兑换 -->
          <cube-slide-item>
            <cube-scroll :data="rewardNo" :options="scrollOptions">
              <ul class="list">
                <li v-for="item in rewardNo" class="item" :key="item.winId">
                  <div class="left">
                    <img :src="item.prizeUrl" class="avatar">
                  </div>
                  <div class="right border-bottom-1px">
                    <div class="content">
                      <p class="desc">您刚刚获得一个{{item.prizeName}}</p>
                      <p class="tip">可领取</p>
                      <p class="time">{{item.createTime}}</p>
                    </div>
                    <p href="javascript:;" class="anchor" @touchend.stop.prevent="handleExchange(item)" :disabled="!item.receiveStatus === 0" :class="item.receiveStatus === 0 ? '' : 'disabled'">兑换</p>
                  </div>
                </li>
              </ul>
              <div v-show="rewardNo.length === 0 && noDataNo">
                <no-data content="暂无记录"></no-data>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <!-- 已兑换 -->
          <cube-slide-item>
            <cube-scroll :data="rewardYes" :options="scrollOptions">
              <ul class="list">
                <li v-for="item in rewardYes" class="item" :key="item.winId">
                  <div class="left">
                    <img :src="item.prizeUrl" class="avatar">
                  </div>
                  <div class="right border-bottom-1px">
                    <div class="content">
                      <p class="desc">您刚刚获得一个{{item.prizeName}}</p>
                      <p class="time" style="padding-top:0.25rem">{{item.receiveTime}}</p>
                    </div>
                    <span class="state" v-show="item.receiveStatus === 1">联系中</span>
                    <span class="icon" v-show="item.receiveStatus === 2"><i class="iconfont icon-yiduihuan"></i></span>
                  </div>
                </li>
              </ul>
              <div v-show="rewardYes.length === 0 && noDataYes">
                <no-data content="暂无记录"></no-data>
              </div>
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
        <loading></loading>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import Loading from 'base/Loading'
import NoData from 'base/NoData'
import {findIndex} from 'common/js/tool'

export default {
  name: 'WinningRecord',
  components: {
    MHeader,
    Loading,
    NoData
  },
  data() {
    return {
      showBack: true,
      rewardNo: [],
      rewardYes: [],
      noDataNo: false,
      noDataYes: false,
      selectedLabel: '未兑换',
      disabled: false,
      tabLabels: [{
        label: '未兑换'
      }, {
        label: '已兑换'
      }],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      scrollOptions: {
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    initialIndex() {
      let index = 0
      index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
      return index
    }
  },
  mounted() {
    this.getWinningRecord()
  },
  methods: {
    handleBack() {
      this.$router.back()
    },
    getWinningRecord() {
      this.$store.dispatch('GetWinningRecord').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        const result = res.result
        const noExchangeRecord = result.rewardNo
        const yesExchangeRecord = result.rewardYes
        this.noDataNo = noExchangeRecord.length === 0
        this.noDataYes = yesExchangeRecord.length === 0
        this.rewardNo = noExchangeRecord
        this.rewardYes = yesExchangeRecord
      }).catch(err => {
        console.log(err)
        this.$toast('获取奖励记录异常', 'error')
      })
    },
    handleExchange(item) {
      this.$store.dispatch('ExchangeReward', {winId: item.winId}).then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        console.log(res)
        this.selectedLabel = '已兑换'
      }).catch(err => {
        console.log(err)
        this.$toast('兑换失败', 'error')
      })
    },
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      this.getWinningRecord()
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.tabBar >>> .cube-tab-bar{
  width: 214px;
  height: 30px;
  font-size: 13px;
  color: #444;
  border: 1px solid $color-theme;
  background: #fff;
  letter-spacing: 2px;
  border-radius: 4px;
  box-sizing: border-box;
}
.tabBar >>> .cube-tab{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
}
.tabBar >>> .cube-tab_active{
  color: #ffffff
}
.tabBar >>> .cube-tab-bar-slider{
  height: 30px;
  background-color: $color-theme;
  z-index: 0;
  border-radius: 4px;
  bottom: -1px;
}

.box
  position: absolute
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
  overflow hidden
  .tabBar
    height: 1.04rem
    display: flex
    align-items center
    justify-content center
  .tab-slide-container
    position: absolute 
    top: 1.04rem
    left: 0
    right: 0
    bottom: 0
    overflow hidden
    .list
      padding: 0 0.24rem
      .item
        height: 1.3rem
        display: flex
        align-items center
        padding-left: 1.1rem;
        position: relative;
        .left
          width: 0.9rem
          display: flex
          align-items center
          margin-right: 0.2rem;
          position: absolute;
          left: 0;
          top: 0.2rem;
          border-radius: 0.1rem;
          background: #ddd;
          .avatar
            display block
            width: 0.9rem
            height: 0.9rem
            border-radius 0.1rem
            border: 0
        .right
          flex: 1
          display: flex
          justify-content center
          align-items center
          width: 100%
          .content
            height: 1.3rem
            flex: 1
            display: flex
            flex-direction column
            justify-content center
            align-items flex-start
            padding-right: 0.1rem
            no-wrap()
            .desc
              font-size: 0.24rem
              color: #444444
              letter-spacing: 1px
              max-width: 100%
              no-wrap()
            .tip
              font-size: 0.22rem
              color: $color-theme
              padding: 0.1rem 0
              letter-spacing: 1px
            .time
              font-size: 0.22rem
              color: #c5c5c5
              letter-spacing: 1px
          .anchor
            display: flex
            align-items center
            justify-content center
            width: 1.15rem
            height: 0.52rem
            border-radius 0.15rem
            background: $color-theme
            color: #fff
            font-size: 0.24rem
            letter-spacing: 1px
            box-shadow: 0.01rem 0.05rem 0.06rem rgba(23,114,184,.52)
            &.disabled
              background: #b2b2b2
              box-shadow: 0.01rem 0.05rem 0.06rem rgba(0,0,0,.29)
          .state
            font-size: 0.24rem
            letter-spacing: 1px
            color: $color-theme
          .icon
            display: flex;
            align-items: center;
            height: 1.3rem;
            margin-right: -0.04rem;
            i 
              font-size: 1rem;
              color: #db2048;
</style>
