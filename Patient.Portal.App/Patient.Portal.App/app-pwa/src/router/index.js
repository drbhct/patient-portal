import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../layouts/Dashboard.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/menu',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'messages',
        name: 'Messages',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/Messages.vue')
      },
      {
        meta: {
          requiresAuth: true
        },
        path: 'statement',
        name: 'Statement',
        component: () => import('../components/billing/TaskStatement.vue')
      },
      {
        meta: {
          requiresAuth: true
        },
        path: 'viewpdf',
        name: 'ViewPdf',
        component: () => import('../components/documents/ViewPdfDoc.vue')
      },
      {
        meta: {
          requiresAuth: true
        },
        path: 'appointments',
        name: 'Appointments',
        component: () => import('../views/Appointments.vue')
      },
      {
        meta: {
          requiresAuth: true
        },
        path: 'billing',
        name: 'Billing',
        component: () => import('../views/Billing.vue')
      },
      {
        meta: {
          requiresAuth: true
        },
        path: 'documents',
        name: 'Documents',
        component: () => import('../views/Documents.vue')
      },
      {
        meta: {
          requiresAuth: true
        },
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue')
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: () => import('../views/Tasks.vue')
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/ContactUs.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },
    component: Dashboard
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../layouts/Account.vue'),
    children: [
      {
        path: 'login',
        name: 'Landing',
        component: () => import('../views/account/Landing.vue')
      },
      {
        path: 'create',
        name: 'CreateAccount',
        component: () => import('../views/account/Create.vue')
      },
      {
        path: 'requestpin',
        name: 'RequestPin',
        component: () => import('../views/account/RequestPin.vue')
      },
      {
        path: 'forgotusername',
        name: 'ForgotUserName',
        component: () => import('../views/account/ForgotUserName.vue')
      },
      {
        path: 'forgotpassword',
        name: 'ForgotPassword',
        component: () => import('../views/account/ForgotPassword.vue')
      }
    ]
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('../layouts/Task.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('../layouts/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeResolve((to, from, next) => {
  // console.log('to >', to)
  if (to.path === '/default.aspx') {
    next({ path: '/account/login' })
  }
  if (to.matched.some(route => route.meta.requiresAuth)) {
    let isAuth = false
    // const user = Vue.$cookies.get('user')
    // const user = localStorage.getItem('config')
    const user = sessionStorage.getItem('config')
    const profile = JSON.parse(localStorage.getItem('vuex'))
    if (!profile) {
      next({ path: '/account/login' })
    } else {
      const hasProfile = profile.profile.profileAuthInfo !== null
      if (user) {
        if (hasProfile) {
          isAuth = true
        }
      }
      if (isAuth) {
        next()
      } else {
        next({ path: '/account/login' })
      }
    }
  } else {
    next()
  }
})

export default router
