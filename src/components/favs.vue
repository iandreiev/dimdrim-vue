<template>
  <div class="cart-popup cart-popup-favs" :class="{'cart-popup-active':favsShow==true}" v-if="favsShow == true">
      <div class="cart-header">
          <h3>Улюблені</h3>
          <div class="cart-close" @click="closeFavs()">
              <unicon name="times" />
              </div> 
      </div>
      <div class="cart-empty" v-show="!favs.length">
          <div class="empty-state">
              <unicon name="heart" width="50" height="50" />
          </div>
          <h3>Улюблені товари відсутні</h3>
      </div>
      <div class="cart-items">
          {{favs}}
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
        closeFavs(){
            this.$store.commit('SHOW_FAVS', false)
        },
    }
}
</script>

<style>

</style>