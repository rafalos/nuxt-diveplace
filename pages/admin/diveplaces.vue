<template>
   <div>
     <div>
     <h1>Live diveplaces {{diveplaces.length}}</h1>
      <div v-for="diveplace in diveplaces" :key="diveplace._id" class="whiteContainer box">
        <h4 class="text-center"> {{diveplace.name}}</h4>
        <button @click="unpublishDiveplace(diveplace._id)" class="stdbutton"><i class="fas fa-times"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    middleware: 'isAdmin',
    layout: 'admin',
     asyncData() {
      return axios.get('http://localhost:3000/api/diveplaces')
      .then((response) => {
        return {
          diveplaces: response.data.foundDiveplace,
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    methods: {
      unpublishDiveplace(diveplace){
        axios.post("http://localhost:3000/api/admin/diveplaces/unpublish", {id: diveplace})
        .then( (response) => {
          axios.get("http://localhost:3000/api/diveplaces")
          .then((response)=> {
            this.diveplaces = response.data.foundDiveplace
          })
        })
      }
    }
  }
</script>


<style scoped>
  .box {
    display: inline-block;
    width: 20%;
    margin: 10px;
  }
</style>