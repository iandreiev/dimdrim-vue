<template>
  <button class="btn-float" :class="btnClass" @click="callback($event)">
    <div class="btn-float icon">
        
    </div>
  </button>
</template>

<script>
export default {
    props: ["btnClass", "action", "icon"],
    methods:{
        callback(e){
            this.$emit('click',e)
        }
    }
}
</script>

<style>

</style>