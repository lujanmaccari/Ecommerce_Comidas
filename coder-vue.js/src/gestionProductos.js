import axios from 'axios'

const BASE_URL = 'https://6498a1459543ce0f49e236df.mockapi.io'

const url = BASE_URL + '/products/'

export const obtenerProductos = async () => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log('Error en obtener producto' + error.message)
  }
}

export const obtenerProductoPorId = async (id) => {
  try {
    const response = await axios.get(url + id)
    return response.data
  } catch (error) {
    console.log('Error en obtener producto' + error.message)
  }
}

export const guardarProducto = async (product) => {
  try {
    const response = await axios.post(url, product)
    return response.data
  } catch (error) {
    console.log('Error en guardar producto' + error.message)
  }
}

export const actualizarProducto = async (id, product) => {
  try {
    console.log(id, product)
    const response = await axios.put(url + id, product)
    return response.data
  } catch (error) {
    console.log('Error en actualizar producto' + error.message)
  }
}

export const borrarProducto = async (id) => {
  try {
    const response = await axios.delete(url + id)
    return response.data
  } catch (error) {
    console.log('Error en borrar producto' + error.message)
  }
}

