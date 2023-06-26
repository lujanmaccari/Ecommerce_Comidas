<template>
  <div class="container">
    <h2>Creá tu usuario</h2>
    <div>
      <div v-if="incomplete">Complete todos los campos</div>
      <div v-if="sent">Gracias por ponerte en contacto</div>

      <form @submit.prevent="formSubmitHandler">
        <div>
          <label for="name">Nombre</label>
          <input type="text" id="name" name="name" v-model="formState.name" />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="formState.email" />
        </div>
        <div>
          <label for="message">Contraseña</label>
          <input type="text" id="password" name="password" v-model="formState.password" />
        </div>
        <div>
          <label for="isAdmin">¿Es administrador?</label>
          <input type="checkbox" id="isAdmin" v-model="formState.isAdmin" name="isAdmin" />
        </div>
        <button>Enviar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { Usuarios } from '../usuarios.js'
export default {
  name: 'RegisterComponent',
  data() {
    return {
      // path: '/',
      sent: false,
      incomplete: false,
      formState: {
        name: '',
        email: '',
        password: '',
        isAdmin: false
      },
      usuario: new Usuarios()
    }
  },
  created() {
    console.log(this.formState)
  },
  methods: {
    async formSubmitHandler() {
      console.log(this.formState)

      if (!this.formState.name || !this.formState.email || !this.formState.password) {
        this.incomplete = true
      } else {
        let newUser = await this.usuario.guardarUsuario(this.formState)
        console.log(newUser)
        this.sent = true
        this.incomplete = false
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
h2 {
  width: 30vh;
  text-align: center;
}
</style>
