<template>
  <div class="container">
    <div class="row whiteContainer">
      <div class="col-lg-3" v-for="diveplace in diveplaces" :key="diveplace._id">
        <nuxt-link :to="'/diveplaces/' + diveplace._id"><h3>{{ diveplace.name }}</h3></nuxt-link>
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
    }
  }
</script>

<style scoped>
  .diveplace-box {
    border: 1px solid black;
    background: white;
  }
</style>
