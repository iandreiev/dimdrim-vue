<template>
  <div id="catalogue">
      <Navbar />
        <SectionMain>
            <h1>Всі товари</h1>

            <div class="row">
                <div class="col-2">Filters</div>
                <div class="col-10">
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
            products:{}
        }
    },
   methods:{
        getProducts(){
      let options = {
        url: "shop",
        method: "get"
      }

      this.$http(options)
      .then(res=>this.products = res.data)
    }
   },
   mounted(){
    this.getProducts()
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