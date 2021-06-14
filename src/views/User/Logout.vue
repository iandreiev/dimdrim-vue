<template>
  <div id="user-orders">
      <h1>Logout</h1>
      <button-regular @click="logoff()" :btnClass="'btn-accent'">Вийти</button-regular>
  </div>
</template>

<script>
import buttonRegular from '../../components/ui/buttons/button-regular.vue'
export default {
  components: { buttonRegular },
  methods:{
    logoff(){
      this.$store.dispatch('GO_LOGOUT')
      this.$router.push({name:'Home'}).catch(()=>{})

    }
  }
}
</script>

<style>

</style>