<template>
  <div id="user-orders">
    <section class="section-user-slide">
      <div class="profile-slider">
      <div class="loading-wrapper" v-if="loading.slides == true">
        <div class="spinner"></div>
        <p class="text">Завантажуємо</p>
      </div>
      <div v-else :style="{'backgroundImage':`url(${i.image})`}" class="profile-slider slide-item" v-for="(i,index) in slides" :key="index">
        <div class="options only-text">
          <h1>{{i.title}}</h1>
          <p>{{i.content}}</p>
          <button-regular @click="slideClick(i.cta_link)" :btnClass="'btn-accent'">{{i.cta_btn}}</button-regular>
        </div>
      </div>
    </div>
    </section>
    
    <section class="section-user-products">
          <h2>Сьогодні придбали</h2>
    <div class="profile-product-grid">
      <product-card v-for="(i,index) in shuffle" :key="index" :product="i" />
    </div>
    </section>
  </div>
</template>

<script>
import ButtonRegular from '../../components/ui/buttons/button-regular.vue'
import productCard from '../../components/ui/cards/product-card.vue'
export default {
  components: { productCard, ButtonRegular },
  data(){
    return{
      shuffle:{
        type:Array,
        default:[]
      },
      loading:{
        slides:true
      },
      slider:{},
      slides:[]
    }
  },
  methods:{
    slideClick(item){
      window.open(item)
    },
    getSlider(){
      this.loading.slides = true

      let options = {
        url: `/slider/getByAlias/user-profile`,
        method:'get'
      }

      

      this.$http(options)
      .then(res=>{
        this.slider = res.data

        setTimeout(()=>{
          let getSlides = {
        url: `slide/alias/${this.slider._id}`,
        method:'get'
      }
          this.$http(getSlides)
        .then(res=>{
          this.slides = res.data
          this.loading.slides = false
          })
        },500)
      })
    },
    getProducts(){
      let options = {
        url: 'shop/list/shuffle',
        method:'get'
      }

      this.$http(options)
      .then(res=>this.shuffle = res.data)
    }
  },
  mounted(){
    this.getSlider()
  },
  created(){
    this.getProducts()
  }
}
</script>

<style>

</style>