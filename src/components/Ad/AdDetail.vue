<template>
  <div class="ad-detail">
    <m-header text="广告详情" :showBack="showBack" @back="handleBack"></m-header>
    <div class="content">
      <cube-scroll
        ref="scroll"
        :scroll-events="['before-scroll-start']"
        @before-scroll-start="onBeforeScrollHandle"
      >
        <ad-content :plays="plays"></ad-content>
      </cube-scroll>
    </div>
    <div class="btn" v-if="btnType === 1">
      <percent-btn :value="timer" type="rect" :options="options"></percent-btn>
    </div>
    <div class="btn-disabled" v-show="!flag"></div>
    <div class="btn" v-if="btnType === 3">
      <input style="background: #e8e8e8" class="input-btn" :value="btnText" text="button" readyonly :disabled="btnType === 3" >
    </div>
    <div class="btn" v-if="btnType === 2" @click="nextAdDetail">
      <input :style="btnDisabled ? 'background: #e8e8e8' : 'background:#fe7527'" class="input-btn" :value="btnText" text="button" readonly :disabled="btnDisabled">
    </div>
    <div class="btn" v-if="btnType === 4" @click="handleLottery">
      <input class="input-btn" value="抽奖" text="button" readonly>
    </div>
    <div class="btn" v-if="btnType === 5" @click="handleShowProfit">
      <input class="input-btn" value="领取收益" text="button" readonly>
    </div>
    <div class="btn">
      <span v-if="showNice" class="tip-box">+{{profit}} DDO</span>
    </div>
    <submit-loading></submit-loading>
  </div>
</template>

<script>
/* eslint-disable */
import MHeader from 'base/MHeader'
import AdContent from 'base/Ad/AdContent'
import SubmitLoading from 'base/SubmitLoading'
import {mapGetters} from 'vuex'

