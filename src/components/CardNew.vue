<template>
  <div class="card">
    <transition name="fade" mode="out-in">
      <div class="card__wrapper" v-if="!getLoaging" key="cards">
        <div class="card__top" v-if="card === 'current'">
          <p class="card__title">{{city.name}}{{', ' + city.sys.country}}</p>
          <p class="card__subtitle">Your current location</p>
        </div>
        <div class="card__top" v-if="card === 'other'">
          <p class="card__title">{{city.name}}</p>
          <p class="card__subtitle">{{city.sys.country}}</p>
        </div>
        <ul>
          <li>
              <span class="card__option">Weather</span>
              <span class="card__value">{{city.weather[0].main}}</span>
          </li>
          <li>
              <span class="card__option">Temperature</span>
              <span class="card__value">{{Math.ceil(city.main.temp)}} °C</span>
          </li>
          <li>
              <span class="card__option">Humidity</span>
              <span class="card__value">{{city.main.humidity}} %</span>
          </li>
        </ul>
        <p class="card__time"></p>
        <div class="card__buttons">
          <div class="card__buttons-item" v-if="card === 'other'">
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
import { mapGetters } from 'vuex'

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
    },
    card: {
      type: String,
      default: 'other'
    }
  },
  methods: {
    // ...mapMutations('weatherCities', ['timeTextFunc']),
    removeCurrentCity () {
      this.$emit('removeCurrent', this.city.name)
    }
  },
  computed: {
    ...mapGetters('weather', ['getLoaging'])
  },
  // created () {
  //   if (this.card === 'current') {
  //     this.geolocation()
  //   }
  // }
  mounted () {
    // console.log(this.city)
    // setInterval(() => {
    //   this.timeTextFunc()
    // }, 5000)
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/abstract/_variables'

.card
  padding: 24px
  box-shadow: $shadow
  background-color: $white
  border-radius: 6px
  height: 393px
  &__wrapper
    display: flex
    flex-direction: column
    align-items: flex-start
    height: 100%
    width: 100%
  &__title
    font-size: 32px
    line-height: 38px
    font-weight: 700
    margin-bottom: 15px
  &__subtitle
    font-size: 18px
    line-height: 24px
  ul
    margin-top: 24px
    margin-bottom: 8px
    width: 100%
    li
      display: flex
      justify-content: space-between
      align-items: center
      padding-top: 16px
      padding-bottom: 12px
      border-bottom: 1px solid $gray-medium
  &__time
    font-size: 16px
    line-height: 24px
    color: $text-light
    margin-left: auto
  &__buttons
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: auto
    width: 100%
    &-item:last-child
      margin-left: auto
    &-item
      display: flex
      align-items: center
      .btn + .btn
        margin-left: 31px
</style>
