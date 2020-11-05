import router from '@/router'

const state = {
  booking: null
}
const mutations = {
  setBooking (state, data) {
    state.booking = data
    router.push({ name: 'form' })
  }
}
const actions = {
  setBooking ({ commit }, data) {
    commit('setBooking', data)
  }
}
const getters = {
  getBooking: state => state.booking
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}