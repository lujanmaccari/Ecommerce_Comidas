<template>
  <div>
    <h1>Tus productos seleccionados</h1>
    <p>Total de artículos: {{ cartItems.length }}</p>
    <p>Total a pagar: ${{ cartTotal }}</p>
    <div class="container">
      <div class="card" v-for="product in cartItems" :key="product.id">
        <h3>
          {{ product.product }}
        </h3>

        <img :src="product.image" alt="hamburguesa" class="imagen" />

        <p>$ {{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
    
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
h1 {
  text-align: center;
  font-weight: bold;
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
.imagen {
  height: 150px;
  width: fit-content;
}
.imagen:hover {
  opacity: 0.5;
}

h3 {
  font-weight: bold;
}
p {
  font-weight: 500;
  text-align: center;
}
</style>
