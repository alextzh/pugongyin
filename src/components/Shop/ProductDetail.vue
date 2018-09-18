<template>
  <transition name="fade">
    <div class="product-detail">
      <div class="header" ref="head">
        <span class="icon" @click="back"><i class="iconfont icon-back"></i></span>
        <h3 ref="title">商品详情</h3>
      </div>
      <div class="box">
        <cube-scroll
          ref="scroll"
          :scroll-events="['scroll', 'before-scroll-start']"
          @scroll="onScrollHandle"
          @before-scroll-start="onBeforeScrollHandle"
        >
          <product-top></product-top>
        </cube-scroll>
      </div>
      <div class="btn" @click="onBuyHandle">立即兑换</div>
      <div class="mask" v-if="isSuccess">
        <div class="tip-box">
          <div class="action">
            <i @click="closeTip" class="iconfont icon-close"></i>
            <span class="split"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ProductTop from 'base/Shop/ProductTop'

export default {
  name: 'ProductDetail',
  components: {
    ProductTop
  },
  props: ['id'],
  data() {
    return {
      scrollY: 0,
      isSuccess: false,
      currentProduct: null
    }
  },
  created() {
    this.getProductDetail()
    this.getAllAsset()
  },
  methods: {
    // 返回按钮
    back() {
      this.$router.back()
    },
    // 获取资产总额
    getAllAsset() {
      this.$store.dispatch('GetAllAsset').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取商品详情
    getProductDetail() {
      this.$store.dispatch('GetProductDetail', this.id).then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        this.currentProduct = res.result
      }).catch(err => {
        console.log(err)
        this.$toast('获取商品详情失败', 'error')
      })
    },
    // 关闭成功提示框
    closeTip() {
      this.isSuccess = false
      setTimeout(() => {
        this.$router.replace({
          path: '/shop'
        })
      }, 500)
    },
    // 派发scroll事件
    onScrollHandle({y}) {
      this.scrollY = -y
    },
    onBeforeScrollHandle() {
      this.$refs.scroll.refresh()
    },
    onBuyHandle() {
      const data = {
        userId: localStorage.getItem('userId'),
        goodsId: this.id
      }
      if (this.currentProduct.goodsPrice > this.$store.getters.allAsset) {
        this.$alert('还差一点点，请继续加油挖金哦')
        return
      }
      this.$dialog('提示', `确定要兑换该商品吗`, () => {
        this.$store.dispatch('SubmitProductDetail', data).then(res => {
          if (res.code === 0) {
            this.$toast(res.msg, 'warn')
            return
          }
          this.isSuccess = true
        }).catch(err => {
          console.log(err)
          this.$toast('兑换商品失败', 'error')
        })
      }, () => {
        return false
      })
    }
  },
  watch: {
    // 监听scrollY
    scrollY(newVal, oldVal) {
      let percent
      if (newVal <= 0) {
        percent = 0
        this.$refs.head.style.background = 'transparent'
        this.$refs.head.style.color = '#000'
        this.$refs.title.style.opacity = 0
      } else if (newVal > 197) {
        percent = 1
        this.$refs.head.style.background = `rgba(254,117,39,1)`
        this.$refs.head.style.color = '#fff'
        this.$refs.title.style.opacity = 1
      } else {
        percent = newVal / 197
        this.$refs.head.style.background = `rgba(254,117,39,${percent})`
        this.$refs.head.style.color = '#fff'
        this.$refs.title.style.opacity = percent
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.product-detail
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
    align-items: center
    justify-content: center
    .tip-box
      position: relative
      width: 5.7rem
      height: 6.14rem
      background: #ff0000
      border-radius: 0.1rem
      background: url(../../common/image/success.png) no-repeat center center
      background-size: cover
      .action
        position: absolute 
        right: 0
        top: -1.08rem
        display: flex
        flex-direction: column
        align-items: center
        i 
          font-size: 0.5rem
          color: #fff
        .split
          flex: 1
          display: block
          height: 0.64rem;
          width: 1px;
          background: #fff;
          margin-left: 1px;
          margin-top: -0.04rem;
  .header
    position: absolute;
    z-index: 2;
    width: 100%;
    display: flex
    align-items: center
    height: 0.88rem
    justify-content: center
    .icon
      padding: 0 0.24rem;
      display: flex;
      height: 0.88rem;
      align-items: center;
      position: absolute;
      left: 0;
      z-index: 2
    h3
      flex: 1
      display: flex;
      font-size: 0.36rem;
      justify-content: center;
      opacity: 0
  .box
    overflow: hidden
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 1rem
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

