import request from 'utils/request'

/**
 * 手机发送验证码api
*/
export function sendCode(phoneNo) {
  const data = {
    msgType: 1,
    phoneNo
  }
  return request({
    url: '/user/msg',
    method: 'post',
    data: data
  })
}

/**
 * 注册接口
*/
export function registerApi(userInfo) {
  return request({
    url: '/user/register',
    method: 'post',
    data: userInfo
  })
}

/**
 * 验证码登录接口
*/
export function codeLogin(userInfo) {
  return request({
    url: '/user/login/phoneNo',
    method: 'post',
    data: userInfo
  })
}

/**
 * 更新手势密码接口
*/
export function updateGesture(userInfo) {
  return request({
    url: '/user/modifyPwd',
    method: 'post',
    data: userInfo
  })
}

/**
 * 手势密码登录接口
*/
export function gestureLogin(userInfo) {
  return request({
    url: '/user/login/gesture',
    method: 'post',
    data: userInfo
  })
}

/**
 * 微信扫码验证码登录接口
*/
export function scanCodeLogin(data) {
  return request({
    url: '/user/login/mining/phoneNo',
    method: 'post',
    data
  })
}
