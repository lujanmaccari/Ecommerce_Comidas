<template>
  <div>
    <h1>Tus productos seleccionados</h1>
    <div v-if="!mensajeCompraExitosa && this.cartItems.length > 0">
      <div class="containerResumen">
        <p>Total de artículos: {{ cartItems.length }}</p>
        <p>Total a pagar: ${{ cartTotal }}</p>
      </div>

      <div class="container2">
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

        <div v-if="this.cartItems.length > 0">
          <button
            @click="confirmOrder()"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Confirmar orden
          </button>
        </div>
      </div>
    </div>
    <div v-if="!mensajeCompraExitosa && !(this.cartItems.length > 0)">
      <p>Parece que aún no has seleccionado nada...</p>
      <router-link to="user-panel"> <p>Ir a la tienda</p></router-link>
    </div>

    <div v-if="mensajeCompraExitosa">
      <div class="alert alert-success" role="alert">
        <p>¡Tu compra se realizó correctamente!</p>
        <router-link to="user-panel"> <p>Volver a comprar</p></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      userID: '',
      updatedInfo: {},
      cart: [],
      mensajeCompraExitosa: false
    }
  },
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
  },
  methods: {
    ...mapActions(['removeItemFromCart', 'addToCart', 'removeAll', 'cleanCart']),
    removeItem(index) {
      this.removeItemFromCart(index)
    },

    addItem(product) {
      this.addToCart(product)
    },

    removeTotal(index) {
      this.removeAll(index)
    },

    clean() {
      this.cleanCart()
    },

    async confirmOrder() {
      const date = new Date()
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.userID = userInfo?.id

      try {
        const response = await axios.get(
          `https://6498a1459543ce0f49e236df.mockapi.io/users/${this.userID}`
        )
        if (response.status === 200) {
          const userInfo = response.data

          this.updatedInfo = {
            ...userInfo,
            orders: [
              {
                timestamp: date,
                total: this.cart.reduce((total, item) => total + parseFloat(item.precio), 0),
                products: this.cartItems
              }
            ]
          }
          this.actualizarUserInfo()

          this.mensajeCompraExitosa = true

          setTimeout(() => {
            this.clean()
          }, 100)
        }
      } catch (error) {
        console.log('Error al obtener el userInfo', error.message)
      }
    },

    async actualizarUserInfo() {
      try {
        const response = await axios.put(
          `https://6498a1459543ce0f49e236df.mockapi.io/users/${this.userID}`,
          this.updatedInfo
        )
        setTimeout(() => {
          this.addedToCart = false
        }, 1000)
        return response.data
      } catch (error) {
        console.log('Error al obtener el userInfo', error.message)
      }
    }
  }
}
</script>

<style scoped>
.container {
  height: 70vh;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.container2 {
  flex-direction: column;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
