<template>
  <div>
    <h1>Reports: {{reports.length}}</h1>
    <div v-for="report in reports" :key="report._id" class="whiteContainer box text-center">
      <h4>Author: {{report.author}}</h4>
      <h4>Reason: {{report.reason}}</h4>
      <h4>Description: {{report.description}}</h4>
      <h4>Diveplace: {{report.diveplace.name}}</h4>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'

  export default {
    middleware: 'isAdmin',
    layout: 'admin',
    asyncData() {
      return axios.get('api/admin/reports')
      .then((response) => {
        console.log(response.data)
        return {
          reports: response.data.foundReports
        }
      })
      .catch(function(error){
        console.log(error)
      })
  }
  }
</script>

<style scoped>
  .box{
    width: 30%;
  }
</style>



 