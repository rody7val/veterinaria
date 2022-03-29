const routes = [
  //public
  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/', component: () => import('pages') }
    ]
  },
  //public strict
  {
    path: '/auth',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/auth',
        meta: { publicStrict: true },
        component: () => import('pages/auth')
      }
    ],
  },
  //auth/admin
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/admin',
        meta: { adminStrict: true, },
        component: () => import('pages/admin')
      },
      {
        path: '/admin/clinic',
        meta: { adminStrict: true, },
        component: () => import('pages/admin/clinic')
      },
    ]
  },
  //auth/admin
  {
    path: '/calendar',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/calendar',
        meta: { adminStrict: true },
        component: () => import('pages/calendar')
      },
    ]
  },
  //auth/client
  /*{
    path: '/client',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/client',
        meta: { requiresAuth: true },
        component: () => import('pages/client')
      },
    ]
  },*/
  //auth/all
  {
    path: '/my',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/my',
        meta: { requiresAuth: true },
        component: () => import('pages/my')
      }
    ],
  },
  //{ path: '/client/:idCliente', component: () => import('pages/client/view') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes