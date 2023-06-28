import axios from 'axios'

export const BASE_URL = 'https://6498a1459543ce0f49e236df.mockapi.io'

export class GestionProductos {
  url = BASE_URL + '/products/'

  async obtenerProductos() {
    try {
      const response =  await axios.get(this.url)
      return response.data
    } catch (error) {
      console.log('Error en obtener producto' + error.message)
    }
  }

  async guardarProducto(product) {
    try {
      const response = await axios.post(this.url, product)
      return response.data
    } catch (error) {
      console.log('Error en guardar producto' + error.message)
    }
  }

  async actualizarProducto(id, product) {
    try {
      console.log(id, product)
      const response =  await axios.put(this.url + id, product)
      return response.data
    } catch (error) {
      console.log('Error en actualizar producto' + error.message)
    }
  }

  async borrarProducto(id) {
    try {
      const response = await axios.delete(this.url + id)
      return response.data
    } catch (error) {
      console.log('Error en borrar producto' + error.message)
    }
  }
}
