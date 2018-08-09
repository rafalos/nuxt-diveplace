<template>
 <div class="container">
    <div class="row">
      <div class="col-lg-3" style="padding-right: 0">
        <Filterbox @filterChanged="updateData"/>
      </div>
      <div class="col-lg-9">   
      <div id="loading" v-if="loader==1">
        <div class="loader"></div>
      </div>
        <div v-else-if="diveplaces.length==0">
          <h3 class="whiteContainer">No diveplaces found matching your search criteria</h3>
        </div>
        <Listitem v-else v-for="diveplace in diveplaces" :key="diveplace._id" :diveplace="diveplace"/>
      </div>  
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Listitem from '@/components/diveplaces/Listitem'
import Filterbox from '@/components/diveplaces/Filterbox'

  export default {
    data() {
      return {
        showDiveplaces: 1,
        loader: 0,
        search: '',
        depth: 50,
        sight: 50
      }
    },
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
      updateData(name, depth, sight) {
        this.loader = 1
         axios.post('http://localhost:3000/api/diveplaces/search', 
         {
           name: name,
           depth: depth,
           sight: sight
          })
        .then((response)=> {
          this.diveplaces = response.data.foundDiveplace;
          this.loader= 0
        })
      }
    },
    components: {
      Listitem,
      Filterbox
    }
  }
</script>

<style scoped>
  #loading {
  margin-left: 100px;
  position: relative;
  bottom: 50;
  left: 50;
  z-index: 999;
  }
</style>
