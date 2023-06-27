import axios from 'axios'

export const BASE_URL = 'https://6498a1459543ce0f49e236df.mockapi.io'

export class GestionProductos {
    url = BASE_URL + '/products'
  
    async obtenerProductos() {
      try {
        return await axios.get(this.url)
      } catch (error) {
        console.log('Error en obtener producto' + error.message)
      }
    }
  
    async guardarProducto(product) {
      try {
        return await axios.post(this.url, product)
      } catch (error) {
        console.log('Error en guardar producto' + error.message)
      }
    }
  
    async actualizarProducto(id, product) {
      try {
        return await axios.put(this.url + id, product)
      } catch (error) {
        console.log('Error en actualizar producto' + error.message)
      }
    }
  
    async borrarProducto(id) {
      try {
        return await axios.delete(this.url + id)
      } catch (error) {
        console.log('Error en borrar producto' + error.message)
      }
    }
  }