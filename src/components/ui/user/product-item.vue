<template>
  <div class="list-item list-item-product">
      <div class="product-image" :style="{'backgroundImage':`url(${item.images[0] || item.hero})`}"></div>
      <div class="product-meta">
          <p class="title">{{item.title}}</p>
          <p class="meta text-muted">Кількість: {{item.qty}}</p>
          <p class="meta text-muted">Ціна: {{ `${computePrice.price} ${computePrice.currency}` }}</p>
      </div>
      <div class="box"></div>
      <h3>{{`${item.totalPrice} ${computePrice.currency}`}}</h3>
  </div>
</template>

<script>
export default {
    props:{
        item:{
            type:Object
        }
    },
    computed:{
        computePrice(){
            let DEFAULT_CURRENCY = "UAH" // HARDCODE THIS

            let prices = this.item.prices 

           return prices.find(item=>{
                if(item.currency == DEFAULT_CURRENCY ) return item
                else{
                    return `None`
                }
            })
        }
    },
    methods:{
        
    }
}
</script>

<style>

</style>