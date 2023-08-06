<template>
  <div class="divContenedor">
    <div class="flex justify-end">
      <button class="text-white text-sm px-5 py-2.5 mr-2 mb-2">
        <router-link :to="{ name: 'admin-panel' }">ABM de Productos</router-link>
      </button>
    </div>
    <h1>Gestion de pedidos</h1>

    <div v-for="product in usuariosConPedidos" :key="product.id">
      <h3 class="typography">
        Pedido a nombre de:
        {{ product.name }}
      </h3>
      <div v-for="item in product.orders" :key="item.id">
        <h3 class="text-white">Realizado el: {{ formatDate(item.timestamp) }}</h3>
        <div class="container">
          <div class="card" v-for="dato in item.products" :key="dato.id">
            <p class="circle">{{ dato.quantity }}</p>
            <h3 class="text-white">
              {{ dato.nombre }}
            </h3>

            <img :src="dato.foto" alt="hamburguesa" class="imagen" />

            <p class="text-white">$ {{ dato.precio }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Usuarios } from '../usuarios.js'

export default {
  name: 'GestionPedidos',
  data() {
    return {
      usuarios: new Usuarios(),
      productos: [],
      usuariosConPedidos: []
    }
  },
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
  },
  created() {
    this.obtenerUser()
  },
  methods: {
    async obtenerUser() {
      // Obtener lista de usuarios y guardarlo en estado
      const { data: usuariosCreados } = await this.usuarios.obtenerUsuarios()
      this.productos = usuariosCreados

      console.log(usuariosCreados)
      // Verificar que usuario tiene productos cargados en en carrito y guardarlos en estado
      for (let obj of usuariosCreados) {
        if (obj.orders?.length > 0) {
          this.usuariosConPedidos.push(obj)
        }
      }
    },

    formatDate(date) {
      const f2 = date?.replace('T', ' ')
      const newDate = new Date(f2)
      let day = newDate.getDate()
      if (day < 10) {
        day = '0' + day
      }

      let month = newDate.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }

      let year = newDate.getFullYear()

      const fechaFormateada = year + '-' + month + '-' + day
      return fechaFormateada
    }
  }
}
</script>

<style scoped>
.divContenedor {
  width: 200vh;
}
.container {
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

h1 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 80px;
  color: white;
  font-size: 75px;
}

.typography {
  font-weight: bold;
  color: white;
  font-size: 40px;
}

p {
  font-weight: 500;
  text-align: center;
  color: white;
}
.card {
  margin: 0px 20px 20px 0px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.829);
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* margin: 20px; */
  width: 40vh;
  height: 55vh;
  justify-content: space-around;
  align-items: center;
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
