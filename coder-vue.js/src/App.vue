<template>
  <header>
    <div class="container">
      <LoginForm msg="Bienvenido!" />
    </div>
  </header>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
export default {
  name: 'App',
  components: {
    LoginForm
  }
}
</script>

<style scoped>

.container{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
}
</style>
