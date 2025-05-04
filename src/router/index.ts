import ViewHome from '@/views/ViewHome.vue'
import ViewProblemList from '@/views/ViewProblemList.vue'
import ViewRecordList from '@/views/ViewRecordList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewHome,
    },
    {
      path: '/problem',
      name: 'problem',
      component: ViewProblemList,
    },
    {
      path: '/problem/:pid',
      name: 'problem-detail',
      component: () => import('@/views/ViewProblemDetail.vue'),
      props: true,
    },
    {
      path: '/record',
      name: 'record',
      component: ViewRecordList,
    },
  ],
})

export default router
