<template>
  <div class="container">
    <h1>Login</h1>
      <input type="text" v-model="credientals.email">
      <input type="password" v-model="credientals.password">
      <button @click="login">Login</button>
      <div v-if="notification.visible==1" class="alert alert-success">
        {{notification.message}}
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Cookie from 'js-cookie'
import Auth from '@/services/Authentication'

  export default {
    data() {
      return {
        credientals: {
          email: "",
          password: ""
        },
         notification: {
           visible: 0,
           message: ""
         }
      }
    },
    methods: {
      login() {
        this.notification.visibe = 0; 
        var vm=this
        Auth.login(this.credientals.email,this.credientals.password, function(auth){
          if(auth.status == false) {
            vm.notification.visible = 1
            vm.notification.message = auth.message
          } else {
            vm.notification.visible = 1
            vm.notification.message = "Successfully logged in. Wait for redirect"
            vm.$store.commit('update', auth)
            Cookie.set('auth', auth)
            vm.$router.push('/')
          }
          
        })
      }
      }
    }
  
</script>