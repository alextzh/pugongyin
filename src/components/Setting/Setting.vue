<template>
  <div class="setting">
    <m-header text="设置" :showBack="showBack" @back="handleBack"></m-header>
    <div class="box">
      <ul>
        <li class="item" @click="toModifyPassword">
          <div class="content">
            <h4>{{getText}}</h4>
          </div>
        </li>
      </ul>
      <ul style="margin-top: 0.2rem">
        <li class="item" @click="handleLogOut" style="justify-content:center;font-size:0.28rem;color:#db2048;">退出账号</li>
      </ul>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'

export default {
  name: 'Setting',
  components: {
    MHeader
  },
  data() {
    return {
      showBack: true
    }
  },
  computed: {
    getText() {
      return this.$store.getters.password ? '修改密码' : '设置密码'
    }
  },
  methods: {
    handleBack() {
      this.$router.back()
    },
    handleLogOut() {
      this.$dialog('提示', `确定要退出该账号吗`, () => {
        localStorage.removeItem('mobile')
        localStorage.removeItem('userId')
        localStorage.removeItem('wrongNum')
        localStorage.removeItem('chooseType')
        this.$store.commit('DEL_PASSWORD', '')
        this.$store.commit('SET_LOGIN', false)
        this.$store.commit('SET_ALL_ASSET', 0)
        this.$store.commit('SET_DAY_ASSET', 0)
        this.$router.replace({
          path: '/home'
        })
      }, () => {
        return false
      })
    },
    toModifyPassword() {
      if (!this.$store.getters.password) {
        this.$router.push({
          path: '/setPassword'
        })
      } else {
        this.$router.push({
          path: '/vertifyCode'
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position: absolute 
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
  background: #e8e8e8
  overflow hidden
  .item
    display: flex
    align-items: center
    height: 0.85rem
    background: #fff
    padding: 0 0.25rem
    &:active
      background: rgba(0,0,0,.2)
    .content
      flex: 1
      display: flex
      align-items: center
      height: 0.85rem
      font-size: 0.28rem
      color: #444444
      box-sizing: border-box
      h4
        flex: 1
        display: flex
        align-items: center
        justify-content: space-between
</style>
