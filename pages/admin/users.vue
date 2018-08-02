<template>
  <div>
    <h1>Users registered: {{users.length}}</h1>
    <div v-for="user in users" :key="user._id" style="color: white">
      {{user.username}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    middleware: 'isAdmin',
    layout: 'admin',
    asyncData() {
      return axios.get('http://localhost:3000/api/users')
      .then((response) => {
        console.log(response)
        return {
          users: response.data.foundUsers,
        }
      })
      .catch(function(error){
        console.log(error)
      })
    }
  }
</script>