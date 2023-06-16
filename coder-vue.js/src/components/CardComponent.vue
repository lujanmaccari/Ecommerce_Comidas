<template>
  <div>
    <h1>Nuestra selección para vos</h1>

    <div class="container">
      <div class="card" v-for="item in info" :key="item.id">
        <h3>
          {{ item.producto }}
        </h3>

        <img :src="item.imagen" alt="hamburguesa" class="imagen" />

        <p>$ {{ item.precio }}</p>
        <div>
          <button class="btn" @click="addToCart(item)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-basket2"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z"
              />
              <path
                d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z"
              />
            </svg>
          </button>
          <button class="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comida from '../dataComida'

export default {
  name: 'DashboardComponent',
  data() {
    return {
      info: comida,
      cart: []
    }
  },
  methods: {
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.cantidad++
      } else {
        this.cart.push({
          id: product.id,
          producto: product.producto,
          precio: product.precio,
          imagen: product.imagen,
          descripcion: product.descripcion,
          cantidad: 1
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
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
