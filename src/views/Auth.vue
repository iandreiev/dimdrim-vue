<template>
  <div id="auth-page">
       <Navbar />
      <SectionMain>

        <div class="row auth-container" v-if="loading.auth == false">
          <div class="col-4 mx-a">
            <h1>Авторизація</h1>
      <Input v-model="login.email" placeholder="E-mail" :isLabel="true" :label="'E-mail'" :name="'email'" :type="'text'" />
      <Input v-model="login.password" placeholder="Пароль" :isLabel="true" :label="'Пароль'" :name="'password'" :type="'password'" />
      <Input v-if="register.isRegister == true" v-model="register.name" placeholder="Ім'я" :isLabel="true" :label="'Ім\'я'" :name="'name'" :type="'text'" />
      <Input v-if="register.isRegister == true" v-model="register.midname" placeholder="Прізвище" :isLabel="true" :label="'Прізвище'" :name="'midname'" :type="'text'" />
      <ButtonRegular v-if="register.isRegister == false" :btnClass="'btn-block btn-success'" @click="loginBtn">Ввійти</ButtonRegular>
      <ButtonRegular v-if="register.isRegister == true" :btnClass="'btn-block btn-accent'" @click="regBtn">Зареєструватись</ButtonRegular>
      <ButtonRegular @click="register.isRegister = !register.isRegister" :btnClass="'btn-block btn-white'">{{ register.isRegister == true ? 'Вхід' : 'Реєстрація' }}</ButtonRegular>
      <p v-if="Object.keys(status.msg).length > 0">{{status.msg}}</p>

       </div>
        </div>
      <state-loading :text="'Триває авторизація'" v-else />
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
import StateLoading from "../components/ui/state/state-loading.vue"
import getDevice from "../store/getDevice"
import {mapState} from "vuex"

export default {
  data(){
    return{
      loading:{
        auth:false
      },
      login:{
        email:'',
        password:''
      },
      register:{
        isRegister: false,
        name:'',
        midname:'',
      },
      status:{
        error:false,
        msg:''
      },
      last_login:{
        device: '',
        ip: '',
        logged_at: new Date().getTime()
      }
    }
  },
  methods:{
    getDeviceBrowser(){
      let browser = navigator.userAgent
      this.$store.dispatch('GET_IP')

      this.last_login = {
        device: browser,
        ip: this.ip.ip,
        last_location: this.ip.city,
        logged_at: new Date().getTime()
      }
      return
      
    },
    loginBtn(){
      this.loading.auth = true

      let options = {
        url: 'auth/login',
        method: 'post',
        data: this.login
      }

      this.$http(options)
      .then(res=>{
        this.$store.commit('SAVE_USER', res.data)
        
        setTimeout(()=>{
                  if(this.auth == true){
                          let setLogin = {
        url: 'users/setLastLogin/'+this.user.user.id,
        method:'patch',
        data: this.last_login,
        headers:{
          Authorization: this.user.token
        }
      }
          this.$http(setLogin)
          .then(res=>{
            console.log(res.data)
            this.loading.auth = false
            this.$router.push({name: 'UserOrders'})
          })
        }
        }, 1500)
        })
      .catch(e=>alert(e))
    },
    regBtn(){
       let options = {
        url: 'auth/register',
        method: 'post',
        data: {
          name: this.register.name,
          midname: this.register.midname,
          email: this.login.email,
          password: this.login.password,
          type: 'default_user',
          last_login: this.last_login
        }
      }

      this.$http(options)
      .then(res=>{
        this.register.isRegister = false

        this.status = {
          error:false,
          msg:'Ви успішно зареєструвались! Авторизуйтесь, будь ласка'
        }

        setTimeout(()=>{
          this.status = {
            error: false,
            msg: ''
          }
        }, 3000)
      })
      .catch(e=>alert(e))
    },
  },
      computed:{
      ...mapState(["ip","user", "auth"])
    },
    mounted(){
      this.getDeviceBrowser()
    },
  components:{
        Navbar,
    Footer,
    HeadingOptions,
    Input,
    ButtonRegular,
    SectionHeading,
    SectionMain,
    StateLoading
  }
}
</script>

<style>

</style>