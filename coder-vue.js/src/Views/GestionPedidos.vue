<template>
  <div>
    <h1>Gestion de pedidos</h1>

    <div class="container">
      <div class="card" v-for="product in usuariosConPedidos" :key="product.id">
        <h3>
          Pedido a nombre de:
          {{ product.name }}
        </h3>
        <div class="card" v-for="item in product.products" :key="item.id">
          <h3>
            {{ item.nombre }}
          </h3>

          <img :src="item.foto" alt="hamburguesa" class="imagen" />

          <p>$ {{ item.precio }}</p>
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
      const { data: usuariosCreados } = await this.usuarios.obtenerUsuarios()
      this.productos = usuariosCreados

      for (let obj of usuariosCreados) {
        if (obj.products.length > 0) {
          this.usuariosConPedidos.push(obj)
          console.log(this.usuariosConPedidos, 'hola')
        }
      }
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 80px;
  color: white;
  font-size: 75px;
}

</style>
