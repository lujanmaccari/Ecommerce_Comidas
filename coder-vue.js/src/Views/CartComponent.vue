<template>
  <div>
    <h1>Tus productos seleccionados</h1>

    <div class="containerResumen">
      <p>Total de artículos: {{ cartItems.length }}</p>
      <p>Total a pagar: ${{ cartTotal }}</p>
    </div>

    <div class="container">
      <div class="card" v-for="product in cartItems" :key="product.id">
        <h3>
          {{ product.nombre }}
        </h3>

        <img :src="product.foto" alt="hamburguesa" class="imagen" />

        <p>$ {{ product.precio }}</p>
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
  margin: 80px;
  color: white;
  font-size: 75px;
}
.card {
  background-color: rgba(0, 0, 0, 0.747);

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
  background-color: rgba(0, 0, 0, 0.747);
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
