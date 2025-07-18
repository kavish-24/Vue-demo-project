const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'LoginPage', 
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'admin',
        name: 'AdminDashboard',
        component: () => import('pages/AdminDashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'user',
        name: 'UserDashboard',
        component: () => import('src/pages/UserDashboard.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]
export default routes
