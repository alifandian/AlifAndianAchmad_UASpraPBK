import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/patients',
    name: 'Patients',
    component: () => import('../views/PatientsView.vue'),
  },
  {
    path: '/medications',
    name: 'Medications',
    component: () => import('../views/MedicationsView.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UsersView.vue'),
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../views/ReportsView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;