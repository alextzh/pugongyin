<template>
  <transition name="fade">
    <div class="ad-detail">
      <m-header text="广告详情" :showBack="showBack" :showIcon="showIcon" icon="icon-forward" @back="handleBack" @handleClick="handleIcon"></m-header>
      <div class="content">
        <cube-scroll
          ref="scroll"
          :scroll-events="['before-scroll-start']"
          @before-scroll-start="onBeforeScrollHandle"
        >
          <ad-content @timeLeft="timeLeft"></ad-content>
        </cube-scroll>
      </div>
      <div class="btn" @click="submitAdDetail">提交</div>
      <div class="mask" v-if="showTip">
        <div class="tip-box">
          <p class="context">挖矿成功！获得 {{profit}} DDO</p>
        </div>
        <a class="button" href="javascript:;" @click="closeTip">确定</a>
      </div>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import MHeader from 'base/MHeader'
import AdContent from 'base/Ad/AdContent'
import {mapGetters} from 'vuex'

export default {
  name: 'AdDetail',
  components: {
    MHeader,
    AdContent
  },
  props: ['id'],
  data() {
    return {
      showBack: true,
      showIcon: true,
      showTip: false,
      count: 0,
      profit: 0
    }
  },
  computed: {
    ...mapGetters([
      'flag',
      'machineNum',
      'userId'
    ])
  },
  mounted() {
    this.getAdDetail()
    this.$refs.scroll.refresh()
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (this.count !== 0) {
      this.$dialog('提示', `广告还有${this.count}s播放完毕,请继续观看`, () => {
        next(false)
      }, () => {
        next()
      })
    } else {
      next()
    }
  },
  methods: {
    timeLeft(count) {
      this.count = count
    },
    closeTip() {
      this.showTip = false
      setTimeout(() => {
        this.$router.push({
          path: '/home'
        })
      }, 1000)
    },
    handleBack() {
      this.$router.back()
    },
    handleIcon() {
      console.log('分享')
    },
    onBeforeScrollHandle() {
      this.$refs.scroll.refresh()
    },
    getAdDetail() {
      this.$store.dispatch('GetAdDetail', this.id).then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
      }).catch(err => {
        console.log(err)
        this.$toast('获取广告详情失败', 'error')
      })
    },
    submitAdDetail() {
      if (!this.flag) {
        this.$toast(`${this.count}s结束后可提交`, 'warn')
        return
      }
      if (this.machineNum && this.machineNum !== '123456') {
        const params = {
          machineNum: this.machineNum,
          userId: this.userId,
          advertId: this.id
        }
        this.$store.dispatch('SubmitScanAdDetail', params).then(res => {
          if (res.code === 0) {
            this.$toast(res.msg, 'warn')
            return
          }
          let result = res.result
          this.profit = result
          this.showTip = true
        }).catch(err => {
          console.log(err)
          this.$toast('提交失败', 'error')
        })
      } else {
        this.$store.dispatch('SubmitAdDetail', this.id).then(res => {
          if (res.code === 0) {
            this.$toast(res.msg, 'warn')
            return
          }
          let result = res.result
          this.profit = result
          this.showTip = true
        }).catch(err => {
          console.log(err)
          this.$toast('提交失败', 'error')
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.ad-detail
  .mask
    position: fixed 
    z-index: 999
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0,0,0,0.7)
    overflow: hidden
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    .tip-box
      position: relative
      width: 5.7rem
      height: 6.14rem
      background: #ff0000
      border-radius: 0.1rem
      background: url(../../common/image/wk_success.jpg) no-repeat center center
      background-size: cover
      .context
        margin-top: 4.6rem
        font-size: 0.26rem
        color: #fff
        text-align: center
    .button
      display: block
      width: 3.16rem
      height: 0.7rem
      text-align: center
      line-height: 0.7rem
      border: 1px solid $color-theme
      box-sizing: border-box
      border-radius: 0.35rem
      font-size: 0.3rem
      color: $color-theme
      background: #edf4fd
      margin: 1.04rem auto
      &:active
        background: $color-theme
        color: #fff
  .content
    position: absolute
    top: 0.88rem
    bottom: 1rem
    left: 0
    right: 0
    overflow: hidden
  .btn
    position: absolute 
    left: 0
    right: 0
    bottom: 0
    z-index: 9
    background: $color-theme
    color: #ffffff
    height: 1rem
    line-height: 1rem
    text-align: center
    font-size: 0.32rem
</style>

