<template>
  <div class="category-card" :style="{'background-color':data.background}">
      <div class="category-card-image">
          <div class="image" :style="`background-image: url(${data.image}); background-color:${data.background}`"></div>
      </div>
      <div class="category-card-meta">
          <h3>{{data.title}}</h3>
          <button class="btn-float default" @click="toCategory()">
              <unicon name="arrow-right" />
          </button>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        data:Object
    },
    methods:{
        toCategory(){
            this.$router.push({name: 'ProductsCategory', params:{category: this.data.alias}}).catch(()=>{})
        }
    }
}
</script>

<style>

</style>