/**
 * 校验手机号
*/
export function isMobile(mobile) {
  const regex = /^[1][3,4,5,7,8][0-9]{9}$/
  return regex.test(mobile)
}

/**
 * 校验邮箱
*/
export function isEmail(email) {
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return regex.test(email)
}

/**
 * 手机号中间四位变成*号
*/
export function formatMobile(str) {
  return str.substr(0, 3) + '****' + str.substr(7)
}

/**
 * 获取手势密码 格式：1234
*/
export function getPwd(arr) {
  const array = []
  if (Array.isArray(arr)) {
    arr.forEach(element => {
      if (element.index) {
        array.push(element.index)
      }
    })
  }
  return array.join('')
}

/**
 * 校验数字最多两位小数
*/
export function isNum(num) {
  const regex = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  return regex.test(num)
}

/**
 * 判断是否是微信浏览器
*/
export function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false
  }
}

export function findIndex(ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function(item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  /* istanbul ignore next */
  return index
}

// 获取字符串长度
export function getStrLength(str) {
  var cArr = str.match(/[^\x00-\xff]/ig)
  return str.length + (cArr == null ? 0 : cArr.length)
}
