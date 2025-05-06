import ViewContestList from '@/views/ViewContestList.vue'
import ViewHome from '@/views/ViewHome.vue'
import ViewProblemList from '@/views/ViewProblemList.vue'
import ViewRecordList from '@/views/ViewRecordList.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guard'

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
      path: '/contest',
      name: 'contest',
      component: ViewContestList,
    },
    {
      path: '/record',
      name: 'record',
      component: ViewRecordList,
    },
    {
      path: '/record/:rid',
      name: 'record-detail',
      component: () => import('@/views/ViewRecordDetail.vue'),
      props: true,
    },
    {
      path: '/user',
      name: 'user-default',
      component: () => import('@/views/ViewUser.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/user/:uid_str',
      name: 'user',
      component: () => import('@/views/ViewUser.vue'),
      props: true,
    },
    {
      path: '/contest/problem/:pid',
      name: 'contest-problem-detail',
      component: () => import('@/views/ViewProblemDetail.vue'),
      props: true,
    },
    {
      path: '/contest/record/:rid',
      name: 'contest-record-detail',
      component: () => import('@/views/ViewRecordDetail.vue'),
      props: true,
    },
    {
      path: '/contest/:cid_str',
      name: 'contest-detail',
      component: () => import('@/views/ViewContestDetail.vue'),
      props: true,
    },
  ],
})

setupRouterGuard(router)

export default router
