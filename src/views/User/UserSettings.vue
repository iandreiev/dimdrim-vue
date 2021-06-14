<template>
  <div id="user-orders">
      <h1>Settings</h1>
      <div class="col-6">
        <h4>Налаштування профілю</h4>
      <!-- <Input v-model="login.email" placeholder="E-mail" :isLabel="true" :label="'E-mail'" :name="'email'" :type="'text'" /> -->

      {{user.user}}
      </div>


  </div>
</template>

<script>
import Input from "../../components/ui/inputs/input-text"
import ButtonRegular from "../../components/ui/buttons/button-regular"
import {mapState} from "vuex"

export default {
  name:"UserSettings.vue",
  data(){
    return{

    }
  },
  computed:{
    ...mapState(["user"])
  },
  methods:{
    getUser(){
      let options = {
        url:'users'
      }
    }
  },
  components:{
    Input,ButtonRegular
  }
}
</script>

<style>

</style>