<template>
  <div id="search-page">
      <Navbar/>
      <SectionMain>
              <div class="col-12 search-block">
                  <h1>Пошук серед тисячі позицій</h1>
      <div class="row">
          <input class="search-field" type="text" placeholder="Пошук серед тисячі товарів" name="search" id="search" v-model="searchQuery">
          <ButtonRegular :btnClass="'btn-accent'" @click="toSearch">Пошук</ButtonRegular>
      </div>
    </div>

            <div class="row">
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
                <div class="col-10 section-cards">
              <ProductCard v-for="(i,index) in filteredProducts" :key="index" :product="i" />
                </div>
            </div>

      </SectionMain>
      <Footer/>
  </div>
</template>

<script>
import Navbar from "../components/ui/Navbar"
import Footer from "../components/ui/Footer"
import SectionMain from "../components/ui/sections/main-section"
import ProductCard from "../components/ui/cards/product-card"
import ButtonRegular from "../components/ui/buttons/button-regular"
import InputText from '../components/ui/inputs/input-text.vue'

export default {
    components:{
        Navbar,Footer,SectionMain,ProductCard,ButtonRegular,
        InputText,
        
    },
    data(){
        return{
            cat:[],
            products:[],
                categories:[],
                chosenCats:[],
                brands:[],
                price:{
                    min:0,
                    max:0
                },
            searchQuery: this.$route.params.query
        }
    },
    computed:{
         filteredProducts () {
            let products = this.products
            let chosen = this.chosenCats
            let cat_id = chosen.map(i=>{return i})

            // if(!cat_id) return products

            return products.filter(item=>{
                let items = item.categories 
                let res = items.map(i => i == cat_id)
                return res
            })

            // return products
        }
    },
    methods:{
        toSearch(){},
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
        searchProducts(){
            let options = {
                url: 'search/query',
                method:'post',
                data:{
                    query: this.searchQuery
                }
            }

            this.$http(options)
            .then(res=>{
                this.products = res.data
                this.searchQuery = ''
                })
            .catch(err=>console.log(err))
        }
    },
    mounted(){
        this.searchProducts()
        this.loadFilters()
    }
}
</script>

<style>

</style>