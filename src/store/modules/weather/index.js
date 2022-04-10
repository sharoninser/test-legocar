import axios from 'axios'
import { instanceAPI } from '@/api'

export default {
  namespaced: true,
  state () {
    return {
      loading: true,
      currentCityWeather: null,
      otherCityWeather: []
    }
  },
  getters: {
    getOtherCityWeather (state) {
      return state.otherCityWeather
    },
    getCurrentCityWeather (state) {
      return state.currentCityWeather
    },
    getLoaging (state) {
      return state.loading
    }
  },
  mutations: {
    setCurrentWeather (state, { res, city }) {
      if (city === 'currentCity') {
        state.currentCityWeather = res
      } else {
        state.otherCityWeather.push(res)
      }
    },
    loadingStatus (state, status) {
      state.loading = status
    },
    removeCity (state, city) {
      state.otherCityWeather = state.otherCityWeather.filter(c => c.name !== city)
      // const localListSities = JSON.parse(localStorage.getItem('listCities'))
      // const updateListCities = localListSities.filter(c => c.city !== city)
      // localStorage.setItem('listCities', JSON.stringify(updateListCities))
    }
  },
  actions: {
    cityWeather ({ commit }, { url, city = null }) {
      // commit('loadingStatus', true)
      axios.get(instanceAPI + url)
        .then(response => {
          commit('setCurrentWeather', {
            res: response.data,
            city: city
          })
          commit('loadingStatus', false)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
