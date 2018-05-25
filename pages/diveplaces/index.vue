<template>
 <div class="container">
    <div class="row">
      <div class="col-lg-3" style="padding-right: 0">
        <Filterbox />
      </div>
      <div class="col-lg-9">
        <Listitem v-for="diveplace in diveplaces" :key="diveplace._id" :diveplace="diveplace"/>
      </div>  
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Listitem from '@/components/diveplaces/Listitem'
import Filterbox from '@/components/diveplaces/Filterbox'

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
    components: {
      Listitem,
      Filterbox
    }
  }
</script>

<style scoped>

</style>
