// layout
import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index',
        name: 'index',
        meta,
        component: () => import('@/pages/index')
      },
      {
        path: '/prolist',
        name: 'prolist',
        component: () => import('@/pages/prolist'),
        meta: { meta, title: '产品列表' }
      },
      {
        path: '/proclassyes',
        name: 'proclassyes',
        component: () => import('@/pages/prolist/proclassyes'),
        meta: { meta, title: '已分类产品列表' }
      },
      {
        path: '/proclassno',
        name: 'proclassno',
        component: () => import('@/pages/prolist/proclassno'),
        meta: { meta, title: '未分类产品列表' }
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/pages/page2'),
        meta: { meta, title: '分类列表' }
      },
      {
        path: '/page3',
        name: 'page3',
        component: () => import('@/pages/page3'),
        meta: { meta, title: '标准列表' }
      },
      {
        path: '/rule',
        name: 'rule',
        component: () => import('@/pages/rule'),
        meta: { meta, title: '分类规则' }
      },
      {
        path: '/upload',
        name: 'upload',
        component: () => import('@/pages/upload'),
        meta: { meta, title: '上传数据' }
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登陆
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
