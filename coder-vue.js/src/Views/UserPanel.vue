<template>
  <div class="general">
    <div class="flex justify-end gap-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded">
        <router-link :to="{ name: 'login' }"> Iniciar sesión </router-link>
      </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded">
        <router-link :to="{ name: 'register' }"> Registrarse </router-link>
      </button>
    </div>

    <h1>Nuestra selección para vos</h1>

    <div class="container">
      <div class="card" v-for="item in listadoProductos" :key="item.id">
        <h3>
          {{ item.nombre }}
        </h3>

        <img :src="item.foto" alt="hamburguesa" class="imagen" />

        <p>$ {{ item.precio }}</p>
        <div>
          <button @click="addToCart(item)">
            <p>Agregar al carrito</p>
          </button>
        </div>
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
      cart: []
    }
  },
  mounted() {
    this.obtenerProductos()
  },
  methods: {
    ...mapActions({
      addToCart: 'addToCart' // Corrección: mapear la acción addToCart correctamente
    }),
    // addToCart(product) {
    //   this.addItemToCart(product)
    // },
    // cambiarNombre() {
    //   this.$store.dispatch('cambiarNombrePersona')
    // },
    // addToCart() {
    //   this.$store.dispatch('addToCartAction')
    // },
    async obtenerProductos() {
      let comidas = await obtenerProductos()
      this.listadoProductos = comidas
      console.log(this.listadoProductos)
    },
    async eliminarProducto() {
      //   let { data: comidas } = await this.gestionProductos.obtenerProductos()
      //   this.listadoProductos = comidas
      //   console.log(this.listadoProductos)
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
  background-color: rgba(0, 0, 0, 0.747);
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

.btn {
  margin-top: 20px;
  border: none;
  background-color: transparent;
  padding: 8px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}
</style>
