<template>
  <div class="row-scroll" :class="`col-${settings.col}`">
      <div class="hs full" :class="{'no-scrollbar':settings.scrollbar == false}">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ScrollHorizontal',
    props:{
        settings:{
            type:Object
        }
    }
}
</script>

<style>

</style>