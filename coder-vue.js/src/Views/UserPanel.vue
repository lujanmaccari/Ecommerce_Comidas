<template>
  <div>
    <div class="flex justify-end gap-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded">
        <router-link :to="{ name: 'login' }"> Iniciar sesión </router-link>
      </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded">
        <router-link :to="{ name: 'register' }"> Registrarse </router-link>
      </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded">
        <router-link :to="{ name: 'cart' }"> Carrito </router-link>
      </button>
    </div>
    <h1>Nuestra selección para vos</h1>

    <div class="container">
      <div class="card" v-for="item in listadoProductos" :key="item.id">
        <h3>
          {{ item.product }}
        </h3>

        <img :src="item.image" alt="hamburguesa" class="imagen" />

        <p>$ {{ item.price }}</p>
        <div>
          <button  @click="addToCart(item)">Agregar al carrito</button>

        
        </div>
      </div>
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
.container {
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.card {
  background-color: aliceblue;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 50vh;
  height: fit-content;
  justify-content: center;
  align-items: center;
}
p {
  width: 30vh;
  text-align: center;
}
h3 {
  font-weight: bold;
}
h1 {
  text-align: center;
  font-weight: bold;
  margin: 80px;
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
