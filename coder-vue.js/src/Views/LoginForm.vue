<template>
  <div class="container">
    <div
      v-if="invalidCredentials"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      Credenciales erroneas
    </div>
    <div
      v-if="login"
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
    >
      Inicio de sesion correcto
    </div>
    <h1>Bienvenido!</h1>
    <div>
      <form @submit.prevent="formSubmitHandler">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="formState.email" />
        </div>
        <div>
          <label for="message">Contraseña</label>
          <input type="text" id="password" name="password" v-model="formState.password" />
        </div>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded">
          Enviar
        </button>
        <router-link
          :to="{ name: 'register' }"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >Registrarse</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
import { Usuarios } from '../usuarios.js'

export default {
  name: 'LoginForm',
  data() {
    return {
      login: false,
      invalidCredentials: false,
      formState: {
        name: '',
        email: '',
        password: '',
        isAdmin: false
      },
      usuario: new Usuarios()
    }
  },

  methods: {
    async formSubmitHandler() {
      const { data: usuariosCreados } = await this.usuario.obtenerUsuarios()
      console.log(usuariosCreados)

      const encontrarUsuario = usuariosCreados.find(
        (usuario) =>
          usuario.email === this.formState.email && usuario.password === this.formState.password
      )

      if (encontrarUsuario) {
        this.login = true
        this.invalidCredentials = false
        localStorage.setItem('userInfo', JSON.stringify(encontrarUsuario))
        setTimeout(() => {
          this.$router.push(encontrarUsuario.isAdmin ? '/admin-panel' : '/user-panel')
        }, 3000)
      } else {
        this.invalidCredentials = true
      }
    }
  }
}
</script>

<style scoped>
.container {
  background-color: aliceblue;
  border-radius: 20px;
  max-width: 400px;
  padding: 200px;
  display: flex;
  flex-direction: column;
}
.form {
  display: flex;
  flex-direction: column;

  justify-content: space-evenly;
  height: 40vh;
}
</style>
