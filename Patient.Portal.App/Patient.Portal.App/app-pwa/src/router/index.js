import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../layouts/Dashboard.vue'
import { useAuthStore } from '../stores/auth'

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
    meta: {
      requiresAuth: true
    },
    name: 'fortis-payment',
    path: '/statement/payment/new-card',
    template: '<router-view/>',
    component: () => import('../components/billing/FortisCardPayment.vue')
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
        name: 'Login',
        component: () => import('../views/account/Login.vue')
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
    path: '/handlerform',
    name: 'HandlerForm',
    component: () => import('../views/HandlerForm.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: () => import('../layouts/PageNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeResolve(async (to, from) => {
  if (to.path === '/default.aspx') {
    return { path: '/account/login' }
  }

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    const authStore = useAuthStore()
    const user = sessionStorage.getItem('config')
    const isAuthenticated = authStore.isAuthenticated

    if (!isAuthenticated || !user) {
      return { path: '/account/login' }
    }
  }
})

export default router
