<template>
  <div class="message">
    <m-header :showBack="showBack" @back="back" text="消息"></m-header>
    <div class="list">
      <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        @pulling-down="onPullingDown"
      >
        <message-list :items="items"></message-list>
        <template slot="pulldown" slot-scope="props">
          <div v-if="props.pullDownRefresh"
            class="cube-pulldown-wrapper"
            :style="props.pullDownStyle">
            <div v-if="props.beforePullDown"
              class="before-trigger"
              :style="{paddingTop: props.bubbleY + 'px'}">
              <span :class="{rotate: props.bubbleY > 0}">↓</span>
            </div>
            <div class="after-trigger" v-else>
              <div v-show="props.isPullingDown" class="loading">
                <cube-loading></cube-loading>
              </div>
              <transition name="success">
                <div v-show="!props.isPullingDown" class="text-wrapper"><span class="refresh-text">更新完成</span></div>
              </transition>
            </div>
          </div>
        </template>
        <div v-show="items.length === 0 && noData">
          <no-data content="暂无消息记录"></no-data>
        </div>
        <loading></loading>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import MessageList from 'base/Message/MessageList'
import Loading from 'base/Loading'
import NoData from 'base/NoData'

export default {
  name: 'Shop',
  components: {
    MHeader,
    MessageList,
    Loading,
    NoData
  },
  data() {
    return {
      showBack: true,
      items: [],
      noData: false,
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 44,
          stopTime: 1000,
          txt: '更新成功'
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getMessageList()
    })
  },
  methods: {
    // 返回首页
    back() {
      this.$router.replace({
        path: '/home'
      })
    },
    // 获取消息记录
    getMessageList() {
      this.$store.dispatch('GetMessageList').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        const list = res.result
        if (list.length === 0) {
          this.noData = true
        } else {
          this.noData = false
        }
        this.items = list
      }).catch(err => {
        console.log(err)
        this.$toast('获取消息记录失败', 'error')
      })
    },
    onPullingDown() {
      setTimeout(() => {
        this.getMessageList()
        this.$refs.scroll.scrollTo(0, 26, 300)
      }, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
.cube-pulldown-wrapper
  text-align: center
  .before-trigger
    height: auto
    font-size: 30px
    align-self: flex-end
    span
      display: inline-block
      line-height: 1
      transition: all 0.3s
      color: #666
      padding: 10px 0
      &.rotate 
        transform: rotate(180deg)
  .after-trigger
    flex: 1
    margin: 0
    .text-wrapper
      margin: 0 auto
      margin-top: 14px
      padding: 5px 0
      color: #666
      font-size: 16px
      background-color: #fff
    .cube-loading
      display: flex;
      justify-content: center;
.list
  overflow: hidden
  position: absolute
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
</style>
