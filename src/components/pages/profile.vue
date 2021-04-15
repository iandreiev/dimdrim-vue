<template>
  <div id="profile-page">
      <Navbar />
        <SectionMain>
            <div class="profile-header">
                 <h1>{{greetUser + user.user.name}}</h1>
                 <p>Сьогодні чарівний день, щоб замовити щось для свого дому!</p>
            </div>
            <div class="profile-wrapper">
                 <div class="profile-sidebar">
        <ul>
            <router-link :to="{name: i.route}" tag="li" exact-active-class="sidebar-item--active" class="sidebar-item" v-for="i in nav_items" :key="i.id">
                <unicon :name="i.icon" />
                <p>{{i.title}}</p>
            </router-link>
        </ul>
      </div>
      <div class="profile-content">
          <router-view></router-view>
      </div>
            </div>
        </SectionMain>
      <Footer />
  </div>
</template>

<script>
import Navbar from "../ui/Navbar"
import Footer from "../ui/Footer"
import HeadingOptions from "../ui/headings/header-option"
import Input from "../ui/inputs/input-text"
import ButtonRegular from "../ui/buttons/button-regular"
import SectionHeading from "../ui/sections/heading-section"
import SectionMain from "../ui/sections/main-section"
import { mapState } from 'vuex'
export default {
    data(){
        return{
            nav_items:[
                {
                    id:0,
                    title: 'Профіль',
                    icon: 'user-circle',
                    route: 'Profile'
                },
                {
                    id:1,
                    title: 'Історія замовлень',
                    icon: 'history',
                    route: 'OrderHistory'
                },
                 {
                    id:2,
                    title: 'Активні замовлення',
                    icon: 'truck',
                    route: 'UserOrders'
                },
                 {
                    id:3,
                    title: 'Сповіщення',
                    icon: 'bell',
                    route: 'UserNotifications'
                },
                {
                    id:4,
                    title: 'Улюблені товари',
                    icon: 'heart',
                    route: 'UserFavourites'
                },
                {
                    id:5,
                    title: 'Налаштування',
                    icon: 'pen',
                    route: 'UserSettings'
                },
                 {
                    id:6,
                    title: 'Вихід',
                    icon: 'signout',
                    route: 'Logout'
                },
            ]
        }
    },
    computed:{
        ...mapState(["auth", "user"]),
        greetUser(){
            const date = new Date()
            const hours = date.getHours()
            return hours < 12 ? 'Доброго ранку, ' : hours >= 12 && hours <= 17 ? 'Доброго дня, ' : hours >= 17 && hours <= 24 ? 'Доброї ночі, ' : 'UNDEFINED TIME!'
        }
    },
      components:{
        Navbar,
    Footer,
    HeadingOptions,
    Input,
    ButtonRegular,
    SectionHeading,
    SectionMain,
  },
}
</script>

<style>

</style>