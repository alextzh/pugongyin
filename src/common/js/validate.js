import {isMobile, isNum} from 'common/js/tool'
import {showAlert} from 'common/js/cubeTool'
import store from '../../store/'

const Validate = {
  /**
   * 校验手机号码
  */
  checkMobile: (param) => {
    const mobile = param.trim()
    if (!mobile) {
      store.commit('SET_ERROR_MSG', '请输入手机号')
      return false
    } else if (!isMobile(mobile)) {
      store.commit('SET_ERROR_MSG', '请输入有效手机号')
      return false
    } else {
      store.commit('SET_ERROR_MSG', '')
      return true
    }
  },
  /**
   * 校验验证码
  */
  checkCode: (param) => {
    const code = param.trim()
    if (!code) {
      store.commit('SET_ERROR_MSG', '手机验证码不能为空')
      return false
    }
    store.commit('SET_ERROR_MSG', '')
    return true
  },
  /**
   * 校验昵称
  */
  checkNickname: (param) => {
    const nickname = param.trim()
    if (!nickname) {
      store.commit('SET_ERROR_MSG', '请输入昵称')
      return false
    } else if (nickname.length > 20) {
      store.commit('SET_ERROR_MSG', '昵称长度小于20个字符')
      showAlert('昵称长度小于20个字符')
      return false
    }
    store.commit('SET_ERROR_MSG', '')
    return true
  },
  /**
   * 校验充值金额是否最多两位小数
  */
  checkRecharge: (param) => {
    const num = param
    if (!num) {
      showAlert('请输入有效的充值金额')
      return false
    } else if (!isNum(num)) {
      showAlert('充值金额最多两位小数')
      return false
    } else {
      return true
    }
  },
  /**
   * 校验提现金额是否最多两位小数
  */
  checkWithdraw: (param, total) => {
    const num = param
    if (!num) {
      showAlert('请输入有效的提现金额')
      return false
    } else if (num > total) {
      showAlert('账户余额不足')
    } else if (!isNum(num)) {
      showAlert('提现金额最多两位小数')
      return false
    } else {
      return true
    }
  },
  /**
   * 校验imtoken
  */
  checkImtoken: (param) => {
    const imtoken = param.trim()
    if (!imtoken) {
      showAlert('请输入钱包地址')
      return false
    } else {
      return true
    }
  }
}

export default Validate
