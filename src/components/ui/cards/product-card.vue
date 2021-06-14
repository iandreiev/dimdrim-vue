<template>
  <div class="card card-product" @mouseover="actionHover = true" @mouseleave="actionHover = false">
      <div class="card-labels">
          <div class="label label-danger" v-if="product.prices[0].sale == true">SALE</div>
      </div>
      <div class="card-image" :style="{'backgroundImage':`url(${product.hero})`}">
         <transition name="fade">
              <div class="btn-float-group" :class="{'btn-float-group--active':actionHover == true}">
          <button @click="addToCart(product)" class="btn-float default shadow">
              <unicon name="shopping-bag"/>
          </button>
                    <button class="btn-float default shadow" @click="addToFav(product)">
              <unicon name="heart"/>
          </button>
          </div>
         </transition>
      </div>
      <div class="card-meta">
          <h2 @click="toProduct(product._id)">{{product.title}}</h2>
          <p class="card-meta--price" v-if="product.prices[0].sale == false">
              {{product.prices[0].price}} {{product.prices[0].currency}}
          </p>
           <div class="card-meta--price" v-else>
               <p class="text-danger">
            {{product.prices[0].sale_price}} {{product.prices[0].currency}}
               </p>

               <p class="text-strike text-muted">
            {{product.prices[0].price}} {{product.prices[0].currency}}

               </p>
          </div>
      </div>
      <div class="card-actions">
          <!-- <ButtonRegular :btnClass="'btn-success btn-block'" @click="addToCart(product)">В корзину</ButtonRegular>
          <ButtonRegular :btnClass="'btn-accent'" @click="addToFav(product)">
              <unicon name="heart"/>
          </ButtonRegular> -->

      </div>
      <notifications group="product" classes="notif" />
      <notifications group="favs" classes="notif" />
  </div>
</template>

<script>
import ButtonRegular from "../buttons/button-regular"
export default {
    props:{
        product:{
            type: Object
        }
    },
    data(){
        return{
            actionHover: false,
            sizes: ''
        }
    },
    methods:{
        toProduct(id){
            this.$router.push({name: 'Product', params: {id:id}})
        },
        loadSizes(){
            let options = {
                url: 'sizes',
                method: 'get'
            }

            this.$http(options)
            .then(res=>this.sizes = res.data)
        },
        currentSize(val){
        let sizes = this.sizes

             const res = sizes.find(i=>{
                if(i.type == val){
                   return i
                }
            })

            return res.name
    },
    notification(params){
        this.$notify({
            group: params.group,
            title: params.title,
            text: params.text
        })
    },
    addToCart(item){
        let params = {
            title: 'Success',
            text: 'product added to cart',
            group: 'product'
        }
        this.$store.commit('addToCart',item)
        this.notification(params)
    },
    addToFav(item){
        let params = {
            title: 'Success',
            text: 'product added to favs',
            group: 'favs'
        }
        this.$store.commit('addToFavs',item)
        this.notification(params)

    },
    
    },
    

    mounted(){
        this.loadSizes()
    },
    components:{
        ButtonRegular
    }
}
</script>

<style>

</style>