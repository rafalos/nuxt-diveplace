<template>
  <div>
    <h1>Reports</h1>
    {{reports}}
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



 