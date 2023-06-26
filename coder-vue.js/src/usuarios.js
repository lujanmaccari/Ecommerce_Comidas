import axios from 'axios'

export const BASE_URL = 'https://6498a1459543ce0f49e236df.mockapi.io'

export class Usuarios {
  url = BASE_URL + '/users'

  async obtenerUsuarios() {
    try {
      return await axios.get(this.url)
    } catch (error) {
      console.log('Error' + error.message)
    }
  }

  async guardarUsuario(user) {
    try {
      return await axios.post(this.url, user)
    } catch (error) {
      console.log('Error' + error.message)
    }
  }
}
