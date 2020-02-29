import Vue from 'vue'
import map from 'lodash/fp/map'
import fromPairs from 'lodash/fp/fromPairs'
import flow from 'lodash/fp/flow'
import flatMap from 'lodash/fp/flatMap'
import concat from 'lodash/fp/concat'
import BN from 'bignumber.js'

import easyBipApi from '@/utils/api'
import Router from '@/router'

const types = flow(
  flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE']),
  concat([
    'RESET',
    'SET_REQUIRED_AMOUNT'
  ]),
  map(x => [x, x]),
  fromPairs
)([
  'CREATE_SINGLE_WALLET',
  'CREATE_MULTI_WALLET',
  'GET_ADDRESS_BY_URL',
  'GET_MONEY_BY_ADDRESS',
  'ACTIVATE_WALLET',
  'CHECK_LINK_ACTIVATE',
  'LOGIN',
  'TRANSFER'
])

function initialState () {
  return {
    address: {
      loading: false,
      value: ''
    },
    balance: '0',
    receiveLink: '',
    receiveLinks: [],
    requiredBalance: '0',
    isActive: false,
    receipt: {
      from: '',
      to: '',
      amount: '',
      email: '',
      balance: ''
    },
    account: {
      password: ''
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

  [types.CREATE_SINGLE_WALLET_REQUEST] (state) {
    Vue.set(state.address, 'loading', true)
  },
  [types.CREATE_SINGLE_WALLET_SUCCESS] (state) {},
  [types.CREATE_SINGLE_WALLET_FAILURE] (state) {},

  [types.CREATE_MULTI_WALLET_REQUEST] (state) {
    Vue.set(state.address, 'loading', true)
  },
  [types.CREATE_MULTI_WALLET_SUCCESS] (state) {},
  [types.CREATE_MULTI_WALLET_FAILURE] (state) {},

  [types.GET_ADDRESS_BY_URL_REQUEST] (state) {
    Vue.set(state, 'address', {
      value: '',
      loading: true
    })
  },
  [types.GET_ADDRESS_BY_URL_SUCCESS] (state, { address }) {
    Vue.set(state, 'address', {
      value: address,
      loading: true
    })
  },
  [types.GET_ADDRESS_BY_URL_FAILURE] (state) {},

  [types.GET_MONEY_BY_ADDRESS_REQUEST] (state) {},
  [types.GET_MONEY_BY_ADDRESS_SUCCESS] (state, { balance }) {
    if (new BN(balance).gt(0)) {
      state.balance = String(balance)
      Vue.set(state.address, 'loading', false)
    }
  },
  [types.GET_MONEY_BY_ADDRESS_FAILURE] (state) {},

  [types.ACTIVATE_WALLET_REQUEST] (state) {},
  [types.ACTIVATE_WALLET_SUCCESS] (state, { link }) {
    if (Array.isArray(link)) {
      state.receiveLinks = link
    } else {
      state.receiveLink = link
    }
  },
  [types.ACTIVATE_WALLET_FAILURE] (state) {},

  [types.CHECK_LINK_ACTIVATE_REQUEST] (state) {},
  [types.CHECK_LINK_ACTIVATE_SUCCESS] (state, { isActive }) {
    state.isActive = isActive
  },
  [types.CHECK_LINK_ACTIVATE_FAILURE] (state) {},

  [types.LOGIN_REQUEST] (state) {},
  [types.LOGIN_SUCCESS] (state, { from, to, amount, email, balance, password }) {
    const { BIP } = balance
    const real = new BN(BIP).div(
      new BN(10).pow(18)
    ).toString()
    Vue.set(state, 'receipt', {
      from,
      to,
      amount,
      email,
      balance: real
    })
    Vue.set(state, 'account', {
      password
    })
  },
  [types.LOGIN_FAILURE] (state) {},

  [types.TRANSFER_REQUEST] (state) {},
  [types.TRANSFER_SUCCESS] (state) {},
  [types.TRANSFER_FAILURE] (state) {},

  [types.SET_REQUIRED_AMOUNT] (state, { amount }) {
    state.requiredBalance = amount
  }

}

const actions = {
  async createSingleWallet ({ commit }, data) {
    commit(types.CREATE_SINGLE_WALLET_REQUEST)
    try {
      const { link } = await easyBipApi.sendSingleUser(data)
      await Router.push({
        name: 'PaymentLink',
        params: {
          link
        }
      })
      commit(types.CREATE_SINGLE_WALLET_SUCCESS)
    } catch (error) {
      commit(types.CREATE_SINGLE_WALLET_FAILURE)
      throw error
    }
  },

  async createMultiWallet ({ commit }, data) {
    commit(types.CREATE_MULTI_WALLET_REQUEST)
    try {
      const { link } = await easyBipApi.sendMultiUsers(data)
      await Router.push({
        name: 'PaymentLink',
        params: {
          link
        }
      })
      commit(types.CREATE_MULTI_WALLET_SUCCESS)
    } catch (error) {
      commit(types.CREATE_MULTI_WALLET_FAILURE)
      throw error
    }
  },

  async getAddressByUrl ({ commit }, data) {
    commit(types.GET_ADDRESS_BY_URL_REQUEST)
    try {
      const { address } = await easyBipApi.getUserLink(data)
      commit(types.GET_ADDRESS_BY_URL_SUCCESS, { address })
    } catch (error) {
      commit(types.GET_ADDRESS_BY_URL_FAILURE)
      throw error
    }
  },

  async checkMoneyAmount ({ commit }, data) {
    commit(types.GET_MONEY_BY_ADDRESS_REQUEST)
    try {
      const { balance } = await easyBipApi.checkMoneyAmount(data)
      const { BIP } = balance
      const real = new BN(BIP).div(
        new BN(10).pow(18)
      ).toString()
      commit(types.GET_MONEY_BY_ADDRESS_SUCCESS, { balance: real })
    } catch (error) {
      commit(types.GET_MONEY_BY_ADDRESS_FAILURE)
    }
  },

  async activateWallet ({ commit }, data) {
    commit(types.ACTIVATE_WALLET_REQUEST)
    try {
      const { link } = await easyBipApi.activateWallet(data)
      commit(types.ACTIVATE_WALLET_SUCCESS, { link })
    } catch (error) {
      commit(types.ACTIVATE_WALLET_FAILURE)
    }
  },

  async isLinkActivated ({ commit }, data) {
    commit(types.CHECK_LINK_ACTIVATE_REQUEST)
    try {
      const { is_activated: isActive } = await easyBipApi.isLinkActive(data)
      if (!isActive) {
        await Router.push({
          name: 'Home'
        })
      }
      commit(types.CHECK_LINK_ACTIVATE_SUCCESS, { isActive })
    } catch (error) {
      commit(types.CHECK_LINK_ACTIVATE_FAILURE)
      throw error
    }
  },

  async login ({ commit }, data) {
    commit(types.LOGIN_REQUEST)
    try {
      const { password } = data
      const {
        from_: from,
        to,
        amount,
        email,
        balance
      } = await easyBipApi.checkPassword(data)
      commit(types.LOGIN_SUCCESS, { from, to, amount, email, balance, password })
      return Promise.resolve()
    } catch (error) {
      commit(types.LOGIN_FAILURE)
      throw error
    }
  },

  async transfer ({ commit, state, dispatch }, data) {
    commit(types.TRANSFER_REQUEST)
    try {
      const { password } = state.account
      const info = {
        ...data,
        password
      }
      await easyBipApi.sendMoney(info)
      await dispatch('login', {
        link: data.link,
        password
      })
      commit(types.TRANSFER_SUCCESS)
      return Promise.resolve()
    } catch (error) {
      commit(types.TRANSFER_FAILURE)
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
