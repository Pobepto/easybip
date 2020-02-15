import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Payment from '@/views/Payment.vue'
import Receipt from '@/views/Receipt.vue'

import Store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    alias: '/c',
    name: 'Payment',
    component: Payment,
    children: [
      {
        path: ':link',
        name: 'PaymentLink',
        component: Payment,
        async beforeEnter (to, from, next) {
          const { link } = to.params
          Store.dispatch('getAddressByUrl', { link })
            .then(() => {
              next()
            })
            .catch(() => {
              next({ name: 'Home' })
            })
        }
      }
    ]
  },
  {
    path: '/receipt',
    alias: '/r',
    name: 'Receipt',
    component: Receipt,
    children: [
      {
        path: ':link',
        name: 'ReceiptLink',
        component: Receipt,
        async beforeEnter (to, from, next) {
          const { link } = to.params
          Store.dispatch('isLinkActivated', { link })
            .then(() => {
              next()
            })
            .catch(() => {
              next({ name: 'Home' })
            })
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
