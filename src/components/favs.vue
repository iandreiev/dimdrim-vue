<template>
  <div v-click-outside="closeFavs"  class="cart-popup cart-popup-favs" :class="{'cart-popup-active':favsShow==true}" v-if="favsShow == true">
      <div class="cart-header">
          <h3>{{$t('favs.title')}}</h3>
          <div class="cart-close" @click="closeFavs()">
              <unicon name="times" />
              </div> 
      </div>
      <div class="cart-empty" v-show="!favs.length">
          <div class="empty-state">
              <unicon name="heart" width="50" height="50" />
          </div>
          <h3>{{$t('favs.empty')}}</h3>
      </div>
      <div class="cart-items" v-show="favs.length > 0">
          <div class="cart-item" v-for="(i,index) in favs" :key="index">
              <img width="80" :src="i.hero" :alt="i.title">
            <div class="col cart-item-meta-wrapper">
                              <div class="cart-item-meta">
                  <div class="title">{{i.title}}</div>
                  <div class="price-wrapper">
                      <div class="price">
                          {{i.prices[0].price}} {{i.prices[0].currency}}
                      </div>
                  </div>
              </div>
                <div class="cart-actions">
                     <div class="cart-add">
                 <unicon name="shopping-cart" />
                 <p>{{$t('favs.addToCart')}}</p>
             </div>
              <div class="cart-remove" @click="removeFromFavs(i)">
                  <unicon name="trash" />
              </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapState(["favs", "favsShow"])
    },
    methods:{
        removeFromFavs(item){

        },
        closeFavs(){
            this.$store.commit('SHOW_FAVS', false)
        },
    }
}
</script>

<style>

</style>