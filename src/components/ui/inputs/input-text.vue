<template>
  <div class="form-controller">
    <label class="dark" :for="name" v-show="isLabel == true">{{label}}</label>
    <input :type="type" :placeholder="placeholder" :id="id" :name="name" v-on:input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
    props: ["type", "placeholder", "label", "id", "name", "isLabel"]
}   
</script>

<style>

</style>