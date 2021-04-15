<template>
  <div id="search-page">
      <Navbar/>
      <SectionMain>
          <input type="text" v-model="searchQuery">
          <button @click="searchProducts">Search</button>

            <div class="row">
                <div class="col-2">
                    <h3>Фільтри</h3>
                </div>
                <div class="col-10 section-cards">
              <ProductCard v-for="(i,index) in products" :key="index" :product="i" />
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

export default {
    components:{
        Navbar,Footer,SectionMain,ProductCard
    },
    data(){
        return{
            products:[],
            searchQuery: this.$route.params.query
        }
    },
    methods:{
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
    }
}
</script>

<style>

</style>