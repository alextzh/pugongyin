import request from 'utils/request'

/**
 * 获取商品列表
*/
export function getProductList() {
  return request({
    url: '/shop/goods/app/list',
    method: 'get'
  })
}

/**
 * 获取商品详情
*/
export function getProductDetail(goodsId) {
  return request({
    url: `/shop/goods/app/details/${goodsId}`,
    method: 'get'
  })
}

/**
 * 提交商品详情
*/
export function submitProductDetail(data) {
  return request({
    url: `/shop/order/app/add`,
    method: 'post',
    data: data
  })
}

/**
 * 获取我的订单
*/
export function getOrderList() {
  return request({
    url: `/shop/order/app/list/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}
