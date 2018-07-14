<template>
  <div class="container">
   <div class="whiteContainer" style="padding: 15px;">
    <h1 class="text-center">Login</h1>
    <div class="row" style="margin-top: 40px;">
    <div class="col-lg-12">
      <input type="email" class="input-line" id="validationServer01" placeholder="Email adress (example@at.com)" required v-model="credientals.email">
      <input type="password" @keydown.enter="login" class="input-line" id="validationServer02" placeholder="Password" required v-model="credientals.password">
    </div>
  </div>
  <button class="stdbutton" @click="login">Login</button>
    <div v-if="notification.visible==1" class="alert alert-danger">
        {{notification.message}}
    </div>
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