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
    height: 0.9rem
    padding: 0 0.23rem
    // border-bottom: 1px solid #e8e8e8
    box-sizing: border-box
    .icon
      width: 0.28rem
      height: 0.9rem
      padding-right: 0.15rem
      display: flex
      align-items: center
      i 
        font-size: 0.32rem;
        margin-top: -3px;
    .content
      flex: 1
      font-size: 0.28rem
      color: #444
      no-wrap()
    .time
      display: inline-block
      padding: 0
      font-size: 0.24rem
      color: #9a9a9a
</style>

