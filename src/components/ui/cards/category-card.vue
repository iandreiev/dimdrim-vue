<template>
  <div class="category-card">
      <div class="category-card-image">
          <div class="image" :style="`background-image: url(${data.image}); background-color:${data.background}`"></div>
      </div>
      <div class="category-card-meta">
          <h3>{{data.title}}</h3>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        data:Object
    }
}
</script>

<style>

</style>