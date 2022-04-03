import { createStore } from 'vuex'
import currentLocation from './modules/currentLocation'
import weatherCities from './modules/weatherCities'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    currentLocation,
    weatherCities
  }
})
