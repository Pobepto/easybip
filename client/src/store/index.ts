import Vue from 'vue'
import Vuex from 'vuex'

import Payment from '@/store/Payment'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Payment
  }
})

export default store
