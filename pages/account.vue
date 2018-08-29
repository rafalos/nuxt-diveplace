<template>
  <div class="container">
  <div class="row" style="padding-top: 80px; ">
    <div class="col-lg-6" style="border-right: 1px solid white; ">
      <div class="contentBox">
        <h1 class="text-center">Log in</h1>
          <h5 style="font-style: italic">By signing up u agree to our Terms & conditions</h5>
          <input type="text" class="input-line in"  placeholder="Username (lowercase, min. 5 chars)" required v-model="credientals.username">
          <input type="password" class="input-line in"  placeholder="Password" required v-model="credientals.password">
          <button class="whiteButton logBtn" @click="register">Log In</button>
      </div>
    </div>
      <div class="col-lg-6">
      <div class="contentBox">
    <h1 class="text-center">Register</h1>
    <h5 style="font-style: italic" class="text-center">Register is completly free! Check our <nuxt-link to="#">terms and conditions</nuxt-link> to make sure of it.</h5>
      <input type="email" class="input-line in" placeholder="Email adress (example@at.com)" required v-model="credientals.email">
      <input type="text" class="input-line in"  placeholder="Username (lowercase, min. 5 chars)" required v-model="credientals.username">
      <input type="password" class="input-line in"  placeholder="Password" required v-model="credientals.password">
      <input type="password" class="input-line in"  placeholder="Confirm password" required>
       <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck3" required>
      <label class="form-check-label" for="invalidCheck3">
        Agree to terms and conditions
      </label>
  </div>
  <button class="whiteButton logBtn" @click="register">Sign up</button>
  <button class="whiteButton logBtn" style="width: 100%; text-align: left" @click="register"><i class="fab fa-facebook-square"></i> Sign up with facebook</button>
  <button class="whiteButton logBtn" style="width: 100%; background: #dd4b39; text-align: left" @click="register"><i class="fab fa-google"></i> Sign up with google</button>
    <div v-if="notification.visible==1" class="alert alert-danger">
        {{notification.message}}
    </div>
</div>
</div>
  </div>
    </div>
  </div>

    

 
</template>

<script>
import axios from '@/plugins/axios'
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

<style scoped>
  .in {
    color: lightgrey;
    border: 2px solid lightgrey;
    width: 50%;
    display: block;
    margin-right: auto;
    margin-left: auto;
  }

  .in::placeholder {
    color: lightgrey
  }

  .contentBox {
    background: white;
    color: black;
    border-radius: 25px;
    padding: 15px;
    text-align:center;
    height: 530px;
  }
  
  .logBtn {
    background: #3B5998;
    width: 50%;
    border-radius: 25px;
    height: 50px;
    line-height: 20px;
    margin: 5px 0px 5px 0px;
  }
</style>