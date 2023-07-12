<template>
  <div>
    <h1>Tus productos seleccionados</h1>

    <div class="containerResumen">
      <p>Total de artículos: {{ cartItems.length }}</p>
      <p>Total a pagar: ${{ cartTotal }}</p>
    </div>

    <div class="container">
      <div class="card" v-for="(product, index) in cartItems" :key="product.id">
        <h3>
          {{ product.nombre }}
        </h3>

        <img :src="product.foto" alt="hamburguesa" class="imagen" />

        <p>$ {{ product.precio }}</p>
        <button
          @click="removeItem(index)"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Eliminar producto
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
  },
  methods: {
    ...mapActions(['removeItemFromCart']),
    removeItem(index) {
      this.removeItemFromCart(index)
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
  gap: 20px;
}

h1 {
  text-align: center;
  font-weight: bold;
  margin: 80px;
  color: white;
  font-size: 75px;
}
.card {
  background-color: rgba(0, 0, 0, 0.829);
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 40vh;
  height: 55vh;
  justify-content: space-around;
  align-items: center;
}
.containerResumen {
  background-color: rgba(0, 0, 0, 0.829);
  color: white;
}
.imagen {
  height: 150px;
  width: fit-content;
}
.imagen:hover {
  opacity: 0.5;
}

h3 {
  font-weight: bold;
  color: white;
}

p {
  font-weight: 500;
  text-align: center;
  color: white;
}
</style>
