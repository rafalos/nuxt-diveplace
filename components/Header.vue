<template>
  <div>
    <b-navbar class="fixed-top" toggleable="md" style="border-bottom: 2px solid #143D61; background:rgba(255,255,255, 0.4);">
      <nuxt-link to="/"><img src="@/static/logo.png" class="img img-responsive" id="logo" style="height: 60%; width: 60%;"></nuxt-link>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right text="Account" v-if="this.$store.state.auth == null">
        <nuxt-link to="/login"><h4>Login</h4></nuxt-link>
        <nuxt-link to="/register"><h4>Register</h4></nuxt-link>
      </b-nav-item-dropdown>
       <b-nav-item-dropdown v-else right :text="fetchUser.username">
        <nuxt-link :to="'/users/' + fetchUser.username"><h4>My profile</h4></nuxt-link>
        <h4 @click="logout">Logout</h4>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch("logout")
      }
    },
    computed: {
      fetchUser() {
        return this.$store.state.auth.user
      }
    }
  }
</script>

<style scoped>

#logo {
  margin-left: 10px;
  height: auto; 
  width: auto; 
  max-width: 350px; 
  max-height: 350px;
}

.navbar {
  padding: 3px;
}

.navbar-nav li {
  font-size: 20px;
  font-weight: bold;
  }
</style>