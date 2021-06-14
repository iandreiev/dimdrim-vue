<template>
  <div id="user-orders">
      <h1>Сповіщення</h1>
      <state-empty v-if="notifications.length == 0" :icon="'icon-notif'" :title="'У вас нема сповіщень'"></state-empty>

      <notif-item v-else v-for="(i,index) in notifications" :key="index" :item="i" />
  </div>
</template>

<script>
import {mapState} from "vuex"
import notifItem from "../../components/ui/user/notif-item.vue"
import StateEmpty from '../../components/ui/state/state-empty.vue'

export default {
  components: { notifItem,StateEmpty },
computed:{
  ...mapState(["notifications", "user"])
},
methods:{
  getNotifications(){
    let params = {
      query_params: this.user.user.id,
      endpoint: '/notifs/get/user/',
      commit: 'SET_USER_NOTIFICATIONS',
      method:'get',
      headers:{
        Authorization: this.user.token
      }
    }

    this.$store.dispatch('newQuery', params)
  }
},
mounted(){
  this.getNotifications()
}
}
</script>

<style>

</style>