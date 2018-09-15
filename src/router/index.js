import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import volunteers from '../views/volunteers/volunteers'
import HistoryService from '../views/program/HistoryService'
import oldman from '../views/program/oldman'
import volunteerService from '../views/program/volunteerService'
import UploadedDemand from '../views/program/UploadedDemand'
import Information from '../views/program/Information'
import ModifyDemand from '../views/program/ModifyDemand'
import Application from '../views/program/Application'
import Applying from '../views/medals/Applying'
import NoticeList from '../views/notice/index2'
import Homepage from '../views/homepage/index'
import CheckInfo from '../views/check/index'
import { Upload } from 'element-ui'
/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }**/

export const constantRouterMap = [
  { path: '/login', name: 'login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: _import('login/index'),
    name: 'login'
  }

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '/homepage',
    component: Layout,
    children: [{
      path: '',
      component: _import('homepage/index'),
      name: 'home',
      meta: { title: '首页', icon: 'home', noCache: true }
    }] },
  {
    path: '/search',
    component: Layout,

    name: 'searchall',
    redirect: '/search/index',
    meta: {title:'搜索',icon: 'search'},
    children: [
      {
       path: 'index',
       name: 'search',
       component: _import('search/index'),
       meta: { title: '老人被服务需求'}
      },
      {
        path: 'volunteerProvide',
        name: 'volunteerProvide',
        component: _import('search/volunteerProvide'),
        meta: { title: '志愿者可提供服务'}
      }
  ]
  },

  {
    path: '/program',
    name: 'program',
    component: Layout,
    redirect: oldman,
    meta: {
      title: '我的操作',
      icon: 'component'
    },
    children: [
      {
        path: 'oldman',
        component: oldman,
        name: 'oldman',
        meta: { title: '发布被服务需求' }
      },
      {
        path: 'volunteerService',
        component: volunteerService,
        name: 'volunteerService',
        meta: { title: '发布可提供服务' }
      },
      {
        path: 'UploadedDemand',
        component: UploadedDemand,
        name: 'UploadedDemand',
        meta: { title: '历史需求' }
      },
      {
        path: 'HistoryService',
        component: HistoryService,
        name: 'HistoryService',
        meta: { title: '历史服务' }
      }
    ]
  },

  {
    path: '/check',
    name: 'check',
    component: Layout,
    redirct: '/check/checkingList',
    meta: {
      title: '审核',
      icon: 'check'
    },
    children: [{
      path: 'checkingList',
      name: 'checkingList',
      component: _import('check/checkingList'),
      meta: { title: '待审核', icon: 'checking' }
    },
    {
      path: 'checkedList',
      name: 'checkedList',
      component: _import('check/checkedList'),
      meta: { title: '已审核', icon: 'checked' }
    }
    ]
  },
  {
    path: '/medals',
    name: 'medals',
    component: Layout,
    redirect: 'applying',
    meta: {
      title: '勋章信息',
      icon: 'medal'
    },
    children: [
      { path: 'applying', component: _import('medals/Applying'), name: 'applying', meta: { title: '已转移' }},
      { path: 'got', component: _import('medals/Have Got'), name: 'got', meta: { title: '已获得' }}
    ]
  },

  {
    path: '/personal',
    component: Layout,
    children: [{
      path: 'index',
      name: 'personal',
      component: _import('personal/index'),
      meta: { title: '个人信息', icon: 'personal' }
    }]
  },

  {
    path: '/notice',
    component: Layout,
    children: [{
      path: 'index',
      name: 'notice',
      component: _import('notice/index2'),
      meta: { title: '通知', icon: 'message' }
    }]
  },
  {
    path: '/search1',
    name: 'search1',
    component: _import('firstpage/search1')
  },
  {
    path: '/search2',
    name: 'search2',
    component: _import('firstpage/search2')
  },
  {
    path: '/firstpage',
    name: 'firstpage',
    component: _import('firstpage/tourist')
  },
  {
    path: '/volunteers',
    component: volunteers,
    name: 'haha'
  },

  {
    path: '/ModifyDemand',
    component: ModifyDemand,
    name: 'modify'
  },

  {
    path: '/Application',
    component: Application,
    name: 'application'
  },
  {
    path: '/Oldman',
    component: oldman,
    name: 'oldman'
  },

  // {
  //   path: '/editDemand',
  //   component: editDemand,
  //   name: 'editDemand'
  // },

  {
    path: '/Information',
    component: Information,
    name: 'Info'
  },

  {
    path: '/Applying',
    component: Applying,
    name: 'applying'
  },
  {
    path: '/CheckInfo',
    component: CheckInfo,
    name: 'checkInfo',
    hidden: true
  },
  {
    path: '/Register',
    component: _import('register/index'),
    name: 'register',
    hidden: true
  },
  {
    path: '/Register/jump',
    component: _import('register/jumpPage'),
    name: 'registerJump',
    hidden: true
  }

]
