<template>
  <div>
    <button
      class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      <router-link :to="{ name: 'gestion-pedidos' }"> Gestion de pedidos </router-link>
    </button>
    <h1>Productos disponibles en la web</h1>
    <div class="flex justify-center" v-if="!actualizar">
      <button
        v-if="!showTable"
        @click="toggleTable"
        type="button"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Agregar un nuevo producto
      </button>
      <h3 v-if="!actualizar && showTable">Agregar un nuevo producto</h3>
    </div>
    <div class="flex justify-center" v-if="actualizar">
      <h3>Actualizar producto</h3>
    </div>
    <div v-if="showTable">
      <div class="form">
        <input type="text" placeholder="Ingrese nombre" v-model="formState.nombre" />
        <input type="text" placeholder="Ingrese descripción" v-model="formState.descripcion" />
        <input type="text" placeholder="Ingrese precio" v-model="formState.precio" />
        <input type="text" placeholder="Ingrese foto" v-model="formState.foto" />
      </div>
      <div class="flex justify-center">
        <button
          v-if="actualizar"
          @click="actualizarComida()"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Actualizar
        </button>
        <button
          v-else
          @click="guardarProducto(formState)"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Agregar
        </button>
      </div>
      <p v-if="addedToCart">Agregado!</p>
      <p v-if="mensajeActualizar">Actualizado!</p>
    </div>

    <div class="container">
      <div class="card" v-for="item in listadoProductos" :key="item.id">
        <h3>
          {{ item.nombre }}
        </h3>

        <img :src="item.foto" alt="hamburguesa" class="imagen" />

        <p>$ {{ item.precio }}</p>
        <div>
          <i class="bi bi-trash"></i>
          <button
            @click="eliminarComida(item.id)"
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>

          <button
            @click="obtenerComida(item.id)"
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import { obtenerProductos } from '../gestionProductos'

export default {
  name: 'AdminPanel',
  data() {
    return {
      listadoProductos: [],
      cart: [],
      showTable: false,
      formState: {
        nombre: '',
        descripcion: '',
        precio: '',
        foto: '',
        isInCart: false
      },
      id: '',
      addedToCart: false,
      actualizar: false,
      mensajeActualizar: false
    }
  },
  mounted() {
    this.obtenerComidas()
  },
  methods: {
    async obtenerComidas() {
      let comidas = await obtenerProductos()
      this.listadoProductos = comidas
    },

    toggleTable() {
      this.showTable = !this.showTable
    },

    async actualizarComida() {
      try {
        const response = await axios.put(
          'https://6498a1459543ce0f49e236df.mockapi.io/products/' + this.id,
          this.formState
        )
        if (response.status === 200) {
          this.mensajeActualizar = true
        }

        setTimeout(() => {
          this.showTable = false
        }, 5000)
        return response.data
      } catch (error) {
        console.log('Error en actualizar producto' + error.message)
      }
    },

    async eliminarComida(idProduct) {
      this.id = idProduct
      try {
        const response = await axios.delete(
          'https://6498a1459543ce0f49e236df.mockapi.io/products/' + this.id
        )
        return response.data
      } catch (error) {
        console.log('Error en borrar producto' + error.message)
      }
    },

    async obtenerComida(idProduct) {
      this.id = idProduct
      this.showTable = true
      this.actualizar = true
      try {
        const response = await axios.get(
          `https://6498a1459543ce0f49e236df.mockapi.io/products/${this.id}`
        )
        if (response.status === 200) {
          const producto = response.data
          console.log(response.data)
          this.formState.nombre = producto.nombre
          this.formState.descripcion = producto.descripcion
          this.formState.precio = producto.precio
          this.formState.foto = producto.foto
          this.id = producto.id
        }
      } catch (error) {
        console.log('Error al obtener el producto', error.message)
      }
    },

    async guardarProducto(producto) {
      try {
        const response = await axios.post(
          'https://6498a1459543ce0f49e236df.mockapi.io/products/',
          producto
        )
        if (response.status === 201) {
          this.addedToCart = true
        }
        setTimeout(() => {
          this.showTable = false
        }, 5000)
        return response.data
      } catch (error) {
        console.log('Error en guardar producto' + error.message)
      }
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
  background-color: rgba(0, 0, 0, 0.829);
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
  margin-bottom: 80px;
  margin-top: 20px;
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
  border: none;
  background-color: transparent;
  padding: 8px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  background-color: rgba(111, 175, 230, 0.452);
  border-radius: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn:hover {
  background-color: rgba(111, 175, 230, 0.603);
}

input {
  border: none;
  border-radius: 20px;
  height: 40px;
  padding-left: 20px;
  background-color: black;
  color: white;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
</style>
