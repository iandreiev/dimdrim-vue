import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import functions from './store/functions'
import './assets/scss/common.scss'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import { uniShoppingCart, uniHeart, uniUserCircle,uniPen,uniPhone, uniWhatsapp, uniInstagram, uniFacebook,uniMapMarker,uniTimes, uniTrash,uniPlusCircle, uniMinusCircle,uniPlus, uniMinus,uniTruck, uniHistory,uniBell,uniSignout } from 'vue-unicons/dist/icons'
Unicon.add([uniShoppingCart, uniHeart, uniUserCircle,uniPen,uniPhone, uniWhatsapp, uniInstagram, uniFacebook,uniMapMarker,uniTimes,uniTrash,uniPlusCircle, uniMinusCircle,uniPlus, uniMinus,uniTruck, uniHistory,uniBell,uniSignout])
Vue.use(Unicon)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  // functions,
  store,
  render: h => h(App)
}).$mount('#app')
