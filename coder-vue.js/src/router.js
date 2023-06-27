
import { createRouter, createWebHistory } from 'vue-router'

import DashboardComponent from './Views/DashboardComponent.vue'
import LoginForm from './Views/LoginForm.vue'
import RegisterComponent from './Views/RegisterComponent.vue'
import CartComponent from './Views/CartComponent.vue'


const routes = [
  { path: '/', redirect: '/login', name: 'login' },
  { path: '/login', component: LoginForm, name: 'login' },
  { path: '/dashboard', component: DashboardComponent, name: 'dashboard' },
  { path: '/register', component: RegisterComponent, name: 'register' },
  { path: '/cart', component: CartComponent, name: 'cart' }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
