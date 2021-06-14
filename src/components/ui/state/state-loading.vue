<template>
  <div class="state state-wrapper state-loading">
    <div class="icon icon-await"></div>
    <h2 class="text">{{text}}</h2>
  </div>
</template>

<script>
export default {
    props:{
        text:String
    }
}
</script>

<style>

</style>