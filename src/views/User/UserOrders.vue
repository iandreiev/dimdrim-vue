<template>
  <div id="user-orders">
      <h1>Активні замовлення</h1>
      <state-empty v-if="orders.length == 0" :icon="'icon-truck'" :title="'У вас нема активних замовлень'">
        <button-regular @click="passProducts()" :btnClass="'btn-accent'">Перейти до товарів</button-regular>
      </state-empty>

      <order-item v-else @click="passOrderDetails(i, i._id)" v-for="(i,index) in orders" :key="index" :isLabel="true" :item="i" />
  </div>
</template>

<script>
import orderItem from '../../components/ui/user/order-item.vue'
import orders from "../../store/orders"
import {mapState} from "vuex"
import ButtonRegular from '../../components/ui/buttons/button-regular.vue'
import StateEmpty from '../../components/ui/state/state-empty.vue'

export default {
  components: { orderItem, ButtonRegular,StateEmpty },
  data(){
    return{
    }
  },
  computed:{
    ...mapState(["orders", "user"])
  },
  methods:{
    passProducts(){
      this.$router.push({name: 'Catalogue'})
    },
    passOrderDetails(item, id){
      this.$router.push({name: 'UserOrderDetails', params:{order_id: id, data: item}})
    },
    getOrders(){
                      let getOrders = {
                    query_params: this.user.user.id,
                    endpoint: '/order/user/',
                    method:'get',
                    headers: {},
                    data: {},
                    commit: 'SET_ORDERS'   
                }

                this.$store.dispatch('newQuery', getOrders)
    }
  },
  created(){
    this.getOrders()
  }
}
</script>

<style>

</style>