import Vue from 'vue'
import map from 'lodash/fp/map'
import fromPairs from 'lodash/fp/fromPairs'
import flow from 'lodash/fp/flow'
import flatMap from 'lodash/fp/flatMap'
import concat from 'lodash/fp/concat'

import easyBipApi from '@/utils/api'
import phoneServiceApi from '@/utils/service/phone'

const types = flow(
  flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE']),
  concat([
    'RESET'
  ]),
  map(x => [x, x]),
  fromPairs
)([
  'LIMITS_PHONE_SERVICE',
  'TRANSFER_PHONE_SERVICE'
])

function initialState () {
  return {
    phone: {
      limit: 0,
      rub: 0
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

  [types.LIMITS_PHONE_SERVICE_REQUEST] (state) {},
  [types.LIMITS_PHONE_SERVICE_SUCCESS] (state, { RUB: rub, LIMIT: limit }) {
    Vue.set(state, 'phone', {
      limit,
      rub
    })
  },
  [types.LIMITS_PHONE_SERVICE_FAILURE] (state) {},

  [types.TRANSFER_PHONE_SERVICE_REQUEST] (state) {},
  [types.TRANSFER_PHONE_SERVICE_SUCCESS] (state) {},
  [types.TRANSFER_PHONE_SERVICE_FAILURE] (state) {}
}

const actions = {
  async getLimits ({ commit }) {
    commit(types.LIMITS_PHONE_SERVICE_REQUEST)
    try {
      const data = await phoneServiceApi.getLimits()
      commit(types.LIMITS_PHONE_SERVICE_SUCCESS, data)
    } catch (error) {
      commit(types.LIMITS_PHONE_SERVICE_FAILURE)
      throw error
    }
  },
  async transferToPhone ({ commit, getters }, { phone, ...data }) {
    commit(types.TRANSFER_PHONE_SERVICE_REQUEST)
    try {
      const { keyword } = await phoneServiceApi.connectPhone({ phone })
      const { password } = getters.account
      const info: any = {
        ...data,
        password,
        payload: keyword
      }
      await easyBipApi.sendMoney(info)
      commit(types.TRANSFER_PHONE_SERVICE_SUCCESS)
      return Promise.resolve()
    } catch (error) {
      commit(types.TRANSFER_PHONE_SERVICE_FAILURE)
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
