<template>
  <div>
    <button class="stdbutton">Diveplaces</button>
    <button class="stdbutton">Users</button>
    <div v-if="state == 1">
      <h1>Diveplaces added: {{diveplaces.length}}</h1>
      <div v-for="diveplace in diveplaces" :key="diveplace._id" class="whiteContainer box">
        <h4 class="text-center"> {{diveplace.name}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        state: 1
      }
    },
    middleware: 'isAdmin',
     asyncData() {
      return axios.get('http://localhost:3000/api/diveplaces')
      .then((response) => {
        console.log(response)
        return {
          diveplaces: response.data.foundDiveplace,
        }
      })
      .catch(function(error){
        console.log(error)
      })
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