<template>
  <div class="mine">
    <mine-top></mine-top>
    <div class="content-box">
      <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        @pulling-up="onPullingUp">
        <feature></feature>
        <div class="profit-box">
          <profit-record :items="items"></profit-record>
          <div v-show="items.length === 0 && noData">
            <no-data content="暂无收益记录" :showImg="showImg"></no-data>
          </div>
          <loading></loading>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import MineTop from 'base/Mine/MineTop'
import Feature from 'base/Mine/Feature'
import ProfitRecord from 'base/Mine/ProfitRecord'
import Loading from 'base/Loading'
import NoData from 'base/NoData'

export default {
  name: 'Mine',
  components: {
    ProfitRecord,
    Feature,
    MineTop,
    Loading,
    NoData
  },
  data() {
    return {
      items: [],
      noData: false,
      showImg: false,
      pullUpLoad: false,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了'
    }
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj
      }
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      } : false
    }
  },
  mounted() {
    this.getUserInfo()
    this.getProfitRecord()
    this.getAllAsset()
  },
  methods: {
    // 获取收益记录
    getProfitRecord() {
      this.$store.dispatch('GetProfitRecord').then(res => {
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
        if (list && list.length > 5) {
          this.pullUpLoad = true
          this.items = list.slice(0, 5)
        } else {
          this.pullUpLoad = false
          this.items = list
        }
      }).catch(err => {
        console.log(err)
        this.$toast('获取收益记录失败', 'error')
      })
    },
    // 上拉加载获取更多
    onPullingUp() {
      const len = this.$store.getters.profitRecord.length
      const newList = this.$store.getters.profitRecord.slice(5, len)
      setTimeout(() => {
        this.items = this.items.concat(newList)
        this.$refs.scroll.forceUpdate()
        this.pullUpLoad = false
      }, 500)
    },
    // 获取用户信息
    getUserInfo() {
      this.$store.dispatch('GetUserInfo').then((res) => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
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
  .profit-box
    padding: 0.3rem 0.24rem 0
</style>
