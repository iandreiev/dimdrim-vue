<template>
  <div class="card" :class="`card-${cardType}`" :style="(data.type == 'product') ? ` background-color:${data.background}` : ''">
      <div class="card-image"  :style="`background-image: url(${data.image}); background-color:${data.background}`"></div>
        <div class="card-category title" v-show="data.type == 'product'">{{data.title}}</div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props:{
        data: Object,
        cardType: String
    }
}
</script>

<style>

</style>