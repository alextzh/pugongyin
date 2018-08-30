<template>
  <div class="auth-login">
    <m-header :showBack="showBack" @back="back" text="扫描结果"></m-header>
    <div class="box">
      <div class="userInfo">
        <img class="avatar" :src="avatar" alt="">
        <p class="name">{{nickname}}</p>
      </div>
      <div class="btns">
        <a class="btn" href="javascript:;" @click="canLogin">允许登录宝盒</a>
        <a class="btn" href="javascript:;" @click="cancelLogin">取消</a>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import {mapGetters} from 'vuex'

export default {
  name: 'AuthLogin',
  components: {
    MHeader
  },
  data() {
    return {
      showBack: true
    }
  },
  mounted() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters([
      'avatar',
      'nickname',
      'machineNum',
      'userId'
    ])
  },
  methods: {
    // 返回
    back() {
      this.$router.push({
        path: '/'
      })
    },
    // 授权登录
    canLogin() {
      const params = {
        userId: this.userId,
        machineNum: this.machineNum
      }
      this.$store.dispatch('AppAuthLogin', params).then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        this.$toast('登录成功', 'correct')
        this.$router.push({
          path: '/'
        })
      })
    },
    // 取消登录
    cancelLogin() {
      this.$router.push({
        path: '/'
      })
    },
    // 获取用户信息
    getUserInfo() {
      this.$store.dispatch('GetUserInfo').then((res) => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
      }).catch((err) => {
        console.log(err)
        this.$toast('获取用户信息失败', 'error')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.box
  position: absolute 
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  .userInfo
    padding: 1rem 0
    display: flex
    flex-direction column
    align-items center
    .avatar
      display: block
      width: 1.8rem
      height: 1.8rem
      border-radius: 50%
      border: 0
    .name
      font-size: 0.36rem
      color: #333
      padding-top: 0.3rem
  .btns
    padding: 1rem 0.24rem
    .btn
      display: flex
      align-items center
      justify-content center
      font-size: 0.32rem
      color: #ffffff
      letter-spacing 0.03rem
      width: 100%
      height: 0.8rem
      border-radius: 0.04rem
      &:first-child
        background: $color-theme
        margin-bottom: 0.4rem
      &:last-child
        background: #f36868
</style>

