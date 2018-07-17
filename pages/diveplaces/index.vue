<template>
 <div class="container">
    <div class="row">
      <div class="col-lg-3" style="padding-right: 0">
        <Filterbox @nameChanged="updateSearch" @sightChanged="updateSight" @depthChanged="updateDepth" />
      </div>
      <div class="col-lg-9">
        <Listitem v-for="diveplace in items" :key="diveplace._id" :diveplace="diveplace"/>
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
        search: '',
        depth: 50,
        sight: 50
      }
    },
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
    },
    computed: {
      items() {
        return this.diveplaces.filter((e)=>{
           return e.name.toLowerCase().match(this.search.toLowerCase()) && e.depth < this.depth && e.sight < this.sight
        })
      }
    },
    methods: {
      updateSearch(value) {
        this.search = value
      },
      updateSight(value) {
        this.sight = value
      },
      updateDepth(value) {
        this.depth = value
      }
    },
    components: {
      Listitem,
      Filterbox
    }
  }
</script>

<style scoped>

</style>
