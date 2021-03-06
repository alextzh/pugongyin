import request from 'utils/request'

/**
 * 广告列表接口
*/
export function getHomeAdList() {
  return request({
    url: '/advert/app/list',
    method: 'get'
  })
}

/**
 * 广告详情接口
*/
export function getAdDetail(data) {
  return request({
    url: `/advert/app/details`,
    method: 'post',
    data
  })
}

/**
 * 提交广告详情
*/
export function submitAdDetail(advertId) {
  return request({
    url: `/accout/app/advert/${advertId}/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 我的总资产接口
*/
export function getAllAsset() {
  return request({
    url: `/accout/total/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 我的当日资产接口
*/
export function getDayAsset() {
  return request({
    url: `/accout/today/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 消息列表接口
*/
export function getMessageList() {
  return request({
    url: `/message/list/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 获取是否有未读消息
*/
export function getMessageState() {
  return request({
    url: `/message/unread/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 修改消息状态
*/
export function modifyMessageState() {
  return request({
    url: `/message/update/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 扫码进入广告详情提交扫码广告接口
 * 参数advertId userId machineNum
*/
export function submitScanAdDetail(data) {
  return request({
    url: `accout/mining/app/advert/`,
    method: 'post',
    data
  })
}

/**
 * APP扫码授权登录矿机
 * 参数 userId machineNum
*/
export function appAuthLogin(data) {
  return request({
    url: `user/app/loginMining`,
    method: 'post',
    data
  })
}

/**
 * 获取奖励记录
*/
export function getWinningRecord() {
  return request({
    url: `campaignPrizeWin/app/myReward/${localStorage.getItem('userId')}`,
    method: 'get'
  })
}

/**
 * 兑换奖励
*/
export function exchangeReward(data) {
  return request({
    url: `campaignPrizeWin/app/exchange`,
    method: 'post',
    data
  })
}

/**
 * 是否中奖
*/
// export function isWinning(data) {
//   return request({
//     url: `campaignPrizeWin/app/winReward`,
//     method: 'post',
//     data
//   })
// }

/**
 * 是否中奖 advertId=1&userId=25
*/
export function isWinning(param) {
  return request({
    url: `campaignPrizeWin/app/useWinReward?advertId=${param.advertId}&userId=${param.userId}`,
    method: 'post'
  })
}
