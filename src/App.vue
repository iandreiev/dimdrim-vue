<template>
  <div id="main">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GetLocation from "./store/getLocation"

export default {
  data(){
    return{
    }
  },
  computed:{
    ...mapState(["activeLang"])
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
    },
    initLanguages(){
      this.$i18n.locale = this.activeLang.value
      console.log(this.$i18n.locale)
    }
  },
  created(){
    this.getCats()
    this.getPartners()
    GetLocation.getLocationAPI()
    this.initLanguages()
  },
}
</script>

<style>

</style>