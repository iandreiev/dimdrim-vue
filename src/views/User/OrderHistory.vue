<template>
  <div id="user-orders">
      <h1>Історія замовлень</h1>
      <state-empty v-if="order_history.length == 0" :icon="'icon-cart'" :title="'Тут живуть замовлення, які приїхали до вас.'"></state-empty>
      <order-item v-else @click="passOrderDetails(i, i._id)" v-for="(i,index) in order_history"  :key="index" :item="i" :isLabel="true" />
  </div>
</template>

<script>
import OrderItem from '../../components/ui/user/order-item.vue'
import StateEmpty from '../../components/ui/state/state-empty.vue'

import {mapState} from "vuex"

export default {
  components:{
    OrderItem,StateEmpty
  },
  data(){
    return{

    }
  },
  computed:{
    ...mapState(["user", "order_history"])
  },
  methods:{
        passOrderDetails(item, id){
      this.$router.push({name: 'UserOrderDetails', params:{order_id: id, data: item}})
    },
    getHistory(){
      let params = {
        endpoint: '/order/history/user/',
        query_params: this.user.user.id,
        method: 'get',
        headers:{
          Authorization: this.user.token
        },
        commit: 'SET_ORDERS_HISTORY'
      }
      this.$store.dispatch('newQuery',params)
    }
  },
  mounted(){
    this.getHistory()
  }
}
</script>

<style>

</style>