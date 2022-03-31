<template>
  <div class="card">
    <div class="card__wrapper">
        <p class="card__title">Moscow, RU</p>
        <p class="card__subtitle">Your current location</p>
        <ul>
        <li>
            <span class="card__option">Weather</span>
            <span class="card__value">Clouds</span>
        </li>
        <li>
            <span class="card__option">Temperature</span>
            <span class="card__value">7 °C</span>
        </li>
        <li>
            <span class="card__option">Humidity</span>
            <span class="card__value">45 %</span>
        </li>
        </ul>
        <p class="card__time">7 minutes ago</p>
        <div class="card__buttons">
            <div class="card__buttons-item">
                <button class="btn">REMOVE</button>
            </div>
            <div class="card__buttons-item">
                <button class="btn">RELOAD</button>
            </div>
        </div>
    </div>
    <!-- <div class="loader">
        <div class="loader-block">
            <div class="loader-icon">
                <svg width="50" height="50" viewBox="25 25 50 50">
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#9B51E0" stroke-width="3"></circle>
                </svg>
            </div>
        </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'card'
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstract/variables.scss";

.card {
  padding: 24px;
  box-shadow: $shadow;
  background-color: $white;
  border-radius: 6px;
  height: 393px;
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    width: 100%;
  }
  &__title {
      font-size: 32px;
      line-height: 38px;
      font-weight: 700;
      margin-bottom: 15px;
  }
  &__subtitle {
      font-size: 18px;
      line-height: 24px;
  }
  ul {
      margin-top: 24px;
      margin-bottom: 8px;
      width: 100%;
      li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid $gray-medium;
      }
  }
  &__time {
      font-size: 16px;
      line-height: 24px;
      color: $text-light;
      margin-left: auto;
  }
  &__buttons {
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
