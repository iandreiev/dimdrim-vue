<template>
  <div class="heading-row">
      <h1>{{title}}</h1>
      <router-link class="router-link" v-show="link != 0" :to="{name: link}">{{linkTitle}}</router-link>
  </div>
</template>

<script>
export default {
    props:["title", "link", "linkTitle"]
}
</script>

<style>

</style>