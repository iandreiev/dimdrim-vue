<template>
  <RegularPage :pageName="'paycheck'">
      {{status}}

        <div class="checkout-page">
            <div class="status-error" v-if="status.status == 'error'">
                <h2>{{status.err_description}}</h2>
                <button @click="stopInterval()">Stop Interval</button>
            </div>

            <div class="status-success" v-if="status.status == 'success'">
                <h2>{{status.status}}</h2>
            </div>
        </div>

      {{setProduct()}}
  </RegularPage>
</template>

<script>
import { mapState } from 'vuex'
import RegularPage from "../components/pages/regular"
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
        ...mapState(["cartdata"])
    },
    methods:{
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
                    is_registered: true
                }
            }

            this.$http(options)
            .then(res=>console.log(res.data))
        },
        setProduct(){
            if(this.status.status == 'success'){
                clearInterval(this.intervalGetPayData)
                this.saveOrder()
                console.log('stopped')
            }
        }
    },
    mounted(){
        this.getStatus()
    },
    components:{
        RegularPage
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