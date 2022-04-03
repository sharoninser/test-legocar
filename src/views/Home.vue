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
                      <CardCurrent />
                    </div>
                </div>
                <div class="home__other">
                    <transition name="fade" mode="out-in">
                      <div class="home__other-list" v-if="getListCities.length" key="other-list">
                        <transition-group name="fade">
                          <Card
                            v-for="cityItem in getListCities"
                            :key="cityItem.city"
                            :city="cityItem"
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
        </div>
        <Modal v-show="isModalVisible" @close="closeModal" :isOpen="isModalVisible"/>
    </div>
  </transition>
</template>

<script>
import Card from '@/components/Card'
import CardCurrent from '@/components/CardCurrent'
import Modal from '@/components/Modal'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      isModalVisible: false
    }
  },
  components: {
    Card,
    CardCurrent,
    Modal
  },
  methods: {
    ...mapMutations('weatherCities', ['removeCity']),
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
    ...mapGetters('weatherCities', ['getListCities'])
  }
}
</script>
