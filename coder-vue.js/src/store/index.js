import { createStore } from 'vuex'

const store = createStore({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },

    cleanCart(state){
      state.cart = []
    },

    removeFromCart(state, index) {
      const product = state.cart[index]
      if (product.quantity > 1) {
        product.quantity -= 1
      } else {
        state.cart.splice(index, 1)
      }
    },
    removeAll(state, index) {
      state.cart.splice(index, 1)
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product)
    },
    removeItemFromCart({ commit, state }, index) {
      if (index >= 0 && index < state.cart.length) {
        commit('removeFromCart', index)
      }
    },
    removeAll({ commit }, index) {
      commit('removeAll', index)
    },
    cleanCart({commit}){
      commit('cleanCart')
    }
  },
  getters: {
    cartItems(state) {
      return state.cart
    },

    cartTotal(state) {
      return state.cart.reduce((total, item) => total + parseFloat(item.precio) * item.quantity, 0)
    }
  }
})

export default store
