<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal__backdrop"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <p class="modal__title">Choose a city</p>
          <p class="modal__subtitle">
            To find city start typing and pick one from the suggestions
          </p>
        </div>
        <div class="modal__body">
          <div class="wrapper-input"
            :class="{invalid: (v$.inputValue.$dirty && v$.inputValue.$silentErrors.length)}"
          >
            <input
              type="text"
              v-model.trim="inputValue"
              @input="v$.inputValue.$touch()"
              placeholder="Search city"
            />
            <span
              class="error-text"
              v-if="v$.inputValue.$dirty && v$.inputValue.$silentErrors.length"
            >
              {{v$.inputValue.$silentErrors[0].$message}}
            </span>
          </div>
        </div>
        <div class="modal__footer">
          <div class="modal__footer-item">
            <button class="btn"
              :class="!this.inputValue ? 'disabled' : ''"
              @click="clearInput"
            >
              CLEAR
            </button>
          </div>
          <div class="modal__footer-item">
            <button class="btn" @click="close">CANCEL</button>
            <button class="btn"
              :class="this.v$.inputValue.$invalid ? 'disabled' : ''"
              @click="addCity"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { helpers, required, minLength } from '@vuelidate/validators'
import { lang } from '@/local/validate'
import { mapActions } from 'vuex'

export default {
  name: 'modal',
  data () {
    return {
      v$: useVuelidate(),
      inputValue: '',
      clearActive: false,
      addActive: false
    }
  },
  validations () {
    return {
      inputValue: {
        lang: helpers.withMessage('Invalid input format', lang),
        required: required,
        minLength: minLength(3)
      }
    }
  },
  props: {
    isOpen: {
      type: Boolean
    }
  },
  methods: {
    ...mapActions('weather', ['cityWeather']),
    close () {
      this.v$.$reset()
      this.inputValue = ''
      this.$emit('close')
    },
    async addCity () {
      await this.cityWeather({
        url: '&q=' + this.inputValue
      })
      this.close()
    },
    clearInput () {
      this.v$.$reset()
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstract/variables.scss";

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: all 0.5s ease;
  padding: 0 15px;
  &__backdrop {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $modal-backdrop;
  }
  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    box-shadow: $modal-shadow;
    background-color: $white;
    border-radius: 4px;
    height: 397px;
    width: 100%;
    max-width: 751px;
  }
  &__title {
    font-size: 32px;
    line-height: 38px;
    font-weight: 700;
    margin-bottom: 15px;
  }
  &__subtitle {
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 67px;
    color: $text-medium;
    @media screen and (max-width: 768px) {
      font-size: 18px;
    }
  }
  &__body, &__header {
    width: 100%;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    width: 100%;
    &-item:last-child {
      margin-left: auto;
    }
    &-item {
      display: flex;
      align-items: center;
      .btn + .btn {
        margin-left: 31px;
      }
    }
  }
}

</style>
