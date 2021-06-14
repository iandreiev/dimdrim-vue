<template>
  <div id="home">
    <Navbar />
      <SectionMain>
        <SectionHeading>
        <HeadingOptions :title="'Ласкаво просимо в DIMDRIM'" />
      </SectionHeading>
      <div class="slide slide-test">
        <div class="row">
          <div class="col-6 slide-helper">
        <h1>Знайди своє серед тисячі товарів!<br>DIMDRIM працює для тебе</h1>
          <ButtonRegular :btnClass="'btn-white'" @click="toSearch">Дізнатись більше</ButtonRegular>
         
          </div>
          <div class="col-6 slide-img">
            <div class="img"></div>
          </div>
        </div>
      </div>
      <SectionHeading>
    <HeadingOptions :title="'Пошук товарів'" />
      </SectionHeading>
    <div class="col-12">
      <div class="row">
          <input class="search-field" type="text" placeholder="Пошук серед тисячі товарів" name="search" id="search" v-model="searchQuery">
          <ButtonRegular :btnClass="'btn-accent'" @click="toSearch">Пошук</ButtonRegular>
      </div>
    </div>
       <SectionHeading>
        <HeadingOptions :title="'Шукаєш новинки? У нас їх багато'" :link="'Categories'" :linkTitle="'Всі категорії'" />
    </SectionHeading>

    <scroll-horizontal :settings="catOptions">
      <CategoryCard v-for="(i,index) in categories" :key="index" :data="i"/>
    </scroll-horizontal>
         

    <SectionHeading>
      <HeadingOptions :title="'Популярні товари'" :link="'Catalogue'" :linkTitle="'Всі товари'" />
    </SectionHeading>

    <scroll-horizontal :settings="catOptions">
      <ProductCard v-for="(i,index) in products" :key="index" :product="i" />
    </scroll-horizontal>
   
   <button-regular @click="toRoute('Catalogue')" :btnClass="'btn-pillow btn-accent'">Go do this</button-regular>


   <SectionHeading>
        <HeadingOptions :title="'Наші партнери'" :link="'Partners'" :linkTitle="'Всі партнери'" />
    </SectionHeading>
    
   
        <scroll-horizontal :settings="catOptions">
        <ImageCard :cardType="'partner'" v-for="(i,index) in partners" :key="index" :data="i" />
    </scroll-horizontal>

   <button-regular @click="toRoute('Partners')" :btnClass="'btn-pillow btn-accent'">Go do this</button-regular>

    
    <SectionHeading>
        <HeadingOptions :title="'Сервіс'" :link="'Service'" :linkTitle="'Всі послуги'" />
    </SectionHeading>
      </SectionMain>

    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/ui/Navbar"
import Footer from "../components/ui/Footer"
import HeadingOptions from "../components/ui/headings/header-option"
import Input from "../components/ui/inputs/input-text"
import SectionHeading from "../components/ui/sections/heading-section"
import SectionMain from "../components/ui/sections/main-section"
import ProductCard from "../components/ui/cards/product-card"
import ImageCard from "../components/ui/cards/image-card"
import SectionScrollHorizontal from "../components/ui/slider/slider-horizontal"
import { mapState } from 'vuex'
import CategoryCard from '../components/ui/cards/category-card.vue'
import ScrollHorizontal from '../components/ui/scroll/scroll-horizontal.vue'
import ButtonRegular from '../components/ui/buttons/button-regular.vue'

export default {
  data(){
    return{
      products:'',
      searchQuery: '',
      catOptions:{
        col:12,
        scrollbar: true
      },
       swiperOption: {
          slidesPerView: 4,
          spaceBetween: 20,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
    }
  },
  methods:{
    toSearch(){
      this.$router.push({name: 'Search', params:{query:this.searchQuery}})
      
    },
    toRoute(route){
      this.$router.push({name:route})
    },
    testClick(){
      alert('clicked')
    },
    getProducts(){
      let options = {
        url: "shop",
        method: "get"
      }

      this.$http(options)
      .then(res=>this.products = res.data)
    }
  },
  computed:{
    ...mapState(["partners", "categories"])
  },
  mounted(){
    this.getProducts()
  },
  components:{
    Navbar,
    Footer,
    HeadingOptions,
    Input,
    SectionHeading,
    SectionMain,
    ProductCard,
    SectionScrollHorizontal,
    ImageCard,
    CategoryCard,
    ScrollHorizontal,
    ButtonRegular
  }
}
</script>

<style>
    

</style>