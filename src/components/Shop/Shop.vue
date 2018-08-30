<template>
  <div>
    <m-header text="商城"></m-header>
    <div class="list">
      <cube-scroll
        ref="scroll"
        :options="options"
        @pulling-up="onPullingUp"
      >
        <m-swiper :imgs="imgs"></m-swiper>
        <sorting :items="items" @toDetail="toDetail" style="padding-top: 0.2rem" title="热门商品"></sorting>
        <div v-show="items.length === 0 && noData">
          <no-data content="暂无热门商品" :showImg="showImg"></no-data>
        </div>
        <loading></loading>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import MSwiper from 'base/MSwiper'
import Sorting from 'base/Shop/Sorting'
import Loading from 'base/Loading'
import NoData from 'base/NoData'

const imgs = [
  {
    id: 's1',
    imgUrl: './static/image/shop_banner1.jpg'
  },
  {
    id: 's2',
    imgUrl: './static/image/shop_banner2.jpg'
  },
  {
    id: 's3',
    imgUrl: './static/image/shop_banner3.jpg'
  }
]

export default {
  name: 'Shop',
  components: {
    MHeader,
    MSwiper,
    Sorting,
    Loading,
    NoData
  },
  data() {
    return {
      imgs: imgs,
      showImg: false,
      pullUpLoad: false,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      items: [],
      noData: false
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
      this.getProductList()
    })
  },
  methods: {
    // 跳转到商品详情
    toDetail(id) {
      this.$router.push({
        path: `/productDetail/${id}`
      })
    },
    // 获取商品列表
    getProductList() {
      this.$store.dispatch('GetProductList').then(res => {
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
        if (list && list.length > 12) {
          this.pullUpLoad = true
          this.items = list.slice(0, 12)
        } else {
          this.pullUpLoad = false
          this.items = list
        }
      }).catch(err => {
        console.log(err)
        this.$toast('获取热门商品失败', 'error')
      })
    },
    // 上拉加载获取更多
    onPullingUp() {
      const len = this.$store.getters.productList.length
      const newList = this.$store.getters.productList.slice(12, len)
      setTimeout(() => {
        this.items = this.items.concat(newList)
        this.$refs.scroll.forceUpdate()
        this.pullUpLoad = false
      }, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  overflow: hidden
  position: absolute
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
</style>
