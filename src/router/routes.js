
const routes = [
  //public
  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/', component: () => import('pages') },
      {
        path: '/auth',
        meta: { publicStrict: true },
        component: () => import('pages/auth')
      },
    ]
  },
  //auth
  {
    path: '/admin',
    meta: { requiresAuth: true },
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/admin',
        adminStrict: true,
        component: () => import('pages/admin'),
      },
      {
        path: '/admin/clinic',
        adminStrict: true,
        component: () => import('pages/admin/clinic'),
      },
      { path: '/my', component: () => import('pages/my') },
      { path: '/client', component: () => import('pages/client') },
      //{ path: '/client/:idCliente', component: () => import('pages/client/view') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes