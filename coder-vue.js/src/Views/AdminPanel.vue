<template>
  <div>
    <h1>Productos disponibles en la web</h1>
    <button @click="toggleTable" class="btn">Agregar un nuevo producto</button>
    <div v-if="showTable">
      <div class="form">
        <input type="text" placeholder="Ingrese nombre" v-model="formState.nombre" />
        <input type="text" placeholder="Ingrese descripción" v-model="formState.descripcion" />
        <input type="text" placeholder="Ingrese precio" v-model="formState.precio" />
        <input type="text" placeholder="Ingrese foto" v-model="formState.foto" />
      </div>
      <button class="btn">Agregar</button>
    </div>

    <div class="container">
      <div class="card" v-for="item in listadoProductos" :key="item.id">
        <h3>
          {{ item.product }}
        </h3>

        <img :src="item.image" alt="hamburguesa" class="imagen" />

        <p>$ {{ item.price }}</p>
        <div>
          <button @click="eliminarComida(item.id)">delete</button>
          <button @click="actualizarComida(item.id)">edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GestionProductos } from '../gestionProductos'

export default {
  name: 'AdminPanel',
  data() {
    return {
      gestionProductos: new GestionProductos(),
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
      
    }
  },
  mounted() {
    this.obtenerProductos()
  },
  methods: {
    async obtenerProductos() {
      let comidas = await this.gestionProductos.obtenerProductos()
      this.listadoProductos = comidas
      console.log(this.listadoProductos)
    },

    toggleTable() {
      this.showTable = !this.showTable
    },
    
    async actualizarComida (idProduct) {
      this.id = idProduct
      console.log(this.id)

      let comida = await this.gestionProductos.actualizarProducto( this.id, this.formState)
      console.log(comida)
    },
    async eliminarComida(idProduct) {
      this.id = idProduct
      console.log(this.id)

      let comida = await this.gestionProductos.borrarProducto(this.id)
      console.log(comida)
    },

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
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
/* .btn {
  margin-top: 20px;
  border: none;
 
  background-color: rgba(111, 175, 230, 0.452);
  padding: 8px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: black;
}*/
</style>
