
const routes = [
  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/admin',
    meta: { requiresAuth: true },
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/admin', component: () => import('pages/admin/Dash.vue') },
      { path: '/admin/clinic', component: () => import('pages/admin/clinic/Index.vue') },
      //{ path: '/clientes', component: () => import('pages/admin/Clientes.vue') },
      //{ path: '/pacientes', component: () => import('pages/admin/Pacientes.vue') },
      //{ path: '/entradas', component: () => import('pages/admin/Entradas.vue') },
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