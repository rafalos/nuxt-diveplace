<template>
   <div>
     <div>
      <h1>Review Diveplaces: {{diveplaces.length}}</h1>
      <div v-for="diveplace in diveplaces" :key="diveplace._id" class="whiteContainer box">
        <h4 class="text-center"> {{diveplace.name}}</h4>
        <img class="img img-thumbnail mx-auto d-block" style="height: 200px;" :src="`http://res.cloudinary.com/hoahkzu0h/${diveplace.image[0]}`">
        <div style="padding: 5px;">
        <button @click="acceptDiveplace(diveplace._id)" class="btn btn-success"><i class="fas fa-check"></i></button>
        <button @click="destroyDiveplace(diveplace._id)" class="btn btn-danger"><i class="fas fa-trash"></i></button>
        <button class="btn btn-secondary"><i class="fas fa-map-pin"></i></button>
        <button class="btn btn-info"><i class="fas fa-info"></i></button>
        <button class="btn btn-info"><i class="fas fa-images"></i> ({{diveplace.image.length}})</button>
        </div>
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
      return axios.get('http://localhost:3000/api/admin/reviewdiveplaces')
      .then((response) => {
        return {
          diveplaces: response.data.foundDiveplaces,
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    methods: {
      acceptDiveplace(diveplace) {
        axios.post('http://localhost:3000/api/admin/diveplaces/accept', {id: diveplace})
        .then((response) => {
          axios.get("http://localhost:3000/api/admin/reviewdiveplaces")
          .then((response)=> {
            this.diveplaces = response.data.foundDiveplaces
          })
        })
      },
      destroyDiveplace(diveplace) {
        axios.post('http://localhost:3000/api/admin/diveplaces/delete',{id: diveplace})
        .then((response)=> {
          axios.get("http://localhost:3000/api/admin/reviewdiveplaces")
          .then((response)=> {
            this.diveplaces = response.data.foundDiveplaces
          })
        })
      }
    }
  }

</script>

<style scoped> 
  .box {
    display: inline-block;
    width: 30%;
    margin: 10px;
  }
  .stdbutton {
    width: 50px;
  }
  button {
    margin-right: 3px;
  }
</style>