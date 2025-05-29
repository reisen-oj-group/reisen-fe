import ViewContestList from '@/views/ViewContestList.vue'
import ViewHome from '@/views/ViewHome.vue'
import ViewProblemList from '@/views/ViewProblemList.vue'
import ViewRecordList from '@/views/ViewRecordList.vue'
import LayoutAdmin from '@/components/layout/LayoutAdmin.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guard.ts'

import ViewTest from '@/views/ViewTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      name: 'test',
      component: ViewTest,
    },
    {
      path: '/',
      name: 'home',
      component: ViewHome,
    },
    {
      path: '/problem',
      name: 'problem-list',
      component: ViewProblemList,
    },
    {
      path: '/problem/create',
      name: 'problem-create',
      component: () => import('@/views/ViewProblemEdit.vue'),
    },
    {
      path: '/problem/:pid_str(\\d+)',
      name: 'problem-detail',
      component: () => import('@/views/ViewProblemDetail.vue'),
      props: true,
    },
    {
      path: '/problem/:pid_str(\\d+)/edit',
      name: 'problem-edit',
      component: () => import('@/views/ViewProblemEdit.vue'),
      props: true,
    },
    {
      path: '/record',
      name: 'record',
      component: ViewRecordList,
    },
    {
      path: '/record/:rid_str(\\d+)',
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
      path: '/user/:uid_str(\\d+)',
      name: 'user',
      component: () => import('@/views/ViewUser.vue'),
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/contest',
      name: 'contest-list',
      component: ViewContestList,
    },
    {
      path: '/contest/create',
      name: 'contest-create',
      component: ViewContestList,
    },
    {
      path: '/contest/:cid_str(\\d+)',
      name: 'contest-detail',
      component: () => import('@/views/ViewContestDetail.vue'),
      props: true,
    },
    {
      path: '/contest/:cid_str(\\d+)/edit',
      name: 'contest-edit',
      component: import('@/views/ViewContestEdit.vue'),
      props: true,
    },
    {
      path: '/contest/:cid_str(\\d+)/ranklist',
      name: 'contest-ranklist',
      component: () => import('@/views/ViewContestRanking.vue'),
      props: true,
    },
    {
      path: '/contest/:cid_str(\\d+)/:plabel',
      name: 'contest-problem-detail',
      component: () => import('@/views/ViewProblemDetail.vue'),
      props: true,
    },
    {
      path: '/admin',
      component: LayoutAdmin,
      meta: { requiresAuth: true, isAdmin: true },
      children: [
        // 用户管理
        {
          path: 'users',
          component: () => import('@/components/admin/AdminUser.vue'),
          meta: { title: '用户列表' },
        },
        // {
        //   path: 'auth',
        //   component: () => import('@/components/admin/AuthList.vue'),
        //   meta: { title: '登录信息' }
        // },

        // 题目管理
        {
          path: 'problems',
          component: () => import('@/components/admin/AdminProblem.vue'),
          meta: { title: '题目列表' },
        },
        {
          path: 'tags',
          component: () => import('@/components/admin/AdminTag.vue'),
          meta: { title: '标签分类' },
        },
        // {
        //   path: 'levels',
        //   component: () => import('@/components/admin/LevelList.vue'),
        //   meta: { title: '难度分级' }
        // },

        // 比赛管理
        {
          path: 'contests',
          component: () => import('@/components/admin/AdminContest.vue'),
          meta: { title: '比赛列表' },
        },
        // {
        //   path: 'rankings',
        //   component: () => import('@/components/admin/RankingList.vue'),
        //   meta: { title: '比赛排名' }
        // },
        // {
        //   path: 'registrations',
        //   component: () => import('@/components/admin/RegistrationList.vue'),
        //   meta: { title: '报名信息' }
        // },

        // // 评测管理
        // {
        //   path: 'submissions',
        //   component: () => import('@/components/admin/SubmissionList.vue'),
        //   meta: { title: '提交记录' }
        // },
        // {
        //   path: 'results',
        //   component: () => import('@/components/admin/ResultList.vue'),
        //   meta: { title: '题目结果' }
        // },
        // {
        //   path: 'verdicts',
        //   component: () => import('@/components/admin/VerdictList.vue'),
        //   meta: { title: '评测状态' }
        // },
        // {
        //   path: 'code-langs',
        //   component: () => import('@/components/admin/CodeLangList.vue'),
        //   meta: { title: '编程语言' }
        // },

        // // 系统配置
        // {
        //   path: 'user-langs',
        //   component: () => import('@/components/admin/UserLangList.vue'),
        //   meta: { title: '用户语言' }
        // }
      ],
    },
  ],
})

setupRouterGuard(router)

export default router
