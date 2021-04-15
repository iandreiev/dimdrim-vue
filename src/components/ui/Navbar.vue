<template>
  <header class="header">
          <div class="container">
              <div class="col-12 header-container">
              <div class="header-logo" @click="toHome"></div>
              <nav class="header-nav">
                  <ul>
                      <li v-for="(i,index) in items" :key="index">
                          {{i.name}}
                      </li>
                  </ul>
              </nav>
              <div class="header-actions">
                <div class="header-actions--item" @click="showCart">
                    <unicon name="shopping-cart" />
                </div>
                <div class="header-actions--item" @click="showFavs">
                    <unicon name="heart" />
                </div>
                <div class="header-actions--item" @click="toAuth">
                    <unicon name="user-circle" />
                </div>
              </div>
            </div>
          </div>
          <template>
              <cart />
          </template>
          <template>
              <favs />
          </template>
      </header>
</template>

<script>
import { mapState } from 'vuex'
import Cart from "../cart.vue"
import Favs from '../favs.vue'

export default {
    data(){
        return{
            items:[
                {
                    name: "Контакти"
                },
                 {
                    name: "Про нас"
                },
                 {
                    name: "Програма лояльності"
                },
                 {
                    name: "Доставка і оплата"
                },

            ]
        }
    },
    methods:{
        toHome(){
            this.$router.push({name:'Home'})
        },
        showCart(){
            this.$store.commit('SHOW_CART', true)
        },
        showFavs(){
            this.$store.commit('SHOW_FAVS', true)
        },
        toAuth(){
            this.$router.push({name:'Auth'})
        }
    },
    computed:{
        ...mapState(["cartShow", "favsShow"])
    },
    components:{
        Cart,
        Favs
    }
        
}
</script>

<style>

</style>