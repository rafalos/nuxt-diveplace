<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-4 contentBox">
      <h2 class="text-center">Public profile of {{user.username}}</h2>
      <img id="userAvatar" class="img img-responsive" :src="`http://res.cloudinary.com/hoahkzu0h/${user.avatar[0]}`">
      <h3>First name: {{user.firstName}}</h3>
      <h3>Last name: {{user.lastName}}</h3>
      <h3>Certification number: {{user.certNumber}}</h3>
    </div>
    <div class="col-lg-4 contentBox">
      <h2>{{liked.length}} Liked places</h2>
      <ul>
        <li v-for="liked in liked" :key="liked._id">{{liked.name}}</li>
      </ul>
    </div>
    <div class="col-lg-4 contentBox">
      <h2>{{visited.length}} Visited places</h2>
      <li v-for="visited in visited" :key="visited._id">{{visited.name}}</li>
    </div>
  </div>
</div>

</template>

<script>
import axios from '@/plugins/axios'
export default {
  asyncData(context) {
      return axios.get('api/users/' + context.route.params.name)
      .then((response) => {
        console.log(response.data)
        return {
          user: response.data.user,
          liked: response.data.liked,
          visited: response.data.visited
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
  computed: {
    fetchUser() {
      return this.$store.state.authUser
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
  .contentBox {
    background:rgba(255,255,255, 0.17); 
    color: white; 
    padding: 10px;
    border: 1px solid white;
  }
</style>