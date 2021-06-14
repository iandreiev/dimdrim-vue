<template>
  <div v-click-outside="closeCart" class="cart-popup cart-popup-cart" :class="{'cart-popup-active':cartShow==true}" v-if="cartShow == true">
      <div class="cart-header">
          <h3>Кошик</h3>
          <div class="cart-close" @click="closeCart()">
              <unicon name="times" />
              </div> 
      </div>
      <div class="cart-empty" v-show="!cart.length">
          <div class="empty-state">
              <unicon name="shopping-cart" width="50" height="50" />
          </div>
          <h3>Кошик пустий</h3>
      </div>
      <div class="cart-items" v-show="cart.length > 0">
          <div class="cart-item" v-for="(i,index) in cart" :key="index">
              <img width="80" :src="i.hero" :alt="i.title">
              <div class="cart-item-meta">
                  <div class="title">{{i.title}}</div>
                  <div class="price-wrapper">
                      <div class="price">
                          {{i.totalPrice}} грн.
                      </div>
                  </div>
              </div>
              <div class="cart-remove" @click="removeFromCart(i)">
                  <unicon name="trash" />
              </div>
          </div>
      </div>
      <div class="cart-checkout" v-show="cart.length > 0">
          <button-regular @click="toOrder" :btnClass="'btn-success btn-block'" >Оформити замовлення</button-regular>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import buttonRegular from './ui/buttons/button-regular.vue'
export default {
  components: { buttonRegular },
    data(){
        return{

        }
    },
    computed:{
        ...mapState(["cart", "cartShow"])
    },
    methods:{
        closeCart(){
            this.$store.commit('SHOW_CART', false)
        },
                removeFromCart(item){
             this.$store.commit("removeFromCart", item);
        },
        toOrder(){
            this.$store.commit('SHOW_CART', false)
            this.$router.push({name: 'CreateOrder'})
        }
    }
}
</script>

<style>

</style>