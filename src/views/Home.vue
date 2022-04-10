<template>
  <transition name="fade" appear="">
    <div class="home">
      <div class="container">
        <div class="home__wrapper">
          <div class="home__top">
            <h1>World Weather</h1>
            <p class="subtitle">Watch weather in your current location</p>
          </div>
          <div class="home__current">
            <div class="home__current-card">
              <Card
                :city="getCurrentCityWeather"
                :card="'current'"
              />
            </div>
          </div>
          <div class="home__other">
            <transition name="fade" mode="out-in">
              <div class="home__other-list" v-if="getOtherCityWeather.length" key="other-list">
                <transition-group name="fade">
                  <Card
                    v-for="otherCity in getOtherCityWeather"
                    :key="otherCity.name"
                    :city="otherCity"
                    :card="'other'"
                    @removeCurrent="onRemoveCity"
                  />
                </transition-group>
              </div>
              <p class="home__other-notification" v-else key="notification">Here you will see the weather in other cities</p>
            </transition>
          </div>
          <button class="home__add-button" @click="openModal" v-if="!isModalVisible">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white" fill-opacity="0.87"/>
            </svg>
          </button>
        </div>
          <!-- {{getWeather}} -->
      </div>
      <Modal v-show="isModalVisible" @close="closeModal" :isOpen="isModalVisible"/>
    </div>
  </transition>
</template>

<script>
import Modal from '@/components/Modal'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Card from '@/components/Card'

export default {
  name: 'home',
  data () {
    return {
      isModalVisible: false
    }
  },
  components: {
    Modal,
    Card
  },
  methods: {
    ...mapMutations('weather', ['removeCity']),
    ...mapActions('weather', ['cityWeather']),
    geolocation () {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError)
    },
    buildUrl (position) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      this.cityWeather({
        url: '&lat=' + lat + '&lon=' + lon,
        city: 'currentCity'
      })
      // this.timeAgo()
    },
    geoError () {
      this.cityWeather({
        url: '&lat=0&lon=0',
        city: 'currentCity'
      })
    },
    onRemoveCity (cityName) {
      this.removeCity(cityName)
    },
    openModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  },
  computed: {
    ...mapGetters('weather', ['getOtherCityWeather', 'getCurrentCityWeather'])
  },
  mounted () {
    this.geolocation()
  }
}
</script>
