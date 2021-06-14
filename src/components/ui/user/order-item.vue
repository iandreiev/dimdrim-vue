<template>
  <div class="list-item" :class="{'list-item-product': isProduct == true}" @click="callback($event)">
      <div class="product-meta" v-if="isProduct == false"> 
          <p class="title">Замовлення №{{item._id}}</p>
          <!-- <p class="meta text-muted">Кількість: {{item.cart_id.products_id[0].qty}} шт.</p> -->
          <!-- <p class="meta text-muted">Ціна: {{`${item.cart_id.products_id[0].prices[0].price} ${item.cart_id.products_id[0].prices[0].currency}`}}</p> -->
          <p class="meta text-muted">Доставка: </p>
      </div>
      <div class="label" v-if="isLabel == true" :class="deliveryType">
          {{item.order_type}}
      </div>
      <div class="box" v-else></div>
      <h3 v-if="isProduct == false" class="total">{{`${item.value} ${item.cart_id.products_id[0].prices[0].currency}`}}</h3>
  </div>
</template>

<script>
export default {
    props:{
        item:Object,
        isLabel: Boolean,
        isProduct: {
            type:Boolean,
            default: false
        }
    },
    computed:{
        deliveryType(){
            let type = this.item.order_type

            return type == 'active' ? 'label-info' 
                 : type == 'ready'  ? 'label-success'
                 : type == 'success'? 'label-success'
                 : type == 'paid'? 'label-success'
                 : type == 'return' ? 'label-danger'
                 : 'label-info'
        }
    },
    methods:{
        callback(event){
            this.$emit('click',event)
        },
    }
}
</script>

<style>

</style>