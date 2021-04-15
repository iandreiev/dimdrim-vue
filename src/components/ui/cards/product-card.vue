<template>
  <div class="card card-product">
      <div class="card-image" :style="{'backgroundImage':`url(${product.hero})`}">
      </div>
      <div class="card-meta">
          <h2 @click="toProduct(product._id)">{{product.title}}</h2>
          <p class="card-meta--price">
              {{product.price}} грн.
          </p>
      </div>
      <div class="card-actions">
          <ButtonRegular :btnClass="'btn-success btn-block'" @click="addToCart(product)">В корзину</ButtonRegular>
          <ButtonRegular :btnClass="'btn-accent btn-block'" @click="addToFav(product)">В улюблені</ButtonRegular>

      </div>
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
    addToCart(item){
        this.$store.commit('addToCart',item)
    },
    addToFav(item){
        this.$store.commit('addToFavs',item)
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