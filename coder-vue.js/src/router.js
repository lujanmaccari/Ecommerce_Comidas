import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from './Views/LoginForm.vue'
import RegisterComponent from './Views/RegisterComponent.vue'
import CartComponent from './Views/CartComponent.vue'
import AdminPanel from './Views/AdminPanel.vue'
import UserPanel from './Views/UserPanel.vue'
import GestionPedidos from './Views/GestionPedidos.vue'

const routes = [
  { path: '/', redirect: '/user-panel' },
  { path: '/login', component: LoginForm, name: 'login' },
  { path: '/register', component: RegisterComponent, name: 'register' },
  { path: '/cart', component: CartComponent, name: 'cart' },
  { path: '/user-panel', component: UserPanel, name: 'user-panel' },
  { path: '/admin-panel', component: AdminPanel, name: 'admin-panel' },
  { path: '/gestion-pedidos', component: GestionPedidos, name: 'gestion-pedidos' },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
