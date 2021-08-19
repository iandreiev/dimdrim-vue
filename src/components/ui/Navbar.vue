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
                  <div v-click-outside="closeLangDrop"  class="header-actions--item" @click="openLang()">
                      <div class="flag" :class="`flag-${activeLang.icon}`"></div>
                  </div>
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
                <div class="lang-popup" :class="{'lang-popup-active':langVisible == true}">
                    <div class="lang-item" @click="changeLang(i)" v-for="(i,index) in langs" :key="index">
                        <div class="flag" :class="`flag-${i.icon}`"></div>
                        <div class="lang-">{{i.title}}</div>
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
            langVisible: false,
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

            ],
            langs:[
                {
                    title: 'Русский',
                    value: 'ru',
                    icon:'ru'
                },
                {
                    title: 'English',
                    value: 'en',
                    icon:'uk'
                },
                {
                    title: 'Українська',
                    value: 'ua',
                    icon:'ua'
                }
            ]
        }
    },
    methods:{
        openLang(){
            this.langVisible = true
        },
        closeLangDrop(){
            this.langVisible = false
        },
        changeLang(item){
            this.$store.commit('SET_LANG', item)
            this.$i18n.locale = item.value
            this.langVisible = false
        },
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
        ...mapState(["cartShow", "favsShow","auth", "activeLang"])
    },
    components:{
        Cart,
        Favs
    }
        
}
</script>

<style>

</style>