export default {
  name: 'AdDetail',
  components: {
    MHeader,
    AdContent,
    SubmitLoading
  },
  props: ['id'],
  data() {
    return {
      showBack: true,
      flag: false, // 是否可点击
      showNice: false,
      profit: 0,
      btnType: 0, // 1:进度按钮 2：下一条 3：广告已观看 4:抽奖 5：领取收益
      btnText: '下一条',
      btnDisabled: false,
      plays: 0,
      campaignNum: ''
    }
  },
  computed: {
    options() {
      return {
        textColor: 'rgb(255,255,255)',
        text: function(value) {
          if (value !== 100) {
            return `<span style="font-size:0.32rem;letter-spacing:1px;vertical-align: middle">挖金中</span>`
          } else {
            return `<span style="font-size: 0.32rem;letter-spacing:1px;vertical-align: middle">挖金完成</span>`
          }
        },
        pathColors: ['#c5c5c5', '#fe7527'],
        duration: 5000,
        rectWidth: this.reactWidth,
        rectHeight: this.reactHeight,
        rectRadius: 5
      }
    },
    reactWidth() {
      return window.screen.width * 702 / 750
    },
    reactHeight() {
      return window.screen.height * 88 / 1334
    },
    ...mapGetters([
      'machineNum',
      'userId',
      'timer',
      'activeIndex',
      'adList'
    ])
  },
  mounted() {
    this.getAdDetail(this.id)
  },
  watch: {
    timer(newVal) {
      this.flag = newVal === 100
      if (newVal === 100) {
        this.submitAdDetail()
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    const newId = to.params.id
    next()
    this.getAdDetail(newId)
  },
  beforeRouteLeave(to, from, next) {
    if (!this.flag && this.timer !== 100 && this.btnType === 1) {
      this.$store.commit('SET_STOP', true)
      this.$dialog('提示', `广告还没有播放完毕,请继续观看`, () => {
        next(false)
        this.$store.commit('SET_STOP', false)
        this.$store.dispatch('RunTimer')
      }, () => {
        next()
      })
    } else {
      next()
    }
  },
  methods: {
    handleBack() {
      this.$router.replace({
        path: '/home'
      })
    },
    getAdDetail(id) {
      let machineNum = this.machineNum ? this.machineNum : ''
      const params = {
        advertId: id,
        userId: this.userId,
        machineNum: machineNum
      }
      this.$store.dispatch('GetAdDetail', params).then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          setTimeout(() => {
            this.$router.replace({
              path: '/home'
            })
          }, 500)
          return
        }
        this.plays = res.result.plays
        const watchNum = res.result.watchNum
        this.campaignNum = res.result.campaignNum
        this.btnType = watchNum ? 3 : 1
        if (this.btnType === 1) {
          this.flag = false
          this.showNice = false
          this.$store.commit('SET_START', 0)
          this.$store.commit('SET_STOP', false)
          this.$store.dispatch('RunTimer')
        } else if (this.btnType === 3) {
          this.btnText = '广告已观看'
        }
      }).catch(err => {
        console.log(err)
        this.$toast('获取广告详情失败', 'error')
      })
    },
    handleLottery() {
      this.$store.dispatch('IsWinning', {advertId: this.id, userId: this.userId}).then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'correct')
          if (this.machineNum) {
            this.$store.commit('SET_MACHINE_NUM', '')
            setTimeout(() => {
              this.$router.replace({
                path: '/home'
              })
            }, 2000)
          } else {
            this.btnType = 2
          }
        } else {
          this.$toast(res.msg, 'correct')
          this.$store.commit('SET_WIN_RESULT', res.result)
          this.$store.commit('SET_MACHINE_NUM', '')
          setTimeout(() => {
            this.$router.replace({
              path: '/winning'
            })
          }, 500)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    nextAdDetail() {
      console.log(this.activeIndex, this.adList.length)
      let adLen = this.adList.length - 1
      if (this.activeIndex === adLen) {
        this.btnText = '这是最后一条'
        this.btnDisabled = true
      } else {
        let nextIndex = this.activeIndex + 1
        this.$store.commit('SET_ACTIVE_INDEX', nextIndex)
        this.btnText = '下一条'
        this.btnDisabled = false
        let adId = this.adList[nextIndex].advertId
        this.$router.replace({
          path: `/ad/${adId}`
        })
      }
    },
    onBeforeScrollHandle() {
      this.$refs.scroll.refresh()
    },
    handleShowProfit() {
      if (this.machineNum) {
        this.showNice = true
        if (this.campaignNum) {
          setTimeout(() => {
            this.btnType = 4
          }, 3000)
        } else {
          setTimeout(() => {
            this.$store.commit('SET_MACHINE_NUM', '')
            this.$router.replace({
              path: '/home'
            })
          }, 3000)
        }
      }
    },
    submitAdDetail() {
      this.$store.commit('SET_SUBLOADING', true)
      if (this.machineNum) {
        const params = {
          machineNum: this.machineNum,
          userId: this.userId,
          advertId: this.id
        }
        this.$store.dispatch('SubmitScanAdDetail', params).then(res => {
          this.$store.commit('SET_SUBLOADING', false)
          if (res.code === 0) {
            this.$toast(res.msg, 'warn')
            setTimeout(() => {
              this.$store.commit('SET_MACHINE_NUM', '')
              this.$router.replace({
                path: '/home'
              })
            }, 500)
            return
          }
          this.profit = res.result
          this.plays++
          this.btnType = 5
        }).catch(err => {
          this.$store.commit('SET_SUBLOADING', false)
          console.log(err)
          this.$toast('网络超时', 'error')
        })
      } else {
        this.$store.dispatch('SubmitAdDetail', this.id).then(res => {
          this.$store.commit('SET_SUBLOADING', false)
          if (res.code === 0) {
            this.$toast(res.msg, 'warn')
            if (this.campaignNum) {
              setTimeout(() => {
                this.btnType = 4
              }, 500)
            } else {
              setTimeout(() => {
                this.btnType = 2
              }, 500)
            }
            return
          }
          this.profit = res.result
          this.showNice = true
          this.plays++
          if (this.campaignNum) {
            setTimeout(() => {
              this.btnType = 4
            }, 3000)
          } else {
            setTimeout(() => {
              this.btnType = 2
            }, 3000)
          }
        }).catch(err => {
          this.$store.commit('SET_SUBLOADING', false)
          console.log(err)
          this.$toast('网络超时', 'error')
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
  .content
    position: absolute
    top: 0.88rem
    bottom: 1.2rem
    left: 0
    right: 0
    overflow: hidden
  .btn
    position: absolute 
    left: 0
    right: 0
    bottom: 0
    z-index: 9
    padding: 0 0.24rem
    .tip-box
      position: absolute 
      top: 0
      left: 50%
      animation: niceIn 3s ease-in-out
      font-size: 0.24rem
      color: $color-theme
      transform: translateX(-50%)
    .input-btn
      height: 0.88rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 0.16rem;
      font-size: 0.32em;
      text-align: center;
      background: #fe7527;
      color: #fff;
      border-radius: 5px;
      letter-spacing: 1px;
  .btn-disabled
    position: absolute 
    left: 0
    right: 0
    bottom: 0
    height: 1.1rem
    z-index: 10
    padding: 0 0.24rem

@keyframes niceIn{
  0%{
    opacity: 0;
    top: 0;
    font-size: 0.2rem;
  }
  25%{
    opacity: 0.5
    top: -1.5rem;
    font-size: 0.3rem;
  }
  50%{
    opacity: 0.75
    top: -2rem;
    font-size: 0.5rem;
  }
  75%{
    opacity: 1;
    top: -2rem;
    font-size: 0.5rem;
  }
  100%{
    opacity: 0;
    top: -2rem;
    font-size: 0.5rem;
  }
}
</style>

