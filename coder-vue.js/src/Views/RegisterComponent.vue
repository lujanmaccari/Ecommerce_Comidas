<template>
  <div class="container">
    <h1 class="typography">Creá tu usuario</h1>
    <div>
      <div v-if="incomplete" class="typography">Complete todos los campos</div>
      <div v-if="sent">Gracias por ponerte en contacto</div>

      <form @submit.prevent="formSubmitHandler" class="containerForm">
        <div>
          <label for="name" class="typography">Nombre</label>
          <input type="text" id="name" name="name" v-model="formState.name" />
        </div>
        <div>
          <label for="email" class="typography">Email</label>
          <input type="email" id="email" name="email" v-model="formState.email" />
        </div>
        <div>
          <label for="message" class="typography">Contraseña</label>
          <input type="text" id="password" name="password" v-model="formState.password" />
        </div>
        <div>
          <label for="isAdmin" class="typography">¿Es administrador?</label>
          <input
            type="checkbox"
            id="isAdmin"
            v-model="formState.isAdmin"
            name="isAdmin"
            class="ml-5"
          />
        </div>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          Crear
        </button>
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
  background-color: rgba(0, 0, 0, 0.829);
  border-radius: 20px;
  width: 500px;
  padding: 200px;
  display: flex;
  flex-direction: column;
}

h1.typography {
  text-align: center;
  width: 50vh;
  font-weight: bold;
  font-size: 30px;
  margin-top: 20px;
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
