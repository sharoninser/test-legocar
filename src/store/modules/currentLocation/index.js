import axios from 'axios'
const API = process.env.VUE_APP_API
const KEY = process.env.VUE_APP_KEY

export default {
  namespaced: true,
  state () {
    return {
      loading: true,
      dataWeather: {
        city: '',
        weather: '',
        temperature: '',
        humidity: '',
        country: ''
      }
    }
  },
  getters: {
    getWeather (state) {
      return state.dataWeather
    },
    getLoaging (state) {
      return state.loading
    }
  },
  mutations: {
    setCurrentWeather (state, resLocationWeather) {
      state.dataWeather.city = resLocationWeather.name
      state.dataWeather.weather = resLocationWeather.weather[0].main
      state.dataWeather.temperature = Math.ceil(resLocationWeather.main.temp)
      state.dataWeather.humidity = resLocationWeather.main.humidity
      state.dataWeather.country = resLocationWeather.sys.country
    },
    loadingStatus (state, status) {
      state.loading = status
    }
  },
  actions: {
    cityCurrentWeather ({ commit }, url) {
      commit('loadingStatus', true)
      axios.get(API + KEY + url)
        .then(response => {
          commit('setCurrentWeather', response.data)
          commit('loadingStatus', false)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
