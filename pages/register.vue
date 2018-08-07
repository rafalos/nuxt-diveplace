<template>
  <div class="container" >
  <div class="whiteContainer" style="padding: 15px;">
    <h1 class="text-center">Register</h1>
    <h4 class="text-center">Register is completly free! Check our <nuxt-link to="#">terms and conditions</nuxt-link> to make sure of it.</h4>
    <div class="row" style="margin-top: 40px;">
    <div class="col-lg-6">
      <input type="email" class="input-line" placeholder="Email adress (example@at.com)" required v-model="credientals.email">
      <input type="text" class="input-line"  placeholder="Username (lowercase, min. 5 chars)" required v-model="credientals.username">
      <input type="password" class="input-line"  placeholder="Password" required v-model="credientals.password">
      <input type="password" class="input-line"  placeholder="Confirm password" required>
    </div>
    <div class="col-lg-6">
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck3" required>
      <label class="form-check-label" for="invalidCheck3">
        Agree to terms and conditions
      </label>
    </div>
  </div>
  <button class="stdbutton" @click="register">Register</button>
    <div v-if="notification.visible==1" class="alert alert-danger">
        {{notification.message}}
    </div>
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
          password: "",
          username: ""
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
        Auth.register(this.credientals.email,this.credientals.password, this.credientals.username, function(auth) {
          if(auth.status == false){
            console.log("false")
          } else {
            vm.notification.visible = 1;
            vm.notification.message = auth.message
            Auth.login(vm.credientals.email,vm.credientals.password, function(auth){
          if(auth.status == false) {
            conole.log("login failed")
          } else {
            setTimeout( () => {
              vm.$store.commit('update', auth)
              Cookie.set('auth', auth)
              vm.$router.push({ path: '/'})
            }
            ,3000);
          } 
        })
          }
        })
    }
      }
    }
  
</script>