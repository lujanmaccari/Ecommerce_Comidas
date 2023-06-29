import { createStore } from 'vuex'

const store = createStore({
  state: {
    cart: [],  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
  },
  getters: {
    cartItems(state) {
      return state.cart;
    },

    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price, 0)
    }
  }
})

export default store
