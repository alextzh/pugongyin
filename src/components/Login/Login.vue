<template>
  <transition name="slide">
    <div id="login">
      <m-header text="手势密码登陆"></m-header>
      <div class="box">
        <img class="image" :src="avatar" alt="头像">
        <div class="title">您好，{{mobile}}</div>
        <gesture :tip="tip"></gesture>
      </div>
      <div class="btn_area">
        <router-link class="link" to="/register" @click.native="switchAccount">切换账号</router-link>
        <router-link class="link" to="/resetPassword">重置密码</router-link>
      </div>
    </div>
  </transition>
</template>

<script>
import MHeader from 'base/MHeader'
import Gesture from 'base/Gesture'
import {mapGetters} from 'vuex'
import {formatMobile} from 'common/js/tool'

export default {
  name: 'Login',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (vm.$store.getters.password && vm.$store.getters.mobile && vm.$store.getters.userId) {
        next()
      } else {
        next('/mobileLogin')
      }
    })
  },
  data() {
    return {
      tip: '请输入手势密码',
      mobile: ''
    }
  },
  created() {
    this.mobile = window.localStorage.getItem('mobile') ? formatMobile(window.localStorage.getItem('mobile')) : ''
    this.getUserInfo()
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    switchAccount() {
      this.$store.commit('DEL_PASSWORD', '')
      this.$router.push({
        path: '/mobileLogin'
      })
    },
    getUserInfo() {
      this.$store.dispatch('GetUserInfo').then((res) => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        this.$store.commit('SET_USER_INFO', res.result)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    MHeader,
    Gesture
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.box
  box-sizing:border-box
  margin-top: 0.9rem
  width: 100%;
  padding: 0 0.84rem
  display: flex
  flex-direction: column
  align-items: center
  .image
    display: inline-block
    width: 1.7rem
    height: 1.7rem
    margin-bottom: 0.5rem
    border-radius: 50%
    box-shadow: 0 0 0.13rem rgba(0, 0, 0, .32)
  .title
    font-weight: 600
    font-size: 0.32rem
    margin-bottom: 0.24rem
    color: #666
.btn_area
  display: flex
  justify-content: center
  .link
    color: $color-theme
    font-size: 0.32rem
    &:active
      opacity: 0.7
    &:first-child
      padding-right: 0.2rem
    &:last-child
      padding-left: 0.2rem
</style>


