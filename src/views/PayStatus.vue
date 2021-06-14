<template>
  <RegularPage :pageName="'paycheck'">
      <!-- {{status}} -->

        <div class="checkout-page">

            <div class="status" v-if="status.status == 'error'">
                <div class="icon icon-await"></div>
                <h2 class="status-title">Очікуємо на оплату</h2>
            </div>

                        <div class="status" v-if="status.status == 'p24_verify'">
                <div class="icon icon-await"></div>
                <h2 class="status-title">Очікуємо на оплату</h2>
            </div>


            <div class="status" v-if="status.status == 'success'">
                <div class="icon icon-success"></div>
                <h2 class="status-title">Замовлення №{{status.order_id}} успішно оформлено.</h2>
                <div class="btn-row">
                     <button-regular @click="toRouter({name: 'Home'})" :btnClass="'btn-accent'">Повернутись на головну</button-regular>
                <button-regular @click="toRouter({name: 'UserOrders'})" :btnClass="'btn-accent'">В замовлення</button-regular>
                </div>
            </div>
        </div>

      {{setProduct()}}
  </RegularPage>
</template>

<script>
import { mapState } from 'vuex'
import RegularPage from "../components/pages/regular"
import ButtonRegular from "../components/ui/buttons/button-regular.vue"
export default {
    data(){
        return{
            order_id: this.$route.params.order_id,
            status:'',
            intervalGetPayData: setInterval(()=>{
                this.getStatus()
            },5000)
        }
    },
    computed:{
        ...mapState(["cartdata", "user"])
    },
    methods:{
        toRouter(params){
            this.$router.push(params)
        },
        stopInterval(){
            clearInterval(this.intervalGetPayData)
            console.log('stop interval')
        },
        getStatus(){
            let options = {
                url: 'payment/check',
                method:'post',
                data:{
                    order_id: this.$route.params.order_id
                }
            }

            this.$http(options)
            .then(res=>this.status = res.data)
        },
        saveOrder(){
            let options = {
                url: 'order',
                method: 'post',
                data:{
                    cart_id: this.cartdata._id,
                    customer_id: this.cartdata.customer_id,
                    order_type: 'paid',
                    value: this.status.amount,
                    is_registered: true,
                    created_at: new Date().getTime()
                }
            }

            this.$http(options)
            .then(res=>console.log(res.data))
        },
        setProduct(){
            if(this.status.status == 'success'){
                clearInterval(this.intervalGetPayData)
                this.saveOrder()
                this.$store.commit('emptyCart')
}
        }
    },
    mounted(){
        this.getStatus()
    },
    components:{
        RegularPage, ButtonRegular
    }
}

//   if(this.status == '' || this.status.status == 'error'){
//                 nterval
//                 console.log('Interval working')
//             }
//             else if(this.status.status == 'success'){
//                 console.log(this.status.status)
//                 clearInterval(nterval)
//                 console.log('interval stopped')
//             }
</script>

<style>

</style>