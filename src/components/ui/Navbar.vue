<template>
  <header class="header">
          <div class="container">
              <div class="col-12 header-container">
                  <div class="nav-trigger">
              <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
            <ul class="nav-menu">
               <li v-for="(i,index) in items" :key="index">
                          {{i.name}}
                      </li>
            </ul>
           </div>
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
                <div class="header-actions--item" @click="handleUser">
                    <unicon name="user-circle" />
                </div>
              </div>
            </div>
          </div>
              <cart />

              <favs />
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
        handleUser(){
            
            this.auth  == true ? this.$router.push({name:'Profile'}) : this.$router.push({name:'Auth'})
        },
        toDash(){
            this.$router.push({name:'Profile'})
        },
        toAuth(){
            this.$router.push({name:'Auth'})
        }
    },
    computed:{
        ...mapState(["cartShow", "favsShow","auth"])
    },
    components:{
        Cart,
        Favs
    }
        
}
</script>

<style>

</style>