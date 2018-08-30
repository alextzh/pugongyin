import {getPwd} from 'common/js/tool'

export function loadPwd() {
  if (localStorage.getItem('passwordxx')) {
    var pwd = JSON.parse(localStorage.getItem('passwordxx'))
    return getPwd(pwd)
  } else {
    return ''
  }
}

export function loadMobile() {
  return localStorage.getItem('mobile') ? localStorage.getItem('mobile') : ''
}

export function loadUserId() {
  return localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
}
