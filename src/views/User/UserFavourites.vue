<template>
  <div id="user-orders">
      <h1>Улюблені товари</h1>
      <state-empty v-if="favs.length == 0" :icon="'icon-heart'" :title="'Ми не знайшли ваших улюблених товарів'"></state-empty>
      <div v-else class="products-favs-wrapper">
      <product-card v-for="(i,index) in favs" :key="index" :product="i"/>

      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../../components/ui/cards/product-card.vue'
import StateEmpty from '../../components/ui/state/state-empty.vue'
export default {
  components:{
    ProductCard,
    StateEmpty

  },
  computed:{
    ...mapState(["cart","favs"])
  }
}
</script>

<style lang="scss">
  .products{
    &-favs{
      &-wrapper{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-template-rows: repeat(2,1fr);
      }
    }
  }
</style>