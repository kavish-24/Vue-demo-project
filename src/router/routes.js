const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: 'admin', component: () => import('pages/AdminDashboard.vue') },
      { path: 'user', component: () => import('pages/UserDashboard.vue') }
    ]
  }
]

export default routes
