<template>
  <div class="container">
    <h1>Register</h1>
      <input type="text" v-model="credientals.email">
      <input type="password" v-model="credientals.password">
      <button @click="register">Register</button>
  </div>
</template>

<script>
import axios from 'axios'

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
      register() {
        console.log("clicked")
        axios.post('http://localhost:3000/api/register', {
          email: this.credientals.email,
          password: this.credientals.password
        })
      .then((response) => {
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })
    },
      }
    }
  
</script>