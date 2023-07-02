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
    <h1 class="typography">Bienvenido!</h1>
    <div>
      <form @submit.prevent="formSubmitHandler" class="containerForm">
        <div>
          <label for="email" class="typography">Email</label>
          <input type="email" id="email" name="email" v-model="formState.email" class="rounded-full h-8 pl-2"/>
        </div>
        <div>
          <label for="message" class="typography">Contraseña</label>
          <input type="password" id="password" name="password" v-model="formState.password" class="rounded-full h-8 pl-2"/>
        </div>

        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          Enviar
        </button>
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
  background-color: rgba(0, 0, 0, 0.829);
  border-radius: 20px;
  width: 400px;
  padding: 200px;
  display: flex;
  flex-direction: column;
}
h1.typography {
  font-weight: bold;
  font-size: 30px;
  margin-top: 30px;
}
.typography {
  color: white;
}

.containerForm {
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
