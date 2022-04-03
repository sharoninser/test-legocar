<template>
  <div class="card">
    <transition name="fade" mode="out-in">
      <div class="card__wrapper" v-if="!getLoaging" key="card">
          <div class="card__top">
            <p class="card__title">{{getWeather.city}}{{', ' + getWeather.country}}</p>
            <p class="card__subtitle">Your current location</p>
          </div>
          <ul>
            <li>
                <span class="card__option">Weather</span>
                <span class="card__value">{{getWeather.weather}}</span>
            </li>
            <li>
                <span class="card__option">Temperature</span>
                <span class="card__value">{{getWeather.temperature}} °C</span>
            </li>
            <li>
                <span class="card__option">Humidity</span>
                <span class="card__value">{{getWeather.humidity}} %</span>
            </li>
          </ul>
          <p class="card__time">{{this.timeText}}</p>
          <div class="card__buttons">
            <div class="card__buttons-item">
              <button class="btn" @click="reloadWeather">RELOAD</button>
            </div>
          </div>
      </div>
      <div class="loader" v-else key="loader">
          <div class="loader-block">
              <div class="loader-icon">
                  <svg width="50" height="50" viewBox="25 25 50 50">
                      <circle cx="50" cy="50" r="20" fill="none" stroke="#9B51E0" stroke-width="3"></circle>
                  </svg>
              </div>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'card-current',
  data () {
    return {
      currentTime: '',
      timeText: ''
    }
  },
  methods: {
    ...mapActions('currentLocation', ['cityCurrentWeather']),

    geolocation () {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError)
    },
    buildUrl (position) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      this.cityCurrentWeather('&lat=' + lat + '&lon=' + lon)
      this.timeAgo()
    },
    geoError () {
      this.cityCurrentWeather('&lat=0&lon=0')
    },
    reloadWeather () {
      this.cityCurrentWeather('&q=' + this.getWeather.city)
      this.timeAgo()
    },
    timeAgo () {
      this.currentTime = moment().format()
      this.timeText = moment(this.currentTime).fromNow()
    }
  },
  computed: {
    ...mapGetters('currentLocation', ['getWeather', 'getLoaging'])
  },
  mounted () {
    this.geolocation()
    setInterval(() => {
      if (this.currentTime) {
        this.timeText = moment(this.currentTime).fromNow()
      }
    }, 5000)
  }
}
</script>
