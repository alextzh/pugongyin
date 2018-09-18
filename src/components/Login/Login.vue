<template>
  <transition name="slide">
    <div id="login">
      <m-header text="手势密码登陆"></m-header>
      <div class="container">
        <cube-scroll
          ref="scroll"
          :scroll-events="['before-scroll-start']"
          @before-scroll-start="onBeforeScrollHandle">
          <div class="box">
            <img class="image" :src="avatar" alt="头像">
            <div class="title">您好，{{mobile}}</div>
            <gesture :tip="tip" @onUnLock="handleUnLockSuccess"></gesture>
            <div class="btn_area">
              <a class="link" @click="resetPassword">重置密码</a>
            </div>
          </div>
        </cube-scroll>
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
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     // 通过 `vm` 访问组件实例
  //     if (vm.$store.getters.password && vm.$store.getters.mobile && vm.$store.getters.userId) {
  //       next()
  //     } else {
  //       next('/mobileLogin')
  //     }
  //   })
  // },
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
    handleUnLockSuccess() {
      this.$toast('登录成功', 'correct')
      if (this.$route.query.redirect) {
        setTimeout(() => {
          this.$router.replace({
            path: this.$route.query.redirect
          })
        }, 500)
      } else {
        setTimeout(() => {
          this.$router.replace({
            path: '/home'
          })
        }, 500)
      }
    },
    onBeforeScrollHandle() {
      this.$refs.scroll.refresh()
    },
    resetPassword() {
      this.$store.commit('SET_MODIFY_STATE', 1)
      this.$router.push({
        path: '/vertifyCode'
      })
    },
    getUserInfo() {
      this.$store.dispatch('GetUserInfo').then((res) => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        this.$store.commit('SET_MOBILE', res.result.phoneNo)
        this.$store.commit('SET_USERID', res.result.userId)
        this.$store.commit('SET_USER_INFO', res.result)
        this.$store.commit('SET_PASSWORD', res.result.userPassword)
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

.container
  position: absolute 
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
  overflow hidden
  .box
    box-sizing:border-box
    width: 100%;
    padding: 0.9rem 0.84rem 0.6rem
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


