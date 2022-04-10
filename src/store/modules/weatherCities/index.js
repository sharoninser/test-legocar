import axios from 'axios'
import moment from 'moment'
import { instanceAPI } from '@/api'

export default {
  namespaced: true,
  state () {
    return {
      currentTime: '',
      timeText: '',
      loading: false,
      cities: JSON.parse(localStorage.getItem('listCities')) || []
    }
  },
  getters: {
    getListCities (state) {
      return state.cities
    },
    getLoaging (state) {
      return state.loading
    },
    getTimeAgo (state) {
      return state.timeText
    }
  },
  mutations: {
    setWeather (state, resWeather) {
      const sityCurrent = {
        city: resWeather.name,
        weather: resWeather.weather[0].main,
        temperature: Math.ceil(resWeather.main.temp),
        humidity: resWeather.main.humidity,
        country: resWeather.sys.country
      }
      state.cities.push(sityCurrent)
      localStorage.setItem('listCities', JSON.stringify(state.cities))
      state.currentTime = moment().format()
    },
    loadingStatus (state, status) {
      state.loading = status
    },
    removeCity (state, city) {
      state.cities = state.cities.filter(c => c.city !== city)
      const localListSities = JSON.parse(localStorage.getItem('listCities'))
      const updateListCities = localListSities.filter(c => c.city !== city)
      localStorage.setItem('listCities', JSON.stringify(updateListCities))
    },
    timeTextFunc (state) {
      state.timeText = moment(state.currentTime).fromNow()
    }
  },
  actions: {
    cityWeather ({ commit }, url) {
      axios.get(instanceAPI + url)
        .then(response => {
          commit('setWeather', response.data)
          commit('timeTextFunc')
          commit('loadingStatus', false)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
