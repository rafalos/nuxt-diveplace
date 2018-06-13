<template>
  <div><h1>Test</h1></div>
</template>

<script>
import axios from 'axios'
export default {
  asyncData(context) {
      return axios.get('http://localhost:3000/api/users/' + context.route.params.name)
      .then((response) => {
        console.log(response)
        return {
          user: response.data.user
        }
      })
      .catch(function(error){
        console.log(error)
      })
    }
}
</script>