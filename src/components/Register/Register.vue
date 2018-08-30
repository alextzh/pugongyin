<template>
  <transition name="slide">
    <div class="register">
      <m-header :showBack="showBack" @back="handleBack" text="用户注册"></m-header>
      <div class="box">
        <form class="form_area" method="post">
          <div class="input_area">
            <div class="mobile">
              <label for="mobile">
                <i class="iconfont icon-phone"></i>
                +86
              </label>
              <input v-model="mobile" id="mobile" oninput="if(value.length > 11)value=value.slice(0,11)" type="number" placeholder="请输入手机号" @focus="checkMobile" @blur="checkForm" />
            </div>
            <div class="code">
              <input v-model="code" type="text" placeholder="请输入验证码" @focus="checkCode" @blur="checkForm" />
              <div class="code_btn" v-show="show" @click="getCode">获取验证码</div>
              <div class="code_btn disabled" :disabled="!show" v-show="!show">{{count}} s</div>
            </div>
            <div class="nickname">
              <label for="nickname">
                <i class="iconfont icon-mine"></i>
              </label>
              <input v-model="nickName" id="nickname" type="text" placeholder="请填写您的昵称" @focus="checkNickname" @blur="checkForm" />
            </div>
            <div class="sex">
              <div class="sex-title">性别:</div>
              <div class="radio-box">
                <input class="magic-radio" type="radio" name="sex" v-model="sex" id="man" value="1" checked />
                <label class="label" for="man">
                  <i class="iconfont icon-check"></i>
                  男
                </label>
              </div>
              <div class="radio-box">
                <input class="magic-radio" type="radio" name="sex" v-model="sex" value="0" id="woman" />
                <label class="label" for="woman">
                  <i class="iconfont icon-check"></i>
                  女
                </label>
              </div>
            </div>
          </div>
          <div class="error-msg" :style="errorMsg ? 'visibility: visible;opacity: 1' : 'visibility: hidden;opacity: 0'">{{errorMsg}}</div>
          <div class="btn_area">
            <a class="btn" href="javascript:;" @click="sub">设置手势密码</a>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import MHeader from 'base/MHeader'
import Validate from 'common/js/validate'
import {mapGetters} from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      mobile: '', // 手机号
      code: '', // 手机验证码
      nickName: '', // 昵称
      sex: '1', // 性别 0是女，1是男
      show: true, // 是否显示倒计时
      count: '',
      timer: null,
      showBack: true
    }
  },
  computed: {
    ...mapGetters([
      'errorMsg'
    ])
  },
  methods: {
    handleBack() {
      this.$router.back()
    },
    checkForm() {
      Validate.checkMobile(this.mobile) && Validate.checkCode(this.code) && Validate.checkNickname(this.nickName)
    },
    checkMobile() {
      Validate.checkMobile(this.mobile)
    },
    checkCode() {
      Validate.checkCode(this.code)
    },
    checkNickname() {
      Validate.checkNickname(this.nickName)
    },
    /**
     * 验证码倒计时
    */
    getCode() {
      if (Validate.checkMobile(this.mobile)) {
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
        }).catch(err => {
          console.log(err)
          this.$toast('发送失败', 'error')
        })
      }
    },
    sub() {
      const flag = Validate.checkMobile(this.mobile) && Validate.checkCode(this.code) && Validate.checkNickname(this.nickName)
      if (flag) {
        const userInfo = {
          phoneNo: this.mobile,
          verifyCode: this.code,
          nickname: this.nickName,
          gender: this.sex,
          useType: -1
        }
        this.$store.dispatch('RegisterApi', userInfo).then(res => {
          if (res.code === 0) {
            this.$toast(res.msg, 'warn')
            return
          }
          const result = res.result
          this.$store.commit('SET_USERID', result.userId)
          this.$store.commit('SET_MOBILE', userInfo.phoneNo)
          this.$store.commit('SET_USER_INFO', result)
          this.$router.push({
            path: '/setPassword'
          })
        }).catch(err => {
          console.log(err)
          this.$toast('注册失败', 'error')
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

.box
  position: absolute
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  .form_area
    width: 100%
    padding: 0 0.92rem
    box-sizing: border-box
    background: #fff
    .input_area
      margin-top: 1.76rem
      .code,.mobile,.nickname,.sex
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
          &.disabled
            color: #e8e8e8
            border-color: #e8e8e8
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
      .nickname
        box-sizing: border-box
        margin-bottom: 0.2rem
        align-items:center
        border-bottom: 1px solid #e8e8e8
        label
          display: flex
          align-items: center
          justify-content: center
          padding-left: 0.2rem
          height: 0.8rem
          i
            font-size: 0.32rem;
            color: #999
        input
          width: 100%
          padding: 0.2rem 0.2rem 0.16rem
          color: #d0d0d0
          box-sizing: border-box
          outline: none
          font-size: 0.32rem
          color: #666
    .error-msg
      padding: 0 0.15rem
      height: 0.8rem
      display: flex
      align-items: center
      color: #cb1212
      font-size: 0.24rem
      visibility: hidden
      opacity: 0
    .btn_area
      margin-top: 4.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn
        color: $color-theme
        font-size: 0.32rem
        text-decoration: underline
        &:active
          opacity: 0.7
// radio样式
.sex{
  box-sizing: border-box
  margin-bottom: 0.2rem
  align-items:center
  border-bottom: 1px solid #e8e8e8
}
.sex-title{
  min-width: 0
  padding: 0 0.2rem;
  font-size: 0.32rem;
  margin-right: 0.44rem;
  color: #999;
}
.radio-box{
  flex:1
}
.magic-radio{
  position: absolute
  display: none
}
.magic-radio + .label{
  position: relative;
  display: flex;
  padding-left: 0.6rem;
  cursor: pointer;
  color: #999;
  font-size: 0.32rem;
  line-height: 0.8rem;
}
.magic-radio + .label:before{
  position: absolute;
  top: 0.2rem;
  left: 0;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  content: '';
  border: 1px solid #a2a2a2;
  box-sizing: border-box
}
.magic-radio + .label>i{
  position: absolute;
  font-size: 0.36rem;
  line-height: 1;
  top: 0.22rem;
  left: 0.02rem;
  display: none
}
.magic-radio:checked + .label:before{
  border: 1px solid $color-theme
  background: $color-theme
}
.magic-radio:checked + .label>i{
  color: #fff
  display: block
}
</style>


