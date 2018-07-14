<template>
<div class="container">
  <div class="whiteContainer">
    <h1 class="text-center">Public profile of {{user.username}}</h1>
    <button class="stdbutton">Edit</button>
  </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
  asyncData(context) {
      return axios.get('http://localhost:3000/api/users/' + context.route.params.name)
      .then((response) => {
        console.log(response.data)
        return {
          user: response.data.foundUser
        }
      })
      .catch(function(error){
        console.log(error)
      })
    }
}
</script>