import Vue from 'vue'
import store from '../../store'
import router from '../../router'

export function loadPwd() {
  if (localStorage.getItem('password')) {
    return localStorage.getItem('password')
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
/* eslint-disable */
export function handleScan(e) {
  var str = e.data
  if (!str) {
    Vue.$toast('请扫描宝盒相关二维码', 'warn')
    return
  }
  if (str.indexOf('advertId') >= 0 && str.indexOf('machineNum') >= 0) {
    let arr = str.split('&')
    let advertId = arr[0].split('=')[1]
    let machineNum = arr[1].split('=')[1]
    store.commit('SET_MACHINE_NUM', machineNum)
    router.push({
      path: `/ad/${advertId}`
    })
  } else if (str && str.indexOf('machineNum') >= 0 && str.indexOf('advertId') < 0) {
    let arr = str.split('=')
    let machineNum = arr[1]
    store.commit('SET_MACHINE_NUM', machineNum)
    setTimeout(() => {
      router.push({
        path: '/authLogin'
      })
    }, 500)
  } else {
    Vue.$toast(`请扫描宝盒相关二维码`, 'warn')
  }
}
