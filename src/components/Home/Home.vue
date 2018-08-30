<template>
  <div class="home">
    <home-header @handleClick="handleClick"></home-header>
    <div class="list">
      <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        @pulling-up="onPullingUp">
        <m-swiper :imgs="imgs"></m-swiper>
        <capital></capital>
        <hot-ad @toDetail="toDetail" :items="items"></hot-ad>
        <div v-show="items.length === 0 && noData">
          <no-data content="暂无热门广告" :showImg="showImg"></no-data>
        </div>
        <loading></loading>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import HomeHeader from 'base/Home/HomeHeader'
import MTabbar from 'base/MTabbar'
import MSwiper from 'base/MSwiper'
import Capital from 'base/Home/Capital'
import HotAd from 'base/Home/HotAd'
import Loading from 'base/Loading'
import NoData from 'base/NoData'

const imgs = [
  {
    id: 'w1',
    imgUrl: './static/image/banner1.jpg'
  },
  {
    id: 'w2',
    imgUrl: './static/image/banner2.jpg'
  }
]

export default {
  name: 'Home',
  components: {
    HomeHeader,
    MSwiper,
    Capital,
    HotAd,
    Loading,
    MTabbar,
    NoData
  },
  data() {
    return {
      items: [],
      noData: false,
      showIcon: true,
      showImg: false,
      pullUpLoad: false,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      imgs: imgs
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
    this.$nextTick(() => {
      this.getAdList()
      if (this.$store.getters.userId && this.$store.getters.isLogin) {
        this.getDayAsset()
        this.getAllAsset()
        this.getMessageState()
      }
    })
  },
  methods: {
    // 跳转到消息列表页面
    handleClick() {
      if (this.$store.getters.userId && this.$store.getters.isLogin) {
        this.$store.dispatch('ModifyMessageState').then(() => {
          console.log('更新消息成功')
        }).catch(err => {
          console.log(err)
          console.log('更新消息失败')
        })
      }
      this.$router.push({
        path: '/message'
      })
    },
    // 跳转到广告详情页面
    toDetail(id) {
      this.$router.push({
        path: `/ad/${id}`
      })
    },
    // 获取广告列表
    getAdList() {
      this.$store.dispatch('GetHomeAdList').then((res) => {
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
        this.$toast('获取广告详情失败', 'error')
      })
    },
    // 上拉加载获取更多
    onPullingUp() {
      const len = this.$store.getters.adList.length
      const newList = this.$store.getters.adList.slice(5, len)
      setTimeout(() => {
        this.items = this.items.concat(newList)
        this.$refs.scroll.forceUpdate()
        this.pullUpLoad = false
      }, 500)
    },
    // 获取是否有未读消息
    getMessageState() {
      this.$store.dispatch('GetMessageState').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
      }).catch(err => {
        console.log(err)
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
    },
    // 获取当日资产
    getDayAsset() {
      this.$store.dispatch('GetDayAsset').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
      }).catch(err => {
        console.log(err)
        this.$toast('获取今日收益失败', 'error')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.list >>> .cube-pullup-wrapper .before-trigger{
  font-size: 0.28rem;
  color: #999;
}
.list
  overflow: hidden
  position: absolute
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0.5rem
</style>


