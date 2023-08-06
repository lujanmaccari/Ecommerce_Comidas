<template>
  <div class="general">
    <div class="flex justify-end gap-4" v-if="!login">
      <button class="text-white py-2 my-5">
        <router-link :to="{ name: 'login' }"> Iniciar sesión </router-link>
      </button>
      <button class="text-white py-2 pl-4 my-5">
        <router-link :to="{ name: 'register' }"> Registrarse </router-link>
      </button>
    </div>

    <div class="flex justify-end gap-4" v-if="login">
      <button class="text-white py-2 my-5" @click="logout()">Cerrar sesión</button>
    </div>

    <h1>Nuestra selección para vos</h1>

    <!-- El usuario no esta loggeado -->
    <div
      v-if="mensajeLogin"
      id="alert-additional-content-3"
      class="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert"
    >
      <div class="flex items-center">
        <span class="sr-only">Info</span>
        <div class="text-lg font-medium text-green">
          Inicia sesion para agregar productos al carrito
        </div>
      </div>

      <div class="flex">
        <router-link :to="{ name: 'login' }">
          <button
            type="button"
            class="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Iniciar sesión
          </button>
        </router-link>
      </div>
    </div>

    <!-- El producto se añadio al carrito -->
    <div
      v-if="addedToCart"
      id="alert-additional-content-3"
      class="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
      role="alert"
    >
      <div class="flex items-center">
        <span class="sr-only">Info</span>
        <div class="text-lg font-medium text-green">Producto añadido con éxito!</div>
      </div>

      <div class="flex">
        <router-link :to="{ name: 'cart' }">
          <button
            type="button"
            class="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <svg
              aria-hidden="true"
              class="-ml-0.5 mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Ir al carrito
          </button>
        </router-link>
      </div>
    </div>

    <div class="container">
      <div class="card" v-for="item in listadoProductos" :key="item.id">
        <h3>
          {{ item.nombre }}
        </h3>

        <img :src="item.foto" alt="hamburguesa" class="imagen" />

        <p>$ {{ item.precio }}</p>

        <button
          @click="agregarAlCarrito(item)"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        >
          <p>Agregar al carrito</p>
        </button>
      </div>
    </div>

    <div class="fixed bottom-0 right-0 m-4 bg-white rounded-full px-2 pb-4">
      <router-link :to="{ name: 'cart' }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="file: mt-4 h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { obtenerProductos } from '../gestionProductos'

export default {
  name: 'UserPanel',
  data() {
    return {
      // gestionProductos: new GestionProductos(),
      listadoProductos: [],
      cart: [],
      userID: '',
      updatedInfo: {},
      addedToCart: false,
      userInfo: {},
      login: true,
      mensajeLogin: false
    }
  },
  mounted() {
    this.obtenerProductos()
  },
  created() {
    this.obtenerAutorizacion()
  },
  methods: {
    ...mapActions({
      addToCart: 'addToCart'
    }),

    // Productos cargados
    async obtenerProductos() {
      let comidas = await obtenerProductos()
      this.listadoProductos = comidas
    },

    // Chequear si el usuario esta loggeado
    async obtenerAutorizacion() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))

      if (userInfo === null) {
        this.login = false
      } else {
        this.userInfo = userInfo
        this.login = true
      }
    },

    // Impedir agregar productos al carrito a no ser que el usuario este loggeado
    agregarAlCarrito(item) {
      if (this.login) {
        this.addToCart(item)
        // this.obtenerUserInfo(item)
        this.addedToCart = true
      } else {
        this.mensajeLogin = true
      }
    },

    logout() {
      this.login = false
      localStorage.clear()
    }
  }
}
</script>

<style scoped>
.general {
  margin-bottom: 100px;
}
.container {
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.card {
  background-color: rgba(0, 0, 0, 0.829);
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 40vh;
  height: 55vh;
  justify-content: space-around;
  align-items: center;
}

p {
  width: 30vh;
  text-align: center;
  color: white;
}

h3 {
  font-weight: bold;
  color: white;
}

h1 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
  font-size: 75px;
}

.imagen {
  height: 150px;
  width: fit-content;
}
.imagen:hover {
  opacity: 0.5;
}
</style>
