<template>
  <div class="edit-information">
    <m-header text="个人信息" :showBack="showBack" :showRight="showRight" rightText="保存" @handleClick="saveInfo" @back="back"></m-header>
    <div class="container">
      <cube-scroll ref="scroll">
        <ul class="box">
          <li class="item border-bottom-1px" @click.stop="uploadHeadImg">
            <input ref="fileInput" type="file" accept="image/*" capture="camera" @change="handleFile" id="upLoadImg" hidden />
            <label class="content" for="upLoadImg">
              <span class="tit">头像</span>
              <div class="con">
                <img :src="avatar" alt="">
              </div>
            </label>
            <span class="link"><i class="iconfont icon-link"></i></span>
          </li>
          <li class="item border-bottom-1px" @click="toEditNickname">
            <div class="content">
              <span class="tit">昵称</span>
              <div class="con">{{nickname}}</div>
            </div>
            <span class="link"><i class="iconfont icon-link"></i></span>
          </li>
          <li class="item border-bottom-1px">
            <div class="content" style="padding-right: 0">
              <span class="tit">用户名</span>
              <div class="con">{{mobile}}</div>
            </div>
          </li>
          <li class="item border-bottom-1px" @click="selectSex">
            <div class="content">
              <span class="tit">性别</span>
              <div class="con">{{selectText}}</div>
            </div>
            <span class="link"><i class="iconfont icon-link"></i></span>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/MHeader'
import {mapGetters} from 'vuex'
import $ from 'jquery'
import Domain from 'common/js/domain'

const sexArr = [
  {
    text: '保密',
    value: -1
  },
  {
    text: '男',
    value: 1
  },
  {
    text: '女',
    value: 0
  }
]

export default {
  name: 'EditInformation',
  components: {
    MHeader
  },
  data() {
    return {
      showBack: true,
      showRight: true,
      selectVal: '',
      selectText: '',
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg'
      }
    }
  },
  created() {
    this.selectText = this.getSex
    this.selectVal = this.gender
  },
  computed: {
    getSex() {
      return this.gender === 0 ? '女' : this.gender === 1 ? '男' : '保密'
    },
    ...mapGetters([
      'gender',
      'nickname',
      'mobile',
      'avatar'
    ])
  },
  methods: {
    back() {
      this.$router.back()
    },
    toEditNickname() {
      this.$router.push({
        path: '/editNickname'
      })
    },
    uploadHeadImg() {
      this.$el.querySelector('.content').click()
    },
    handleFile(e) {
      var $target = e.target || e.srcElement
      var file = $target.files[0]
      var type = file.type
      var size = file.size
      if (this.imgData.accept.indexOf(type) === -1) {
        this.$toast('请选择支持的图片格式', 'warn')
        return false
      }
      if (size > 3145728) {
        this.$toast('上传头像不能超过3M', 'wran')
        return false
      }
      var formData = new FormData()
      formData.append('file', file)
      $.ajax({
        type: 'POST',
        url: Domain + '/upload/uploadimg',
        data: formData,
        dataType: 'JSON',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false
      }).done((res) => {
        this.$toast(res.msg, 'warn')
        this.$store.commit('SET_AVATAR', res.result)
      }).fail((err) => {
        console.log(err)
      })
    },
    saveInfo() {
      const data = {
        gender: this.selectVal,
        nickname: this.nickname,
        profilePic: this.avatar,
        userId: localStorage.getItem('userId')
      }
      this.$store.dispatch('EditUserInfo', data).then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        this.$toast('修改成功', 'correct')
        setTimeout(() => {
          this.$router.push({
            path: '/mine'
          })
        }, 500)
      }).catch(err => {
        console.log(err)
        this.$toast('修改个人信息失败', 'error')
      })
    },
    selectSex() {
      this.$picker('选择性别', sexArr, 0, this.selectSexFn, this.cancelSexFn)
    },
    selectSexFn(selectedVal, selectedIndex, selectedText) {
      this.selectVal = selectedVal[0]
      this.selectText = selectedText[0]
    },
    cancelSexFn() {
      console.log('cancel')
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  position: absolute 
  top: 0.88rem
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  .box
    padding: 0 0.24rem
    .item
      height: 0.9rem
      // border-bottom: 1px solid #e8e8e8
      box-sizing: border-box
      display: flex
      align-items: center
      &:first-child
        height: 1.2rem
      .content
        flex: 1
        display: flex
        justify-content: space-between
        align-items: center
        padding: 0 0.2rem
        .tit
          font-size: 0.3rem
          color: #444
        .con
          font-size: 0.24rem
          color: #a0a0a0
          img 
            display: block
            width: 0.84rem
            height: 0.84rem
            border-radius: 0.1rem
            overflow: hidden
      .link
        display: flex
        align-items: center
        height: 0.9rem
        i 
          color: #a0a0a0
          font-size: 0.3rem
</style>
