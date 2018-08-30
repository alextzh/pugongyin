import {getHomeAdList, getAllAsset, getDayAsset, getMessageList, getMessageState, modifyMessageState, getAdDetail, submitAdDetail, submitScanAdDetail, appAuthLogin} from 'api/home'

const home = {
  state: {
    adList: [], // 广告列表
    currentAd: null, // 当前广告详情
    flag: false, // 广告详情页面提交按钮是否可点击 true代表可以点击
    allAsset: 0, // 总收益
    dayAsset: 0, // 每日收益
    messageList: [], // 信息列表
    messageNum: 0, // 信息数量
    messageState: false, // 信息状态 true代表有未读消息，false代表无未读消息
    pageFlag: true
  },
  mutations: {
    SET_PAGE_FLAG: (state, flag) => {
      state.pageFlag = flag
    },
    SET_AD_LIST: (state, list) => {
      state.adList = list
    },
    SET_CURRENT_AD: (state, item) => {
      state.currentAd = item
    },
    SET_FLAG: (state, flag) => {
      state.flag = flag
    },
    SET_ALL_ASSET: (state, asset) => {
      state.allAsset = asset
    },
    SET_DAY_ASSET: (state, asset) => {
      state.dayAsset = asset
    },
    SET_MESSAGE_LIST: (state, list) => {
      state.messageList = list
    },
    SET_MESSAGE_NUM: (state, num) => {
      state.messageNum = num
    },
    SET_MESSAGE_STATE: (state, flag) => {
      state.messageState = flag
    }
  },
  actions: {
    // 获取首页广告列表
    GetHomeAdList({commit}) {
      return new Promise((resolve, reject) => {
        getHomeAdList().then(response => {
          const data = response.data
          commit('SET_AD_LIST', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取广告详情
    GetAdDetail({commit}, advertId) {
      return new Promise((resolve, reject) => {
        getAdDetail(advertId).then(response => {
          const data = response.data
          commit('SET_CURRENT_AD', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 提交广告详情
    SubmitAdDetail({commit}, advertId) {
      return new Promise((resolve, reject) => {
        submitAdDetail(advertId).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 扫码后提交广告详情
    SubmitScanAdDetail({commit}, data) {
      return new Promise((resolve, reject) => {
        submitScanAdDetail(data).then(response => {
          const data = response.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取首页总资产
    GetAllAsset({commit}) {
      return new Promise((resolve, reject) => {
        getAllAsset().then(response => {
          const data = response.data
          commit('SET_ALL_ASSET', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取首页当日资产
    GetDayAsset({commit}) {
      return new Promise((resolve, reject) => {
        getDayAsset().then(response => {
          const data = response.data
          commit('SET_DAY_ASSET', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取未读消息状态
    GetMessageState({commit}) {
      return new Promise((resolve, reject) => {
        getMessageState().then(response => {
          const data = response.data
          commit('SET_MESSAGE_STATE', data.result)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改消息状态接口
    ModifyMessageState() {
      return new Promise((resolve, reject) => {
        modifyMessageState().then(response => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取消息列表
    GetMessageList({commit}) {
      return new Promise((resolve, reject) => {
        getMessageList().then(response => {
          const data = response.data
          commit('SET_MESSAGE_LIST', data.result)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // App扫码授权登陆矿机
    AppAuthLogin({commit}, data) {
      return new Promise((resolve, reject) => {
        appAuthLogin(data).then(response => {
          const data = response.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default home
