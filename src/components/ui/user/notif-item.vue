<template>
  <div class="notif-item">
      <div class="notif-item-meta">
          <p class="title text-muted">{{item.title}}</p>
          <p class="describe">{{item.content}}</p>
      </div>
      <div class="notif-item-date">
          {{moment(item.created_at).fromNow()}}
      </div>
  </div>
</template>

<script>
var moment = require('moment')
export default {
    data(){
        return{
            moment:moment
        }
    },
    props:{
        item:{
            type:Object
        }
    }
}
</script>

<style>

</style>