<template>
  <div class="card">
    <transition name="fade" mode="out-in">
      <div class="card__wrapper" v-if="!getLoaging" key="card">
          <div class="card__top">
            <p class="card__title">{{city.city}}</p>
            <p class="card__subtitle">{{city.country}}</p>
          </div>
          <ul>
            <li>
                <span class="card__option">Weather</span>
                <span class="card__value">{{city.weather}}</span>
            </li>
            <li>
                <span class="card__option">Temperature</span>
                <span class="card__value">{{city.temperature}} °C</span>
            </li>
            <li>
                <span class="card__option">Humidity</span>
                <span class="card__value">{{city.humidity}} %</span>
            </li>
          </ul>
          <p class="card__time">{{getTimeAgo}}</p>
          <div class="card__buttons">
            <div class="card__buttons-item">
              <button class="btn" @click="removeCurrentCity">REMOVE</button>
            </div>
            <div class="card__buttons-item">
              <button class="btn">RELOAD</button>
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'card',
  data () {
    return {
      currentTime: '',
      timeText: ''
    }
  },
  props: {
    city: {
      type: Object
    }
  },
  methods: {
    ...mapMutations('weatherCities', ['timeTextFunc']),
    removeCurrentCity () {
      this.$emit('removeCurrent', this.city.city)
    }
  },
  computed: {
    ...mapGetters('weatherCities', ['getLoaging', 'getTimeAgo'])
  },
  mounted () {
    setInterval(() => {
      this.timeTextFunc()
    }, 5000)
  }
}
</script>
