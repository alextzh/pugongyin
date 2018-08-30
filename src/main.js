import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import {showToast, showAlert, showDialog, showPicker} from 'common/js/cubeTool'
import fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueClipboard from 'vue-clipboard2'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Toast,
  Picker,
  Dialog,
  Scroll,
  createAPI
} from 'cube-ui'

import 'swiper/dist/css/swiper.css'
import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueAwesomeSwiper)
Vue.use(VueClipboard)

Vue.use(Toast)
Vue.use(Picker)
Vue.use(Dialog)
Vue.use(Scroll)

// 挂载提示插件到Vue实例
Vue.prototype.$toast = showToast
Vue.prototype.$alert = showAlert
Vue.prototype.$dialog = showDialog
Vue.prototype.$picker = showPicker

Vue.config.productionTip = false

/* eslint-disable */
document.addEventListener('deviceready', function() {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
  window.navigator.splashscreen.hide()
}, false)
