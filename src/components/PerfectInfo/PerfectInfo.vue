<template>
  <div class="perfectInfo">
    <m-header :showBack="showBack" :showRight="showRight" @back="handleBack" @handleClick="handleJump" text="完善信息" rightText="跳过"></m-header>
    <div class="box">
      <form class="form_area" method="post">
        <div class="input_area">
          <div class="nickname">
            <label for="nickname">
              <i class="iconfont icon-mine"></i>
            </label>
            <input v-model="nickName" id="nickname" type="text" placeholder="请填写您的昵称" @focus="checkNickname" @blur="checkNickname" />
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
        <input class="next" type="button" @click="handleSub" value="下一步">
      </form>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import Validate from 'common/js/validate'
import {mapGetters} from 'vuex'

export default {
  name: 'PerfectInfo',
  data() {
    return {
      nickName: '', // 昵称
      sex: '1', // 性别 0是女，1是男
      showBack: true,
      showRight: true
    }
  },
  computed: {
    ...mapGetters([
      'errorMsg',
      'userId',
      'routerQuery'
    ])
  },
  methods: {
    handleBack() {
      this.$router.back()
    },
    handleJump() {
      setTimeout(() => {
        this.$router.replace({
          path: '/setGesture'
        })
      }, 500)
    },
    setPassword() {
      this.$router.replace({
        path: 'setPassword'
      })
    },
    checkNickname() {
      Validate.checkNickname(this.nickName)
    },
    handleSub() {
      var that = this
      const flag = Validate.checkNickname(this.nickName)
      if (flag) {
        const userInfo = {
          nickname: this.nickName,
          gender: this.sex,
          userId: this.userId
        }
        that.$store.dispatch('EditUserInfo', userInfo).then(res => {
          if (res.code === 0) {
            this.$toast(res.msg, 'warn')
            return
          }
          this.$toast('个人信息提交成功', 'correct')
          setTimeout(() => {
            this.$router.replace({
              path: '/setGesture'
            })
          }, 500)
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
      .nickname,.sex
        height: 0.8rem
        line-height: 0.8rem
        width: 100%
        display:flex
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
    .next
      display: block
      margin: 0 auto
      margin-top: 1.24rem
      width: 3.2rem
      height: 0.7rem
      text-align: center
      line-height: 0.7rem
      border: 0.02rem solid $color-theme
      border-radius: 50px
      background: #fff1e9
      color: $color-theme
      font-size: 0.3rem
      box-sizing: border-box
      outline: none
      &:active
        background: $color-theme
        color: #fff
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
