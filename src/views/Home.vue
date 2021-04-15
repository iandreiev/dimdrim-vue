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
          <input type="text" name="search" id="search" v-model="searchQuery">
          <ButtonRegular :btnClass="'btn-accent'" @click="toSearch">Пошук</ButtonRegular>
      </div>
    </div>
       <SectionHeading>
        <HeadingOptions :title="'Популярні категорії'" :link="'Categories'" :linkTitle="'Всі партнери'" />
    </SectionHeading>

      <div class="row">
        <swiper class="swiper" :options="swiperOption"> 
          <swiper-slide  v-for="(i,index) in categories" :key="index">
        <category-card :data="i" />
          </swiper-slide>
        </swiper>
      </div>

    <SectionHeading>
      <HeadingOptions :title="'Популярні товари'" :link="'Catalogue'" :linkTitle="'Всі товари'" />
    </SectionHeading>
    <div class="row">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(i,index) in products" :key="index">
    <ProductCard :product="i" />
        </swiper-slide>
      </swiper>
    </div>

   <SectionHeading>
        <HeadingOptions :title="'Наші партнери'" :link="'Partners'" :linkTitle="'Всі партнери'" />
    </SectionHeading>
    
   
        <SectionScrollHorizontal>
        <ImageCard :cardType="'partner'" v-for="(i,index) in partners" :key="index" :data="i" />
    </SectionScrollHorizontal>

    
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
      products:'',
      searchQuery: '',
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