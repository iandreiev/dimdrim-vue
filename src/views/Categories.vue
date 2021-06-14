<template>
  <div id="catalogue">
      <Navbar />
        <SectionMain>
            <h1>Категорії</h1>
            <button @click="popupActive = !popupActive">Toggle Popup</button>
            <div class="popup category-popup" :class="{'popup-active':popupActive == true}">
                <div class="category-item" v-for="(i,index) in categories" :key="index" @click="chooseCategory(i)">
                    <p :class="{'category-item--parent':i.ifParent == true}">{{i.title}}</p>
                </div>

            </div>

            

            <div class="row" v-show="products.length > 0">
                <div class="col-12">
                    <div class="product-row">
                        <ProductCard v-for="(i,index) in products" :key="index" :product="i" />

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
import ImageCard from "../components/ui/cards/image-card"
import SectionScrollHorizontal from "../components/ui/slider/slider-horizontal"
import { mapState } from 'vuex'
import CategoryCard from '../components/ui/cards/category-card.vue'
export default {
    data(){
        return{
            products:[],
            categories:'',
            chosenCategory:{},
            popupActive:false
        }
    },
   methods:{
       chooseCategory(item){
           this.chosenCategory = item
       },
        getProducts(category){
      let options = {
        url: "shop/category/alias/"+category,
        method: "get"
      }

      this.$http(options)
      .then(res=>this.products = res.data)
    },
    getCategory(){

        let options = {
            url: 'cats',
            method:'get'
        }
        this.$http(options)
        .then(res=>this.categories = res.data)
    }
   },
   mounted(){
    // this.getProducts()
    this.getCategory()
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
    SectionScrollHorizontal,
    ImageCard,
    CategoryCard
  }
}
</script>

<style>

</style>