<template>
    <div id="order">
        <Navbar />
            <main-section class="order-page">
                <div class="row order-cart">
                     
                     <div class="col-12">
                      <HeadingOptions :title="'Кошик'" />

                    <div class="order-wrapper">
                        <div class="order-item" v-for="(i,index) in cart" :key="index">
                            <div class="order-item-product">
                                                            <img class="image" :src="i.hero" :alt="i.title">
                            <div class="order-item-meta">
                                <h3 class="title">{{i.title}}</h3>
                                <div class="order-qty-controller">
                                          <div class="btn-mini btn-minus" @click="minusFromCart(i)">
                                        <unicon name="minus"/>
                                    </div>
                                <input type="text" @input="changeCartItem($event.target.value, i.qty, i)" :placeholder="i.qty">
                         
                                     <div class="btn-mini btn-plus" @click="plusToCart(i)">
                                        <unicon name="plus"/>
                                    </div>
                              
                                </div>
                            </div>
                            </div>

                            <div class="order-item-result">
                                <div class="btn-delete" @click="removeFromCart(i)">
                                    <unicon name="trash" />
                                    <p>Видалити</p>
                                </div>
                                <p class="qty">{{i.qty}} x {{i.prices[0].price}} грн.</p>
                                <p class="total">{{i.qty * i.prices[0].price}} грн.</p>
                            </div>
                        </div>
                    </div>

                    <h3>Всього до сплати:</h3>
                    <h1 class="text-success">{{totalPrice}} грн.</h1>
                     </div>
                </div>
                
                
                      <HeadingOptions :title="'Оформлення замовлення'" />

                <div class="row">
                    <div class="col-4 order-forms">
                        <h3>Контакти покупця</h3>
                        <Input v-model="form.name" :isLabel="true" :label="'Імя'" :placeholder="form.name" :name="'name'" :type="'text'"/>
                        <Input v-model="form.midname" :isLabel="true" :label="'Прізвище'" :placeholder="form.midname" :name="'midname'" :type="'text'"/>
                        <Input v-model="form.phone" :isLabel="true" :label="'Номер телефону'" :placeholder="form.phone" :name="'phone'" :type="'text'"/>
                        <Input v-model="form.email" :isLabel="true" :label="'E-Mail'" :placeholder="form.email" :name="'email'" :type="'text'"/>
                        <Input v-model="form.comment" :isLabel="true" :label="'Коментар до замовлення'" placeholder="Коментар до замовлення" :name="'comment'" :type="'text'"/>
                        <h3>Тип доставки</h3>
                        <div class="input-radio" v-for="i in delivery" :key="i.value">
                            <input type="radio" v-model="form.delivery_type" name="" id="" :value="i.value">
                            <label for="">{{i.name}}</label>
                        </div>

                         <h3>Тип оплати</h3>
                        <div class="input-radio" v-for="i in pay" :key="i.value">
                            <input type="radio" v-model="form.pay_type" name="" id="" :value="i.value">
                            <label for="">{{i.name}}</label>
                        </div>


                    </div>
                    <div class="col-4 order-forms" v-if="form.delivery_type == 'delivery'">
                        <h3>Доставка</h3>
                        <Input v-model="form.billing_city" :isLabel="true" :label="'Місто'" placeholder="Місто" :name="'billing_city'" :type="'text'"/>
                        <Input v-model="form.billing_address" :isLabel="true" :label="'Адреса'" placeholder="Адреса" :name="'billing_address'" :type="'text'"/>
                        
                    </div>
                    <div class="col-4 order-forms" v-if="auth == false">
                        <h3>Вже є клієнтом?</h3>
                        <Input v-model="login.email" :isLabel="true" :label="'E-Mail'" placeholder="E-Mail" :name="'login'" :type="'text'"/>
                        <Input v-model="login.password" :isLabel="true" :label="'Пароль'" placeholder="Пароль" :name="'password'" :type="'password'"/>
                        <ButtonRegular :btnClass="'btn-accent btn-block'">Авторизуватись</ButtonRegular>
                    </div>
                    <div class="col-4" v-if="auth == true">
                        <h2>Ви зайшли як</h2>
                        <h1>{{`${user.user.name} ${user.user.midname}`}}</h1>

                        <ButtonRegular :btnClass="'btn-accent btn-block'" @click="estimatePayInfo">Перейти до оплати</ButtonRegular>
                    </div>
                </div>


            </main-section>
        <Footer />
    </div>
