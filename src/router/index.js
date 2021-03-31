import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/Homepage.vue'
import MileageDetail from '../views/MileageDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Homepage
  },
  {
    path: '/detail/:filter',
    name: 'Detail',
    component: MileageDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
