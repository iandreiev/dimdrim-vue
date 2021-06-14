import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import VueAxios from "vue-axios"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
Vue.use(VueAxios, axios);

const PORT = 5050
const mode = 'dev' // can be 'product'
const IP = "192.168.88.37"

let url = mode == 'dev' ? `http://${IP}:${PORT}/api` : ''

Vue.axios.defaults.baseURL = url
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');
let favs = window.localStorage.getItem('favs');
let cartCount = window.localStorage.getItem('cartCount');
let favsCount = window.localStorage.getItem('favsCount');

export default new Vuex.Store({
  state: {
    orders: [],
    categories:[],
    order_history:[],
    cartdata:'',
    partners:[],
    cartShow: false,
    favsShow:false,
    cart: cart ? JSON.parse(cart) : [],
    cartCount: cartCount ? parseInt(cartCount) : 0,
    favsCount: favsCount ? parseInt(favsCount) : 0,
    favs: favs ? JSON.parse(favs) : [],
    user:{},
    ip: {},
    auth: false,
    notifications: []
  },
  mutations: {
    LOGOUT:(state)=>{
      state.orders = [],
      state.categories = [],
      state.order_history = [],
      state.cartdata = '',
      state.partners = [],
      state.cartShow = false,
      state.favsShow = false,
      state.cart = cart ? JSON.parse(cart) : [],
      state.cartCount = cartCount ? parseInt(cartCount) : 0,
      state.favsCount = favsCount ? parseInt(favsCount) : 0,
      state.favs = favs ? JSON.parse(favs) : [],
      state.user = {},
      state.auth = false,
      state.notifications = []
    },
    SET_USER_NOTIFICATIONS:(state,notifications)=>{
      state.notifications = notifications
    },
    SET_ORDERS_HISTORY:(state,orders)=>{
      state.order_history = orders
    },
    SET_ORDERS:(state,orders)=>{
      state.orders = orders
    },
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
    SET_IP:(state,ip)=>{
      state.ip = ip
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
        found.totalPrice = found.qty * parseInt(found.price[0].price);
      } else {
        state.favs.push(item);
        Vue.set(item, 'qty', 1);
        Vue.set(item, 'totalPrice', parseInt(item.prices[0].price));
      }

      state.favsCount++;
    },
    addToCart(state, item) {
      let found = state.cart.find(product => product._id == item._id);

      if (found) {
        found.qty++;
        found.totalPrice = found.qty * parseInt(found.price[0].price);
      } else {
        state.cart.push(item);
        Vue.set(item, 'qty', 1);
        Vue.set(item, 'totalPrice', parseInt(item.prices[0].price));
      }

      state.cartCount++;

    },

    minusFromCart(state, item) {
      let found = state.cart.find(product => product._id == item._id);

      if (found) {
        found.qty--;
        found.totalPrice = found.qty * parseInt(found.price[0].price);
      } else {
        state.cart.push(item);
        Vue.set(item, 'qty', 1);
        Vue.set(item, 'totalPrice', parseInt(found.price[0].price));
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
    GET_IP:({commit})=>{
      let query = {
        url: 'https://ipinfo.io/?token=ae4719bcd65f8b',
        method:'get'
      }

      axios(query)
      .then(res=>commit('SET_IP',res.data))
    },
    GO_LOGOUT:({commit})=>{
      commit('LOGOUT')
    },
    newQuery:({commit}, params) => {
      let query = {
        url: params.query_params != '' ? url + params.endpoint + params.query_params : url + params.endpoint,
        method: params.method,
        headers: params.headers != {} ? params.headers : undefined,
        data: params.data != {} ? params.data : undefined
      }
      axios(query)
      .then(res=>{
        console.log(res)
        commit(params.commit, res.data)
      })
      .catch(err=>console.log(err))
    }

  },
  modules: {
  },
  plugins: [createPersistedState()]

})


/*
  newQuery Method:
      params: 
        query_params: string,
        endpoint: string,
        data: object,
        headers: object,
        commit: string

*/