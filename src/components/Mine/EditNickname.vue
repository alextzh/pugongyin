<template>
  <div class="edit-information">
    <m-header text="设置昵称" :showBack="showBack" @back="back"></m-header>
    <form class="form">
      <div class="input-field border-bottom-1px">
        <input class="input" type="text" v-model="name" placeholder="请输入昵称">
        <span v-show="showClose" @click="clearInput" class="close"><i class="iconfont icon-closefill"></i></span>
      </div>
      <a class="save" @click="saveNickname" href="javascript:;">保存</a>
    </form>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import {mapGetters} from 'vuex'

export default {
  name: 'EditNickname',
  components: {
    MHeader
  },
  data() {
    return {
      showBack: true,
      name: '',
      showClose: false
    }
  },
  computed: {
    ...mapGetters([
      'nickname'
    ])
  },
  created() {
    this.name = this.nickname
  },
  methods: {
    back() {
      this.$router.back()
    },
    clearInput() {
      this.showClose = false
      this.name = ''
    },
    saveNickname() {
      this.$store.commit('SET_NICKNAME', this.name)
      setTimeout(() => {
        this.$router.push({
          path: '/editInformation'
        })
      })
    }
  },
  watch: {
    name(newVal) {
      if (newVal) {
        this.showClose = true
      } else {
        this.showClose = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.form
  padding: 0.44rem 0.24rem
  .input-field
    display: flex
    align-items: center
    justify-content: space-between
    height: 0.7rem
    // border-bottom: 1px solid #e8e8e8
    .input
      flex: 1
      font-size: 0.32rem
      color: #444444
      padding: 0.16rem 0
      outline: none
    .close
      display: flex
      padding: 0.2rem
      i 
        font-size: 0.24rem
        color: #949494
  .save
    display: block
    width: 3.16rem
    height: 0.7rem
    text-align: center
    line-height: 0.7rem
    border: 1px solid $color-theme
    box-sizing: border-box
    border-radius: 0.35rem
    font-size: 0.3rem
    color: $color-theme
    background: #edf4fd
    margin: 1.04rem auto
    &:active
      background: $color-theme
      color: #fff
</style>
