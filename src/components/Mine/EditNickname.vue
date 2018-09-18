<template>
  <div class="edit-information">
    <m-header text="设置昵称" :showBack="showBack" @back="back"></m-header>
    <form class="form">
      <div class="input-field border-bottom-1px">
        <input class="input" type="text" v-model="name" placeholder="请输入昵称" @change="checkNickname">
        <span v-show="showClose" @click="clearInput" class="close"><i class="iconfont icon-closefill"></i></span>
      </div>
      <div class="error-msg" :style="errorMsg ? 'visibility: visible;opacity: 1' : 'visibility: hidden;opacity: 0'">{{errorMsg}}</div>
      <a class="save" @click="saveNickname" href="javascript:;">确定</a>
    </form>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import {mapGetters} from 'vuex'
import Validate from 'common/js/validate'

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
      'nickname',
      'errorMsg'
    ])
  },
  created() {
    this.name = this.nickname
  },
  methods: {
    back() {
      this.$router.back()
    },
    checkNickname() {
      Validate.checkNickname(this.name)
    },
    clearInput() {
      this.showClose = false
      this.name = ''
    },
    saveNickname() {
      if (Validate.checkNickname(this.name)) {
        this.$store.commit('SET_NICKNAME', this.name)
        setTimeout(() => {
          this.$router.replace({
            path: '/editInformation'
          })
        })
      }
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
  padding: 1.32rem 0.24rem 0.44rem
  .input-field
    display: flex
    align-items: center
    justify-content: space-between
    height: 0.7rem
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
  .error-msg
    padding: 0 0.15rem
    height: 0.8rem
    display: flex
    align-items: center
    color: #cb1212
    font-size: 0.24rem
    visibility: hidden
    opacity: 0
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
    background: #fff1e9
    margin: 1.04rem auto
    &:active
      background: $color-theme
      color: #fff
</style>
