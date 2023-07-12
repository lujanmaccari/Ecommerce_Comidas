import { createStore } from 'vuex'

const store = createStore({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product)
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product)
    },
    removeItemFromCart({ commit, state }, index) {
      if (index >= 0 && index < state.cart.length) {
        commit('removeFromCart', index);
      }
    },
  },
  getters: {
    cartItems(state) {
      return state.cart
    },

    cartTotal(state) {
      return state.cart.reduce((total, item) => total + parseFloat(item.precio), 0)
    }
  }
})

export default store
