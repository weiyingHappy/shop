import * as types from '../mutation-types'

const state = {
  added: localStorage.cartData !== undefined ? JSON.parse(localStorage.cartData) : []
}

const getters = {
  cart (state) {
    return state.added
  },
  cartCount (state) {
    let count = 0
    state.added.forEach((item) => {
      count += item.num
    })
    return count
  },
  Price (state) {
    let price = 0
    state.added.forEach((item) => {
      price += item.product.price * item.num
    })
    return price.toFixed(2)
  },
  images (state) {
    return state.added.map(item => item.product.product.imgs[0])
  },
  firstProductName (state) {
    if (state.added.length === 0) return ''
    return state.added[0].product.product_name
  },
  productInf (state) {
    let info = []
    state.added.forEach((item) => {
      console.log(item)
      info.push({
        id: item.product.id,
        num: item.num
      })
    })
    return info
  }
}
const actions = {
  /**
   * 添加商品到购物车
   * @param {object} param0 vuex自带对象
   * @param {*} data 传入值
   */
  add ({ commit, state }, data) {
    const result = state.added.find(item => data.id === item.product.id)
    let num = 1
    if (result) {
      num = result.num + 1
    }
    commit(types.UPDATE_CART, {
      product: data,
      num
    })
  },
  reduce ({ commit, state }, data) {
    const result = state.added.find(item => data.id === item.product.id)

    commit(types.UPDATE_CART, {
      product: data,
      num: result.num - 1
    })
  },
  clearCart ({ commit }) {
    commit(types.CLEAR_CART)
  }
}

const mutations = {
  [types.UPDATE_CART] (state, { product, num }) {
    const result = state.added.find(item => product.id === item.product.id)

    if (num === 0) {
      state.added = state.added.filter(item => item.product.id !== product.id)
    }
    if (result) {
      state.added = state.added.map((item) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            num
          }
        }

        return item
      })
    } else {
      state.added.push({
        product,
        num
      })
    }
    localStorage.cartData = JSON.stringify(state.added)
  },
  [types.CLEAR_CART] (state) {
    state.added = []
    localStorage.cartData = JSON.stringify(state.added)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
