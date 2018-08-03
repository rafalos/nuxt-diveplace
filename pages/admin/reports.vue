<template>
  <div>
    <h1>Reports</h1>
    {{reports}}
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    middleware: 'isAdmin',
    layout: 'admin',
    asyncData() {
      return axios.get('http://localhost:3000/api/admin/reports')
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



 