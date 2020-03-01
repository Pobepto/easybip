import Vue from 'vue'
import Vuex from 'vuex'

import Payment from '@/store/Payment'
import Phone from '@/store/Phone'
import Food from '@/store/Food'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Payment,
    ServicePhone: Phone,
    ServiceFood: Food
  }
})

export default store
