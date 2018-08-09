<template>
<div class="container">
  <div class="whiteContainer">
    <h1 class="text-center">Public profile of {{user.username}}</h1>
    <img id="userAvatar" class="img img-responsive" :src="`http://res.cloudinary.com/hoahkzu0h/${user.avatar[0]}`">
    <h3>First name: {{user.firstName}}</h3>
    <h3>Last name: {{user.lastName}}</h3>
    <h3>Certification number: {{user.certNumber}}</h3>
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
    },
  computed: {
    fetchUser() {
      return this.$store.state.auth.user
    }
  }
}
</script>


<style scoped>
  #userAvatar {
    margin: 0 auto;
    border-radius: 100%;
    height: 150px;
    width: 150px;
    display: block;
  }
</style>