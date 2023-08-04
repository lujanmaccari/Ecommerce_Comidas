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
        <p class="circle">{{ product.quantity }}</p>
        <button
          @click="removeTotal(index)"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Eliminar producto
        </button>
        <div class="flex">
          <button
            @click="removeItem(index)"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1 mx-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            -
          </button>
          <p>{{ product.quantity }}</p>
          <button
            @click="addItem(product)"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 mx-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <button
      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      Confirmar orden
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
  },
  methods: {
    ...mapActions(['removeItemFromCart', 'addToCart', 'removeAll']),
    removeItem(index) {
      this.removeItemFromCart(index)
    },

    addItem(product) {
      this.addToCart(product)
    },

    removeTotal(index) {
      this.removeAll(index)
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
  position: relative;
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

.circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: rgb(211, 7, 7);
  position: absolute;
  top: 0%;
  left: 99%;
  transform: translate(-50%, -50%);
}
</style>
