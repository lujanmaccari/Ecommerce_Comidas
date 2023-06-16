import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import DashboardComponent from './components/DashboardComponent.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterComponent from './components/RegisterComponent.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginForm },
    { path: '/Dashboard', component: DashboardComponent },
    { path: '/Register', component: RegisterComponent }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
