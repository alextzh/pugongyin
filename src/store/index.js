import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import home from './modules/home'
import mine from './modules/mine'
import shop from './modules/shop'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    home,
    mine,
    shop
  },
  getters
})

export default store
