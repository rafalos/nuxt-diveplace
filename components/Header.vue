<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Language" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right text="Profile" v-if="this.$store.state.auth == null">
        <nuxt-link to="/login"><h4>Login</h4></nuxt-link>
        <nuxt-link to="/register"><h4>Register</h4></nuxt-link>
      </b-nav-item-dropdown>
       <b-nav-item-dropdown v-else right :text="fetchUser.email">
        <nuxt-link to="#"><h4>Profile</h4></nuxt-link>
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
    height: auto; 
    width: auto; 
    max-width: 350px; 
    max-height: 350px;
}

</style>