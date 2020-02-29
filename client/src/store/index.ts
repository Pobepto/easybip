import Vue from 'vue'
import Vuex from 'vuex'

import Payment from '@/store/Payment'
import Phone from '@/store/Phone'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Payment,
    Phone
  }
})

export default store
