<template>
  <div class="hotAd">
    <div class="head">
      <home-title content="热门广告"></home-title>
    </div>
    <div class="ad-list">
      <div v-if="items.length > 0" class="ad-item border-bottom-1px" v-for="(item, index) in items" :key="item.advertId" @click="toDetail(item.advertId, index)">
        <div class="ad-title">
          <img class="image" :src="item.brandUrl" alt="">
          <h4 class="title">{{item.brandName}}</h4>
          <p class="time">{{item.createTime}}</p>
        </div>
        <div class="ad-media">
          <img :src="item.miniImageUrl" alt="">
        </div>
        <div class="ad-detail">{{item.sologn}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTitle from 'base/Home/HomeTitle'

export default {
  name: 'HotAd',
  components: {
    HomeTitle
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    toDetail(id, index) {
      this.$store.commit('SET_ACTIVE_INDEX', index)
      this.$emit('toDetail', id)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.hotAd
  overflow: hidden
  display: flex
  flex-direction: column
  .head
    padding: 0 0.24rem
  .ad-list
    .ad-item
      padding: 0 0.24rem
      &:last-child
        &.border-bottom-1px
          &::after
            border-bottom: 0
      .ad-title
        position: relative
        display: flex
        flex-direction: row
        height: 0.5rem
        align-items: center
        padding: 0.2rem 0 0.16rem
        .image
          display: inline-block
          width: 0.5rem
          height: 0.5rem
          border-radius: 50%
          background: rgba(0,0,0,.1)
          border: 0
        .title
          flex: 1
          font-size: 0.32rem
          color: #666
          padding: 0 0.2rem
          no-wrap()
        .time
          font-size: 0.24rem
          color: #7b7b7b
          padding: 0.1rem 0
      .ad-media
        width: 100%
        height: 2.38rem
        border-radius: 0.1rem
        overflow: hidden
        img 
          width: 100%
          height: 100%
          border: none 
          display: block
          background: rgba(0,0,0,.1)
          border-radius: 0.1rem
      .ad-detail
        min-width: 0
        font-size: 0.28rem
        color: #444
        padding: 0.16rem 0 0.2rem
        no-wrap()
</style>

