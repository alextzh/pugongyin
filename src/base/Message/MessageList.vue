<template>
  <div class="message-list">
    <ul v-if="items.length > 0">
      <li class="item border-bottom-1px" v-for="list in items" :key="list.messageId">
        <p class="icon"><i class="iconfont icon-radio" style="color:#1e993a"></i></p>
        <div class="content">{{list.messageNote}}</div>
        <span class="time">{{list.createTimeStr}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MessageList',
  props: {
    items: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.message-list
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

