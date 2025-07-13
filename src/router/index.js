import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/patients',
    name: 'Patients',
    component: () => import('../views/PatientsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/medications',
    name: 'Medications',
    component: () => import('../views/MedicationsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UsersView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../views/ReportsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  // Jika halaman memerlukan autentikasi dan user belum login
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  }
  // Jika user sudah login dan mencoba akses halaman login
  else if (to.path === '/login' && isLoggedIn) {
    next('/')
  }
  // Jika tidak ada masalah, lanjutkan
  else {
    next()
  }
})

export default router;