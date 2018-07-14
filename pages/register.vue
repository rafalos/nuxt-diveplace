<template>
  <div class="container">
    <h1>Register</h1>
      <input type="text" v-model="credientals.email">
      <input type="password" v-model="credientals.password">
      <button @click="register">Register</button>
      <div v-if="notification.visible==1" class="alert alert-danger">
        {{notification.message}}
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Auth from '@/services/Authentication'
import Cookie from 'js-cookie'

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
      register() {
        this.notification.visible = 0;
        let vm = this;
        Auth.register(this.credientals.email,this.credientals.password, function(auth) {
          if(auth.status == false){
            console.log("false")
          } else {
            vm.notification.visible = 1;
            vm.notification.message = auth.message
            Auth.login(vm.credientals.email,vm.credientals.password, function(auth){
          if(auth.status == false) {
            conole.log("login failed")
          } else {
            vm.$store.commit('update', auth)
            Cookie.set('auth', auth)
            setTimeout( () => vm.$router.push({ path: '/'}), 3000);
          } 
        })
          }
        })
    }
      }
    }
  
</script>