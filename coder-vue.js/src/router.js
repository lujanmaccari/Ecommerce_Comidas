import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from './Views/LoginForm.vue'
import RegisterComponent from './Views/RegisterComponent.vue'
import CartComponent from './Views/CartComponent.vue'
import AdminPanel from './Views/AdminPanel.vue'
import UserPanel from './Views/UserPanel.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/', component: LoginForm,  name: 'login' },
  { path: '/login', component: LoginForm, name: 'login' },
  { path: '/register', component: RegisterComponent, name: 'register' },
  { path: '/cart', component: CartComponent, name: 'cart' },
  { path: '/user-panel', component: UserPanel, name: 'user-panel' },
  { path: '/admin-panel', component: AdminPanel, name: 'admin-panel' },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
