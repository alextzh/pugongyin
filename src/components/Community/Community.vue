<template>
  <div class="community">
    <header class="header">
      <span class="publish">发布</span>
      <span>社区</span>
    </header>
    <div class="container">
      <cube-scroll>
        <community-list></community-list>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import CommunityList from 'base/Community/CommunityList'

export default {
  name: 'Community',
  components: {
    MHeader,
    CommunityList
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.header
  position: relative
  height: 0.88rem
  display: flex
  align-items: center
  justify-content: center
  font-size: 0.36rem
  background: $color-theme
  color: #fff
  .publish
    position: absolute 
    top: 0
    right: 0
    font-size: 0.28rem
    color: #fff
    display: flex
    height: 0.88rem
    align-items: center
    padding: 0 0.24rem
.container
  position: absolute 
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0.42rem
  overflow: hidden
</style>
