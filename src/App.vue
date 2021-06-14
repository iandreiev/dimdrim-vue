<template>
  <div id="main">
    <router-view />
  </div>
</template>

<script>
import GetLocation from "./store/getLocation"

export default {
  data(){
    return{
    }
  },
  methods:{
    getCats(){
       let options = {
        url: "cats",
        method: "get"
      }

      this.$http(options)
      .then(res=>this.$store.commit('SET_CATS', res.data))
    },
    getPartners(){
       let options = {
        url: "cats/partners",
        method: "get"
      }

      this.$http(options)
      .then(res=>this.$store.commit('SET_PARTNERS', res.data))
    }
  },
  created(){
    this.getCats()
    this.getPartners()
    GetLocation.getLocationAPI()
  },
}
</script>

<style>

</style>