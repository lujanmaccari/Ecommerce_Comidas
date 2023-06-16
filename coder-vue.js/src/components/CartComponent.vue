<template>
  <div>
    <h1>Tus productos seleccionados</h1>
    <div class="container">
      <div class="card" v-for="item in localStorageItem" :key="item.id">
        <h3>
          {{ item.producto }}
        </h3>

        <img :src="item.imagen" alt="hamburguesa" class="imagen" />
      </div>
    </div>
    <p>Total a pagar: ${{ total }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localStorageItem: null
    }
  },
  mounted() {
    this.localStorageItem = localStorage.getItem('carrito')
    this.localStorageItem = JSON.parse(this.localStorageItem)
  },
  computed: {
    total() {
      if (this.localStorageItem != null) {
        return this.localStorageItem.reduce(
          (acumulador, producto) => acumulador + producto.precio,
          0
        )
      }
      return 0
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  justify-content: center;
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
