<template>
  <transition name="slide">
    <div class="register">
      <m-header :showBack="showBack" @back="back" text="设置手机号"></m-header>
      <form class="form_area" method="post">
        <div class="input_area">
          <div class="mobile">
            <label for="mobile">
              <i class="iconfont icon-phone"></i>
              +86
            </label>
            <input v-model="mobile" id="mobile" oninput="if(value.length > 11)value=value.slice(0,11)" type="number" placeholder="请输入手机号" />
          </div>
          <div class="code">
            <input v-model="code" type="text" placeholder="请输入验证码" />
            <div class="code_btn" v-show="show" @click="getCode">获取验证码</div>
            <div class="code_btn" v-show="!show">{{count}} s</div>
          </div>
        </div>
        <input class="next" type="button" @click="sub" value="下一步">
      </form>
    </div>
  </transition>
</template>

<script>
import MHeader from 'base/MHeader'
import Validate from 'common/js/validate'
import {showAlert} from 'common/js/cubeTool'

export default {
  name: 'Register',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (vm.$store.getters.password) {
        next('/login')
      } else {
        next()
      }
    })
  },
  data() {
    return {
      showBack: true,
      mobile: '', // 手机号
      code: '', // 手机验证码
      show: true, // 是否显示倒计时
      count: '',
      timer: null
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    /**
     * 验证码倒计时
    */
    getCode() {
      if (!Validate.checkMobile(this.mobile)) {
        showAlert('请输入有效的手机号')
        return false
      }
      this.$store.dispatch('SendCode', this.mobile).then((res) => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        this.$toast('发送成功', 'correct')
        const TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }).catch((err) => {
        console.log(err)
        this.$toast('发送失败', 'error')
      })
    },
    sub() {
      const flag = Validate.checkMobile(this.mobile) && Validate.checkCode(this.code)
      if (flag) {
        const userInfo = {
          phoneNo: this.mobile,
          verifyCode: this.code
        }
        this.$store.dispatch('CodeLogin', userInfo).then((res) => {
          if (res.code === 0) {
            this.$toast(res.msg, 'warn')
            return
          }
          const result = res.result
          this.$store.commit('SET_MOBILE', userInfo.phoneNo)
          this.$store.commit('SET_USERID', result.userId)
          this.$toast('手机号设置成功', 'correct')
          setTimeout(() => {
            this.$router.push({
              path: '/setPassword'
            })
          }, 500)
        }).catch((err) => {
          console.log(err)
          this.$toast('手机号设置失败', 'error')
        })
      }
    }
  },
  components: {
    MHeader
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.register
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  .form_area
    width: 100%
    padding: 0 0.92rem
    box-sizing: border-box
    background: #fff
    .input_area
      margin-top: 2.83rem
      .code,.mobile
        height: 0.8rem
        line-height: 0.8rem
        width: 100%
        display:flex
      .code
        box-sizing: border-box
        margin-bottom: 0.2rem
        align-items: flex-end
        justify-content: space-between
        input
          flex: 1
          margin-right: 0.2rem
          width: 2.9rem
          padding: 0.2rem
          color: #d0d0d0
          box-sizing: border-box
          outline: none
          font-size: 0.32rem
          border-bottom: 1px solid #e8e8e8
          color: #666
        .code_btn
          box-sizing: border-box
          width: 2.5rem
          height: 0.54rem
          line-height: 0.54rem
          text-align: center
          border-radius: 50px
          border: 1px solid $color-theme
          font-size: 0.32rem
          color: $color-theme
          &:active
            background: $color-theme
            color: #fff
      .mobile
        box-sizing: border-box
        margin-bottom: 0.2rem
        align-items: center
        border-bottom: 1px solid #e8e8e8
        align-items: flex-end
        label
          color: #999
          font-size: 0.32rem
          display: flex
          align-items: center
          padding-left: 0.2rem
          i
            font-size: 0.32rem
            padding-right: 0.1rem
            color: #999
        input
          width: 100%
          padding: 0.2rem
          color: #d0d0d0
          box-sizing: border-box
          outline: none
          font-size: 0.32rem
          color: #666
    .next
      display: block
      margin: 0 auto
      margin-top: 2rem
      width: 3.2rem
      height: 0.7rem
      text-align: center
      line-height: 0.7rem
      border: 1px solid $color-theme
      border-radius: 50px
      background: #edf4fd
      color: $color-theme
      font-size: 0.3rem
      box-sizing: border-box
      outline: none
      &:active
        background: $color-theme
        color: #fff
</style>


