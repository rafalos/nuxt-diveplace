<template>
  <div class="container">
    <h1>Login</h1>
      <input type="text" v-model="credientals.email">
      <input type="password" v-model="credientals.password">
      <button @click="login">Register</button>
  </div>
</template>

<script>
import axios from 'axios'
import Cookie from 'js-cookie'

  export default {
    data() {
      return {
        credientals: {
          email: "",
          password: ""
        }
      }
    },
    methods: {
      login() {
        console.log("clicked")
        axios.post('http://localhost:3000/api/login', {
          email: this.credientals.email,
          password: this.credientals.password
        })
      .then((response) => {
          const auth = {
          accessToken: response.data.token,
          user: response.data.user
        }
        this.$store.commit('update', auth)
        Cookie.set('auth', auth)
        this.$router.push('/')
      })
      .catch(function(error){
        console.log(error)
      })
    },
      }
    }
  
</script>