</template>

<script>
import Navbar from '../components/ui/Navbar.vue'
import HeadingOptions from "../components/ui/headings/header-option"

import Footer from '../components/ui/Footer.vue'
import Input from "../components/ui/inputs/input-text"
import ButtonRegular from "../components/ui/buttons/button-regular"
import MainSection from '../components/ui/sections/main-section.vue'
import {mapState} from "vuex"
export default {
    data(){
        return{
             state_cart:{
                customer_id: '',
                products_id: ''
            },
            order:{
                cart_id:'',
                customer_id:'',
                value:'',
                is_registered:false,
                order_type:''
            },
            form:{
                name: '',
                midname: '',
                phone:'',
                email:'',
                city:'',
                comment:'',
                delivery_type:'delivery',
                pay_type: 'liqpay',
                billing_city: '',
                billing_address:''
            },
            cartdata:'',
            paydata: [],
            login:{
                email: '',
                password:''
            },
            delivery:[
                {
                    value:'delivery',
                    name: 'Доставка'
                },
                {
                    value:'warehouse',
                    name: 'Самовивіз'
                },
            ],
            pay:[
               {
                    value:'liqpay',
                    name: 'LiqPay'
                },
                {
                    value:'cashless',
                    name: 'Безготівковий розрахунок'
                }, 
            ]
        }
    },
  components: { Navbar, Footer, MainSection, Input, ButtonRegular,HeadingOptions },
  computed:{
      ...mapState(["cart", "auth", "user"]),
      totalPrice() {
      let total = 0;

      for (let item of this.$store.state.cart) {
        total += item.totalPrice;
      }

      return total;
    }
  },
  methods:{
      postCart(){
          
      },
      estimatePayInfo(){
          let options = {
              url: 'payment',
              method: 'post',
              data: {
                  amount: this.totalPrice,
                  currency: "UAH",
                  action: "pay",
                  description: "Оплата за товар"
              }
          }
          this.$http(options)
          .then(res=>{
             this.paydata = res.data 
          })
          .then(()=>{
              let options = {
                  url: 'cart',
                  method: 'post',
                  data:{
                      customer_id: this.user.user.id,
                      products_id: this.cart
                  }
              }

              this.$http(options)
              .then(res=>{                
              this.$store.commit('SAVE_CARTDATA', res.data)
              })
          })
          .then(()=>{
             window.open(`https://www.liqpay.ua/api/3/checkout/?data=${this.paydata[0].data}&signature=${this.paydata[0].signature}`)
          })
          .then(()=>{
              this.$router.push({name: 'PayStatus', params:{order_id: this.paydata[1].order_id}})
          })
      },
      useAutoComplete(){
          
          const auth = this.auth
          const user = this.user.user

            if(auth == true){
            this.form = {
              name: user.name,
              midname: user.midname,
              email: user.email,
              phone: user.phone,
              delivery_type: this.form.delivery_type,
              pay_type: this.form.pay_type,
              billing_city: user.billing_city,
              billing_address: user.billing_address
          }   

          console.log('Autocomplete done!')
            }
      },
        removeFromCart(item){
             this.$store.commit("removeFromCart", item);
        },
        minusFromCart(item){
             this.$store.commit("minusFromCart", item);
        },
        plusToCart(item){
            this.$store.commit('addToCart', item)
        },
        changeCartItem(qty,old, item){
            if(qty > old){
                this.$store.commit('addToCart', item)
                console.log(this.cart)
            }
            if(old > qty){
                this.$store.commit("minusFromCart", item);
            }
            if(qty == 0 || qty < 0 ){
                console.log('Value can not be null')
            }
        }
},
mounted(){
    this.useAutoComplete()
}
}
</script>
<style>

</style>