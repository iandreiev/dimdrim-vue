<template>
  <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-4">
            <div class="footer-logo" @click="toHome"></div>
            <ul class="footer-list-wrapper">
              <li class="footer-list-item">Головна</li>
              <li class="footer-list-item">Про нас</li>
              <li class="footer-list-item">Програма лояльності</li>
              <li class="footer-list-item">Акції</li>
              <li class="footer-list-item">Поставникам</li>
            </ul>
          </div>
          <div class="col-4">
             <ul class="footer-list-wrapper">
               <p class="footer-list-header">Категорії</p>
              <li class="footer-list-item" v-for="(i,index) in categories" :key="index">{{i.title}}</li>
            </ul>
          </div>
          <div class="col-4">
             <ul class="footer-list-wrapper">
               <p class="footer-list-header">Покупцеві</p>
                <li class="footer-list-item">Оплата</li>
                <li class="footer-list-item">Доставка і самовивіз</li>
                <li class="footer-list-item">Повернення товару</li>
                <li class="footer-list-item">Гарантії та сервіс</li>
                <li class="footer-list-item">Умови використання</li>
                <li class="footer-list-item">Питання та відповіді</li>
            </ul>
          </div>
          <div class="col-4">
            <ul class="footer-list-wrapper">
              <p class="footer-list-header">Контакти</p>
                <li class="footer-list-item-icon">
                  <unicon name="phone"/>
                  <p>+38 098 84 17 200</p>
                </li>
                <li class="footer-list-item-icon">
                  <unicon name="phone"/>
                  <p>+38 050 43 21 945</p>
                </li>
                 <li class="footer-list-item-icon">
                  <unicon name="whatsapp"/>
                  <p>+38 050 43 21 767</p>
                </li>
                 <li class="footer-list-item-icon">
                  <unicon name="map-marker"/>
                  <p>Украина, г. Иршава, ул. Шевченка, 84</p>
                </li>
            </ul>
          </div>
        </div>
      </div>
  </footer>
</template>

<script>
import {mapState} from "vuex"
export default {
  data(){
    return{
    }
  },
  computed:{
    ...mapState(["categories"])
  },
  methods:{
    toHome(){
            this.$router.push({name:'Home'})
        }
  }
}
</script>

<style>

</style>