import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Payment from '@/views/Payment.vue'
import Receipt from '@/views/Receipt.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/receipt',
    name: 'Receipt',
    component: Receipt
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
