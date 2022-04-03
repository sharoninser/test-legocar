// const API = process.env.VUE_APP_API
// const KEY = process.env.VUE_APP_KEY

// const instanceCurrent = (lat, lon) => {
//   console.log(lat)
//   return API + '&lat=' + lat + '&lon=' + lon + KEY
// }

// const geolocation1 = (lat, lon) => {
//   navigator.geolocation.getCurrentPosition(buildUrl)
//   return lat
// }
const geoData = {
  lat: '',
  lon: ''
}
const geolocation = () => {
  navigator.geolocation.getCurrentPosition(buildUrl)
}
const buildUrl = (position) => {
  geoData.lat = position.coords.latitude
  geoData.lon = position.coords.longitude
}

export default geolocation
// const geoError = () => {
//   this.getLocationWeather(API + '&lat=0&lon=0' + KEY)
// }

// export class CurrentLocation {
//   constructor () {
//     this.geoDataLat = ''
//     this.geoDataLon = ''
//     this.geo = ''
//   }

//   instanceCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition(this.buildUrl)
//   }

//   buildUrl = (position) => {
//     this.geoDataLat = position.coords.latitude
//     this.geoDataLon = position.coords.longitude
//   }
// }

// const instanceCurrentLocation1 = () => {
//   const lat = position.coords.latitude
//   const lon = position.coords.longitude
//   console.log('&lat=' + lat + '&lon=' + lon)
//   return ('&lat=' + lat + '&lon=' + lon)
//   // return navigator.geolocation.getCurrentPosition(buildUrl, geoError)
//   // return buildUrl
// }
// let curUrl = ''

// const instanceCurrentLocation = () => {
//   navigator.geolocation.getCurrentPosition(buildUrl)
// }

// const buildUrl = (position) => {
//   instanceCurrentLocation()
//   const lat = position.coords.latitude
//   const lon = position.coords.longitude

//   curUrl = API + KEY + lat + lon
//   // this.getLocationWeather(API + '&lat=' + lat + '&lon=' + lon + KEY)
// }

// // const geoError = () => {
// //   return '&lat=0&lon=0'

// export { curUrl }

// geolocation () {
//   navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError)
// },
// buildUrl (position) {
//   const lat = position.coords.latitude
//   const lon = position.coords.longitude

//   this.getLocationWeather(API + '&lat=' + lat + '&lon=' + lon + KEY)
// },
// geoError () {
//   this.getLocationWeather(API + '&lat=0&lon=0' + KEY)
// },
