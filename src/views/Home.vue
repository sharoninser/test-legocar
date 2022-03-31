<template>
  <div class="home">
      <div class="container">
          <div class="home__wrapper">
              <div class="home__top">
                <h1>World Weather</h1>
                <p class="subtitle">Watch weather in your current location</p>
              </div>
              <div class="home__current">
                  <div class="home__current-card">
                    <Card />
                  </div>
              </div>
              <div class="home__other">
                  <div class="home__other-list">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </div>
              </div>
              <button class="home__add-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white" fill-opacity="0.87"/>
                    </svg>
              </button>
          </div>
      </div>
      {{city}} {{country}}
      {{weather}}
      {{temperature + ' °C'}}
      {{humidity + ' %'}}
  </div>
</template>

<script>
import Card from '@/components/Card'
import axios from 'axios'
const API = process.env.VUE_APP_API
const KEY = process.env.VUE_APP_KEY

export default {
  name: 'home',
  data () {
    return {
      city: '',
      weather: '',
      temperature: '',
      humidity: '',
      country: ''
    }
  },
  components: {
    Card
  },
  methods: {
    geolocation () {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError)
    },
    getWeather (url) {
      axios
        .get(url)
        .then(response => {
          this.city = response.data.name
          this.weather = response.data.weather[0].main
          this.temperature = Math.ceil(response.data.main.temp)
          this.humidity = response.data.main.humidity
          this.country = response.data.sys.country
        })
        .catch(error => {
          console.log(error)
        })
    },
    buildUrl (position) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      this.getWeather(API + '&lat=' + lat + '&lon=' + lon + KEY)
    },
    geoError () {
      this.getWeather(API + '&lat=0&lon=0' + KEY)
    }
  },
  mounted () {
    this.geolocation()
  }
}
</script>
