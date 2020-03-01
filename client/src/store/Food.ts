import Vue from 'vue'
import map from 'lodash/fp/map'
import fromPairs from 'lodash/fp/fromPairs'
import flow from 'lodash/fp/flow'
import flatMap from 'lodash/fp/flatMap'
import concat from 'lodash/fp/concat'

import easyBipApi from '@/utils/api'
import foodServiceApi from '@/utils/service/food'

const types = flow(
  flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE']),
  concat([
    'RESET'
  ]),
  map(x => [x, x]),
  fromPairs
)([
  'PRICES_FOOD_SERVICE',
  'TRANSFER_FOOD_SERVICE',
  'GET_MY_FOOD_GIFTS'
])

function initialState () {
  return {
    isLoading: false,
    gifts: [
      'y1000',
      'y2000',
      'y3000'
      // 't1'
    ],
    account: {
      gifts: []
    },
    bill: {
      sum: 0,
      address: '',
      date: new Date().getTime()
    }
  }
}

const state = initialState()

const getters = {}

const mutations = {
  [types.RESET] (state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  },

  [types.PRICES_FOOD_SERVICE_REQUEST] (state) {
    state.isLoading = true
  },
  [types.PRICES_FOOD_SERVICE_SUCCESS] (state, { summ: sum, address }) {
    state.isLoading = false
    Vue.set(state, 'bill', {
      sum,
      address,
      date: new Date().getTime()
    })
  },
  [types.PRICES_FOOD_SERVICE_FAILURE] (state) {
    state.isLoading = false
  },

  [types.TRANSFER_FOOD_SERVICE_REQUEST] (state) {},
  [types.TRANSFER_FOOD_SERVICE_SUCCESS] (state) {},
  [types.TRANSFER_FOOD_SERVICE_FAILURE] (state) {},

  [types.GET_MY_FOOD_GIFTS_REQUEST] (state) {},
  [types.GET_MY_FOOD_GIFTS_SUCCESS] (state, { gifts }) {
    Vue.set(state, 'account', { gifts })
  },
  [types.GET_MY_FOOD_GIFTS_FAILURE] (state) {}
}

const actions = {
  async getPrices ({ commit }, { link, product }) {
    commit(types.PRICES_FOOD_SERVICE_REQUEST)
    try {
      const { summ, address } = await foodServiceApi.createOrder({
        link,
        product
      })
      commit(types.PRICES_FOOD_SERVICE_SUCCESS, { summ, address })
      return Promise.resolve()
    } catch (error) {
      commit(types.PRICES_FOOD_SERVICE_FAILURE)
      throw error
    }
  },
  async transferToFood ({ commit, state, getters, dispatch }, { product, ...data }) {
    const timeDiff = (left, right) => {
      const diff = Math.abs(left - right)
      return Math.ceil(diff / 1000 / 60)
    }
    commit(types.TRANSFER_FOOD_SERVICE_REQUEST)
    try {
      if (timeDiff(state.bill.date, new Date().getTime()) >= 8) {
        await dispatch('getPrices')
        return Promise.resolve({ isChanged: true })
      }
      const { password } = getters.account
      const info: any = {
        ...data,
        password
      }
      await easyBipApi.sendMoney(info)
      commit(types.TRANSFER_FOOD_SERVICE_SUCCESS)
      return Promise.resolve({ isChanged: false })
    } catch (error) {
      commit(types.TRANSFER_FOOD_SERVICE_FAILURE)
      throw error
    }
  },
  async getMyGifts ({ commit }, { link }) {
    commit(types.GET_MY_FOOD_GIFTS_REQUEST)
    try {
      const { gifts } = await easyBipApi.getUserGifts({ link })
      commit(types.GET_MY_FOOD_GIFTS_SUCCESS, { gifts })
      return
    } catch (error) {
      commit(types.GET_MY_FOOD_GIFTS_FAILURE)
      throw error
    }
  }
}

export default {
  types,
  state,
  getters,
  mutations,
  actions
}
