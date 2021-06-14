<template>
  <div id="order-details">    
        <h2>Замовлення №{{data._id}}</h2>
        <product-item v-for="(i,index) in data.cart_id.products_id" :key="index" :item="i" />
  </div>
</template>

<script>
import OrderItem from '../../components/ui/user/order-item.vue'
import ProductItem from '../../components/ui/user/product-item.vue'
export default {
    props:{
        data:Object,
    },
    components:{
        OrderItem,
        ProductItem
    }
}
</script>

<style>

</style>