<template>
  <div class="profitRecord">
    <ul class="record" v-if="items.length > 0">
      <li class="item border-bottom-1px" v-for="item in items" :key="item.accountId">
        <p class="icon"><i class="iconfont " :class="item.type === 'shouru' ? 'icon-shouru' : 'icon-zhichu'" :style="item.debit - item.credit >= 0 ? 'color:#e47070' : 'color:#70ae7e'"></i></p>
        <div class="content">{{item.note}}<span :style="item.debit - item.credit >= 0 ? 'color:#e47070' : 'color:#70ae7e'">{{item.debit - item.credit >= 0 ? `+${item.debit - item.credit}` : item.debit - item.credit}}DDO</span></div>
        <span class="time">{{item.createTimeStr}}</span>
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
.profitRecord
  position: relative
  display: flex
  flex-direction: column
  justify-content: center
  .item
    display: flex
    flex-direction: row
    align-items: center
    min-height: 0.9rem
    padding: 0 0.23rem
    box-sizing: border-box
    line-height: 1.5
    .icon
      width: 0.28rem
      padding-right: 0.15rem
      display: flex
      align-items: center
      i 
        font-size: 0.32rem;
    .content
      flex: 1
      display: flex
      align-items: center
      font-size: 0.28rem
      color: #444
      width: 100%;
      padding: 0.1rem 0;
    .time
      display: inline-block
      padding-left: 0.1rem
      font-size: 0.24rem
      color: #9a9a9a
</style>

