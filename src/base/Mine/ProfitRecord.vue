<template>
  <div class="profitRecord">
    <home-title content="收益记录"></home-title>
    <ul class="record" v-if="items.length > 0">
      <li class="item" v-for="item in items" :key="item.accountId">
        <span class="icon"><i class="iconfont " :class="item.type === 'shouru' ? 'icon-shouru' : 'icon-zhichu'" :style="item.debit - item.credit >= 0 ? 'color:#e47070' : 'color:#70ae7e'"></i></span>
        <div class="detail border-bottom-1px">
          <span class="name">{{item.note}}</span>
          <div class="profit" :style="item.debit - item.credit >= 0 ? 'color:#e47070' : 'color:#70ae7e'">
            <span>{{item.debit - item.credit >= 0 ? `+${item.debit - item.credit}` : item.debit - item.credit}}</span>
            DDO
          </div>
          <span class="time">{{item.createTimeStr}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import HomeTitle from 'base/Home/HomeTitle'

export default {
  name: 'ProfitRecord',
  components: {
    HomeTitle
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.record
  padding: 0.3rem
  display: flex
  flex-direction: column
  .item
    height: 0.7rem
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    .icon
      display: flex
      width: 0.36rem
      height: 0.7rem
      align-items: center
      justify-content: center
      margin-right: 0.3rem
      i 
        font-size: 0.36rem
    .detail
      flex: 1
      height: 0.7rem
      display: flex
      align-items: center
      justify-content: space-between
      box-sizing: border-box
      // border-bottom: 1px solid #e8e8e8
      .name
        font-size: 0.28rem
        color: #444444
      .profit
        flex: 1
        font-size: 0.26rem
        color: #54a166
      .time
        font-size: 0.22rem
        color: #7c7c7c
        display: inline-block
        width: 1.3rem
        text-align: right
        no-wrap()
    &:last-child
      .border-bottom-1px
        &::after
          border-bottom: 0
@media (min-width: 640px) {
  .name {
    width: 5rem
    no-wrap()
  }
}
@media (min-width: 450px) and (max-width: 640px) {
  .name {
    width: 4rem
    no-wrap()
  }
}
@media (max-width: 450px) {
  .name {
    width: 2.7rem
    no-wrap()
  }
}
</style>

