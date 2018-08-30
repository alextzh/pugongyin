import {getProfitRecord, getUserInfo, editUserInfo, submitRecharge, submitWithdraw, getCurrencyRate, getTradeRecord, getWalletAddress, getAssetDetail} from 'api/mine'

const mine = {
  state: {
    profitRecord: [], // 收益记录
    gender: -1, // 性别 0：女 1：男 -1：保密
    nickname: '昵称', // 昵称
    avatar: '', // 头像
    loading: false, // 加载中
    tradeRecord: [] // 交易记录
  },
  mutations: {
    SET_PROFIT_RECORD: (state, record) => {
      state.profitRecord = record
    },
    SET_LOADING: (state, flag) => {
      state.loading = flag
    },
    SET_USER_INFO: (state, userInfo) => {
      state.gender = userInfo.gender
      state.nickname = userInfo.nickname
      state.avatar = userInfo.profilePic
    },
    SET_NICKNAME: (state, name) => {
      state.nickname = name
    },
    SET_GENDER: (state, gender) => {
      state.gender = gender
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_TRADE_RECORD: (state, record) => {
      state.tradeRecord = record
    }
  },
  actions: {
    // 获取收益记录
    GetProfitRecord({commit}) {
      return new Promise((resolve, reject) => {
        getProfitRecord().then(response => {
          const data = response.data
          commit('SET_PROFIT_RECORD', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          commit('SET_USER_INFO', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改个人信息
    EditUserInfo({commit}, data) {
      return new Promise((resolve, reject) => {
        editUserInfo(data).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 提交充值申请
    SubmitRecharge({commit}, data) {
      return new Promise((resolve, reject) => {
        submitRecharge(data).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 提交提现申请
    SubmitWithdraw({commit}, data) {
      return new Promise((resolve, reject) => {
        submitWithdraw(data).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取币种兑换比率
    GetCurrencyRate({commit}) {
      return new Promise((resolve, reject) => {
        getCurrencyRate().then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取交易记录
    GetTradeRecord({commit}) {
      return new Promise((resolve, reject) => {
        getTradeRecord().then(response => {
          const data = response.data
          commit('SET_TRADE_RECORD', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取钱包地址
    GetWalletAddress() {
      return new Promise((resolve, reject) => {
        getWalletAddress().then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取资产详情
    GetAssetDetail() {
      return new Promise((resolve, reject) => {
        getAssetDetail().then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default mine
