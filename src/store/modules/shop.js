import {getProductList, getProductDetail, submitProductDetail, getOrderList} from 'api/shop'

const shop = {
  state: {
    productList: [], // 商品列表
    currentProduct: null, // 当前商品
    orderList: [] // 订单记录
  },
  mutations: {
    SET_PRODUCT_LIST: (state, list) => {
      state.productList = list
    },
    SET_CURRENT_PRODUCT: (state, item) => {
      state.currentProduct = item
    },
    SET_ORDER_LIST: (state, list) => {
      state.orderList = list
    }
  },
  actions: {
    // 获取商品列表
    GetProductList({commit}) {
      return new Promise((resolve, reject) => {
        getProductList().then(response => {
          const data = response.data
          commit('SET_PRODUCT_LIST', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取商品详情
    GetProductDetail({commit}, goodsId) {
      return new Promise((resolve, reject) => {
        getProductDetail(goodsId).then(response => {
          const data = response.data
          commit('SET_CURRENT_PRODUCT', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 提交商品详情
    SubmitProductDetail({commit}, data) {
      return new Promise((resolve, reject) => {
        submitProductDetail(data).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取我的订单
    GetOrderList({commit}) {
      return new Promise((resolve, reject) => {
        getOrderList().then(response => {
          const data = response.data
          commit('SET_ORDER_LIST', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default shop
