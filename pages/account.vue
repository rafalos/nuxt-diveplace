<template>
  <div class="container">
  <div class="row" style="padding-top: 80px; ">
    <div class="col-lg-12">
      <div class="contentBox">
      <div class="row">
      <div class="col-lg-12">
        <button class="loginNavBtn" :class="{'loginNavBtnActive':mode==1}" @click="mode=1">Log In</button><button :class="{'loginNavBtnActive':mode==2}" @click="mode=2" class="loginNavBtn">Register</button>
      </div>
      </div>
      <div class="row">
        <div class="col-lg-12" style="padding: 50px;" v-if="mode==1">
          <h1 class="text-center">Log in</h1>
          <input type="text" class="input-line in"  placeholder="Email adress" required v-model="loginData.email">
          <input type="password" class="input-line in"  placeholder="Password" required v-model="loginData.password">
          <button class="whiteButton logBtn" @click="login" @keydown.enter="login">Log In</button>
          <h5 style="font-style: italic">By signing up u agree to our Terms & conditions</h5>
        </div>
      <div class="col-lg-12" style="padding: 50px;" v-if="mode==2">
    <h1 class="text-center">Register</h1>
    <h5 style="font-style: italic" class="text-center">Register is completly free! Check our <nuxt-link to="#">terms and conditions</nuxt-link> to make sure of it.</h5>
      <input type="email" class="input-line in" placeholder="Email adress (example@at.com)" required v-model="registerData.email">
      <input type="text" class="input-line in"  placeholder="Username (lowercase, min. 5 chars)" required v-model="registerData.username">
      <input type="password" class="input-line in"  placeholder="Password" required v-model="registerData.password">
      <input type="password" class="input-line in"  placeholder="Confirm password" required>
       <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck3" required>
      <label class="form-check-label" for="invalidCheck3">
        Agree to terms and conditions
      </label>
  </div>
  <button class="whiteButton logBtn" @click="register">Sign up</button>
  <button class="whiteButton logBtn" style="width: 100%; text-align: left"><i class="fab fa-facebook-square"></i> Sign up with facebook</button>
  <button class="whiteButton logBtn" style="width: 100%; background: #dd4b39; text-align: left"><i class="fab fa-google"></i> Sign up with google</button>
    <div v-if="notification.visible==1" class="alert alert-danger">
        {{notification.message}}
    </div>
</div>
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
        mode: 1,
        loginData: {
          email: "",
          password: ""
        },
        registerData: {
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
        axios.post('api/register', {
          email: this.registerData.email,
          username: this.registerData.username,
          password: this.registerData.password
        }).then((response) => {
          this.$store.dispatch("Authenticate", response.data.user)
          this.$router.push('/diveplaces')
        })
      },
    login() {
      axios.post('api/login', {
        email: this.loginData.email,
        password: this.loginData.password
      }).then((response) => {
        console.log(response.data)
        if(response.data == false) {
          console.log(response.data.message)
        } else {
          this.$store.dispatch("Authenticate", response.data.user)
          this.$router.push('/diveplaces')
        }
      })
      }
      }
    }
  
</script>

<style scoped>
  .in {
    color: #3B5998;
    border: 2px solid #3B5998;
    width: 70%;
    display: block;
    margin: 15px auto 15px auto;
    font-size: 17px;
  }

  .in::placeholder {
    color: black;
  }

  .contentBox {
    background: white;
    border-radius: 25px;
    text-align:center;
    width: 50%;
    margin: 0 auto;
  }
  .loginNavBtn:focus { outline: none; }

  .logBtn {
    background: #3B5998;
    width: 50%;
    height: 50px;
    line-height: 15px;
    margin: 5px 0px 5px 0px;
  }

  .logBtn:hover {
    color: white;
    background: rgb(50, 82, 151)
  }

  .loginNavBtn {
    width: 50%;
    margin: 0;
    background: #3B5998;
    padding: 10px;
    color: white;
    cursor: pointer;
    border: none;
  }
  .loginNavBtnActive {
    background: white;
    color: #3B5998;
  }


</style>


