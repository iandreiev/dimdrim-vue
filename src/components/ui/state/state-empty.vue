<template>
  <div class="state">
      <div class="state-wrapper">
          <div class="icon" :class="icon"></div>
          <p class="text">{{title}}</p>
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        icon:String,
        title: String
    }
}
</script>

<style>

</style>