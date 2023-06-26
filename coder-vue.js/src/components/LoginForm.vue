<template>
  <div class="container">
    <h1>Bienvenido!</h1>
    <div>
      <form @submit.prevent="formSubmitHandler">
        <div v-if="invalidCredentials">Credenciales erroneas</div>
        <div v-if="login">Inicio de sesion correcto</div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="formState.email" />
        </div>
        <div>
          <label for="message">Contraseña</label>
          <input type="text" id="password" name="password" v-model="formState.password" />
        </div>

        <button>Enviar</button>
        <router-link :to="{ name: 'register' }">Registrarse</router-link>
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
.btn {
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  background-color: rgba(111, 175, 230, 0.452);
  padding: 8px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: black;
}
.btn:hover {
  background-color: rgba(111, 175, 230, 0.603);
}
.input {
  border: none;
  border-radius: 10px;
  padding: 5px;
  background-color: rgba(205, 230, 252, 0.425);
}
.text {
  font-size: 15px;
  cursor: default;
}
.register {
  text-decoration: none;
  color: black;
  align-self: center;
  font-size: 12px;
}
.register:hover {
  color: rgb(155, 176, 194);
  background-color: transparent;
}
</style>
