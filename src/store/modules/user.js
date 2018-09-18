import {sendCode, registerApi, codeLogin, gestureLogin, updateGesture, scanCodeLogin} from 'api/login'
import {loadPwd, loadMobile, loadUserId} from 'common/js/cache'

const user = {
  state: {
    userId: loadUserId(),
    mobile: loadMobile(), // 手机号
    password: loadPwd(), // 手势密码
    wrongNum: 5, // 手势密码错误次数
    step: 0, // 设置手势密码第几步
    isLogin: false, // 是否首次登陆
    machineNum: '', // 设备uuid
    errorMsg: '', // 校验错误信息
    modifyState: 0,
    routerQuery: '' // 跳转登录历史页路径
  },
  mutations: {
    SET_ROUTER_QUERY: (state, str) => {
      state.routerQuery = str
    },
    SET_MODIFY_STATE: (state, num) => {
      state.modifyState = num
    },
    SET_ERROR_MSG: (state, msg) => {
      state.errorMsg = msg
    },
    SET_MACHINE_NUM: (state, str) => {
      state.machineNum = str
    },
    SET_LOGIN: (state, flag) => {
      state.isLogin = flag
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
      localStorage.setItem('userId', userId)
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile
      localStorage.setItem('mobile', mobile)
    },
    SET_PASSWORD: (state, password) => {
      state.password = password
      localStorage.setItem('password', password)
    },
    DEL_PASSWORD: (state, password) => {
      state.password = password
    },
    SET_WRONG_NUM: (state, num) => {
      state.wrongNum = num
      localStorage.setItem('wrongNum', num)
    },
    SET_STEP: (state, step) => {
      state.step = step
    }
  },
  actions: {
    // 发送验证码
    SendCode({commit}, phoneNo) {
      return new Promise((resolve, reject) => {
        sendCode(phoneNo).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 注册接口
    RegisterApi({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        registerApi(userInfo).then(response => {
          commit('SET_LOGIN', true)
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 短信登录
    CodeLogin({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        codeLogin(userInfo).then(response => {
          const data = response.data
          commit('SET_LOGIN', true)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 更新手势密码
    UpdateGesture({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        updateGesture(userInfo).then(response => {
          const data = response.data
          commit('SET_STEP', 2)
          commit('SET_WRONG_NUM', 5)
          commit('SET_PASSWORD', userInfo.userPassword)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 手势登录
    GestureLogin({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        gestureLogin(userInfo).then(response => {
          const data = response.data
          commit('SET_LOGIN', true)
          commit('SET_STEP', 0)
          commit('SET_WRONG_NUM', 5)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 扫码验证登录
    ScanCodeLogin({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        scanCodeLogin(userInfo).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
