<template>
  <div id="product">
       <Navbar />
      <SectionMain>
      <div class="row product-page">
          <div class="col-6 product-gallery">
              <img :src="product.hero" alt="">
              <h2 class="hero-title">Опис</h2>
              <p class="hero-description">
                  {{product.description}}
              </p>
          </div>
          <div class="col-6 product-meta">
              <div class="product-item">
                  <h1 class="product-item--title">{{product.title}}</h1>
                  <div class="product-item--vendor">
                      <p>Артикул</p>
                      <h3>{{product.vendor != null ? product.vendor : 'Відсутній'}}</h3>
                  </div>
              </div>
              <div class="product-item product-item--prices">
                 <div class="price-row">
                      <h2>{{product.price}}</h2>
                  <p>грн. / 1 {{currentSize(product.sizes[0])}}</p>
                 </div>
              </div>
              <div class="product-item product-item--quantity">
                  <Input v-model="buy.quantity" :type="'text'" placeholder="Введіть кількість" :name="'quantity'" :id="'quantity'"/>
                <ButtonRegular :btnClass="'btn-success'">Придбати</ButtonRegular>
              </div>
              <div class="col product-item-col">
                  <h2 class="describe-title">Характеристики</h2>
                  <div class="describe-wrapper">
                      <div class="describe-item" v-for="(i,index) in product.attrs" :key="index">
                          <p class="describe-item--name">
                              {{i.name}}
                          </p>
                          <p class="describe-item--key">
                              {{i.key}}
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </SectionMain>
       <Footer />
  </div>
</template>

<script>
import Navbar from "../components/ui/Navbar"
import Footer from "../components/ui/Footer"
import HeadingOptions from "../components/ui/headings/header-option"
import Input from "../components/ui/inputs/input-text"
import ButtonRegular from "../components/ui/buttons/button-regular"
import SectionHeading from "../components/ui/sections/heading-section"
import SectionMain from "../components/ui/sections/main-section"
import ProductCard from "../components/ui/cards/product-card"
import SectionScrollHorizontal from "../components/ui/slider/slider-horizontal"

export default {
    data(){
        return{
            product:'',
            sizes: '',
            buy:{
                quantity:''
            }
        }
    },
    methods:{
        loadProduct(){
            let options = {
                url: `shop/${this.$route.params.id}`,
                method:"get"
            }

            this.$http(options)
            .then(res=>this.product = res.data)
        },
        loadSizes(){
            let options = {
                url: 'sizes',
                method: 'get'
            }

            this.$http(options)
            .then(res=>this.sizes = res.data)
        },
        currentSize(val){
        let sizes = this.sizes

             const res = sizes.find(i=>{
                if(i.type == val){
                   return i
                }
            })

            return res.name
    },
    },
    mounted(){
        this.loadProduct()
        this.loadSizes()
    },
    components:{
    Navbar,
    Footer,
    HeadingOptions,
    Input,
    ButtonRegular,
    SectionHeading,
    SectionMain,
    ProductCard,
    SectionScrollHorizontal
  }
}
</script>

<style>

</style>