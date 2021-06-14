<template>
  <div id="catalogue">
      <Navbar />
        <SectionMain>
            <h1>Всі товари за категорією: {{category.title}}</h1>

             <div class="row" v-if="products.length == 0">
                <h1>Нажаль, не знайшлось товарів у цій категорії</h1>
            </div>

            <div class="row" v-show="products.length > 0">
                        <div class="col-2">
                    <h3>Фільтри</h3>
                    <div class="filter-item">
                    <h4>Категорії</h4>
                    <div class="controller" v-for="(i,index) in categories" :key="index">
                        <input class="form-checkbox" type="checkbox" :value="i.alias" v-model="chosenCats" :name="`cb_${i.alias}`" :id="`cb_${i.alias}`">
                        <label :for="`cb_${i.alias}`">{{i.title}}</label>
                    </div>
                    </div>

                    <div class="filter-item">
                        <h4>Бренди</h4>
<div class="controller" v-for="(i,index) in brands" :key="index">
                        <input class="form-checkbox" type="checkbox" :value="i.alias" v-model="chosenCats" :name="`cb_${i.alias}`" :id="`cb_${i.alias}`">
                        <label :for="`cb_${i.alias}`">{{i.title}}</label>
                    </div>
                    </div>

                    <div class="filter-item">
                        <h4>Ціна</h4>
                        <div class="filter-btn-row">
                            <input-text :label="'Від'" :isLabel="false" :placeholder="'Від'" v-model="price.min" :type="'number'" />
                            <input-text :label="'До'" :isLabel="false" :placeholder="'До'" v-model="price.max" :type="'number'" />
                            <button-regular :class="'btn-accent'">OK</button-regular>
                        </div>
                    </div>



                </div>
                <div class="col-10">
                    <div class="product-row">
                        <ProductCard v-for="(i,index) in filteredProducts" :key="index" :product="i" />

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
import InputText from '../components/ui/inputs/input-text.vue'

export default {
    data(){
        return{
            products:[],
            category:[],
            chosenCats:[],
             categories:[],
                brands:[],
                price:{
                    min:0,
                    max:0
                },
        }
    },
    computed:{
        filteredProducts () {
            let products = this.products
            let chosen = this.chosenCats
            let cat_id = chosen == [] ? undefined : chosen.map(i=>{return i})

            if(!cat_id) return products

            return products.filter(item=>{
                let items = item.categories 
                let res = items.filter(i => i == cat_id)
                console.log(res)
                return res
            })

            // return products
        }
    },
   methods:{
        getBrands(){
            let options = {
                url: 'cats/partners',
                method:'get'
            }

            this.$http(options)
            .then(res=>this.brands = res.data)
        },
        getCategories(){
            let options = {
                url: 'cats',
                method:'get'
            }

            this.$http(options)
            .then(res=>this.categories = res.data)
        },
        loadFilters(){
            this.getCategories()
            this.getBrands()
        },
        getProducts(){
            let category = this.$route.params.category
      let options = {
        url: "shop/category/alias/"+category,
        method: "get"
      }

      this.$http(options)
      .then(res=>this.products = res.data)
    },
    getCategory(){
        let category = this.$route.params.category

        let options = {
            url: 'cats/alias/'+category,
            method:'get'
        }
        this.$http(options)
        .then(res=>this.category = res.data)
    }
   },
   mounted(){
    this.getProducts()
    this.getCategory()
        this.loadFilters()

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
    CategoryCard,
    InputText
  }
}
</script>

<style>

</style>