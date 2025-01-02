import { createRouter, createWebHistory } from 'vue-router'
import TicketSearch from '../views/TicketSearch.vue'
import OrderList from '../views/OrderList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'search',
      component: TicketSearch
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrderList
    }
  ]
})

export default router