import request from 'utils/request'

/**
 * 获取收益记录
*/
export function getProfitRecord() {
  return request({
    url: `/accout/list/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 获取用户详情
*/
export function getUserInfo() {
  return request({
    url: `/user/details?userId=${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 修改个人信息
*/
export function editUserInfo(data) {
  return request({
    url: `/user/app/modifyPersonInfo`,
    method: 'post',
    data: data
  })
}

/**
 * 提交充值申请
 * eg: data: {tradeMoney: 1000, userId: 16}
*/
export function submitRecharge(data) {
  return request({
    url: `/wallet/app/recharge`,
    method: 'post',
    data: data
  })
}

/**
 * 提交提现申请
*/
export function submitWithdraw(data) {
  return request({
    url: `/wallet/app/withdraw`,
    method: 'post',
    data: data
  })
}

/**
 * 获取币种兑换比率
*/
export function getCurrencyRate() {
  return request({
    url: '/wallet/app/exchangeRate',
    method: 'get'
  })
}

/**
 * 获取交易记录
*/
export function getTradeRecord() {
  return request({
    url: `/wallet/app/transactionHistory/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 获取钱包地址
*/
export function getWalletAddress() {
  return request({
    url: `/wallet/app/walletAddress/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 获取资产详情
*/
export function getAssetDetail() {
  return request({
    url: `/wallet/app/assetsDetails/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}
