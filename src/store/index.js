import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import VueAxios from "vue-axios"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
Vue.use(VueAxios, axios);

const PORT = 5000
const mode = 'dev' // can be 'product'

let url = mode == 'dev' ? `http://localhost:${PORT}/api` : ''

Vue.axios.defaults.baseURL = url
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');
let favs = window.localStorage.getItem('favs');
let cartCount = window.localStorage.getItem('cartCount');
let favsCount = window.localStorage.getItem('favsCount');

export default new Vuex.Store({
  state: {
    categories:[],
    cartdata:'',
    partners:[],
    cartShow: false,
    favsShow:false,
    cart: cart ? JSON.parse(cart) : [],
    cartCount: cartCount ? parseInt(cartCount) : 0,
    favsCount: favsCount ? parseInt(favsCount) : 0,
    favs: favs ? JSON.parse(favs) : [],
    user:{},
    auth: false
  },
  mutations: {
    SAVE_CARTDATA:(state,cartdata)=>{
      state.cartdata = cartdata
    },
    SAVE_USER(state, user) {
      state.user = user
      state.auth = true
    },
    SET_CATS:(state,categories)=>{
      state.categories = categories
    },
    SET_PARTNERS:(state,partners)=>{
      state.partners = partners
    },
    SHOW_CART:(state,cartShow)=>{
      state.cartShow = cartShow
    },
    SHOW_FAVS:(state,favsShow)=>{
      state.favsShow = favsShow
    },
    saveCart(state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
      window.localStorage.setItem('cartCount', state.cartCount);
    },
    SAVE_USER(state, user) {
      state.user = user
      state.auth = true
    },
    emptyCart(state) {
      state.cart = []
      state.cartCount = 0
    },
    emptyFavs(state){
      state.favs = []
      state.favsCount = 0

    },
    addToFavs(state,item){
      let found = state.cart.find(product => product._id == item._id);

      if (found) {
        found.qty++;
        found.totalPrice = found.qty * found.price;
      } else {
        state.favs.push(item);
        Vue.set(item, 'qty', 1);
        Vue.set(item, 'totalPrice', item.price);
      }

      state.favsCount++;
    },
    addToCart(state, item) {
      let found = state.cart.find(product => product._id == item._id);

      if (found) {
        found.qty++;
        found.totalPrice = found.qty * found.price;
      } else {
        state.cart.push(item);
        Vue.set(item, 'qty', 1);
        Vue.set(item, 'totalPrice', item.price);
      }

      state.cartCount++;

    },

    minusFromCart(state, item) {
      let found = state.cart.find(product => product._id == item._id);

      if (found) {
        found.qty--;
        found.totalPrice = found.qty * found.price;
      } else {
        state.cart.push(item);
        Vue.set(item, 'qty', 1);
        Vue.set(item, 'totalPrice', item.price);
      }

      state.cartCount--;

    },
    removeFromFavs(state, item) {
      let index = state.cart.indexOf(item);

      if (index > -1) {
        let product = state.favs[index];
        state.favsCount -= product.qty;

        state.cart.splice(index, 1);
        this.$store.commit('saveFavs');

      }

      // this.$store.commit('saveCart');

    },
    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);

      if (index > -1) {
        let product = state.cart[index];
        state.cartCount -= product.qty;

        state.cart.splice(index, 1);
        this.$store.commit('saveCart');

      }

      // this.$store.commit('saveCart');

    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]

})
