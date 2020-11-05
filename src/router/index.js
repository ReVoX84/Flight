import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/booking'
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('@/components/Booking.vue')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('@/components/Form.vue'),
    beforeEnter: (to, from, next) => {
      store.state.booking.booking ? next() : next('/')
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
