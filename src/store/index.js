import { createStore } from 'vuex'
import currentLocation from './modules/currentLocation'
import weatherCities from './modules/weatherCities'
import weather from './modules/weather'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    currentLocation,
    weatherCities,
    weather
  }
})
