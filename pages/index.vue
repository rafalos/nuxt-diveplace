<template>
<div class="container">
  <div class="whiteContainer">
    <div class="row">
      <div class="col-lg-3" style="border-right: 2px solid black;">
        <h3 class="text-center">Featured diveplace</h3>
        <h4 class="text-center">{{getRandomDiveplace.name}}</h4>
        <img class="img-thumbnail" :src="'http://res.cloudinary.com/hoahkzu0h/' + getRandomDiveplace.image[0]" alt="">
      </div>
      <div class="col-lg-9">
       <h3> Explore our {{ diveplaces.length }} diveplaces NOW! </h3>
       <div class="row">
         <div class="col-lg-3 car">1</div>
         <div class="col-lg-3 car">2</div>
         <div class="col-lg-3 car">3</div>
         <div class="col-lg-3 car">4</div>
       </div>
      </div>  
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

  export default {
    asyncData() {
      return axios.get('http://localhost:3000/api/diveplaces')
      .then((response) => {
        console.log(response)
        return {
          diveplaces: response.data.foundDiveplace
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    computed: {
      getRandomDiveplace() {
        return this.diveplaces[Math.floor(Math.random() * this.diveplaces.length)]
      }
    }
  }
</script>

<style scoped>
.car {
  border: 1px solid black;
  margin: 5px;
}
</style>
