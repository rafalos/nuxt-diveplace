<template>
  <div>
    <b-navbar toggleable="md" style="background:rgba(255,255,255, 0.2);">
      <nuxt-link to="/diveplaces"><button class="whiteButton navBtn"><i class="fas fa-list-ul"></i> Diveplaces</button></nuxt-link>
      <nuxt-link to="worldmap"><button class="whiteButton navBtn"><i class="fas fa-globe"></i> Worldmap</button></nuxt-link>
      <nuxt-link v-if="$store.state.auth !== null" to="diveplaces/new"><button class="whiteButton navBtn"><i class="fas fa-plus-circle"></i> New diveplace</button></nuxt-link>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="ml-auto">
    <nuxt-link to="/account" v-if="this.$store.state.auth == null"><button class="whiteButton navBtn"><i class="fas fa-user-circle"></i> Account</button></nuxt-link>

      <div v-else>
      <img class="img img-responsive avatar float-right" :src="`http://res.cloudinary.com/hoahkzu0h/${fetchUser.avatar[0]}`"> 
        <b-nav-item-dropdown right :text="fetchUser.username" style="text: center; display: inline-block;">
        <nuxt-link :to="'/users/' + fetchUser.username"><h4>My profile</h4></nuxt-link>
        <nuxt-link :to="'/users/' + fetchUser.username +'/edit'"><h4>Settings</h4></nuxt-link>
        <nuxt-link to='/admin' v-if="fetchUser.admin"><h4>Admin</h4></nuxt-link>
        <h4 @click="logout" style="cursor: pointer">Logout</h4>
      </b-nav-item-dropdown>
      </div>
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
  padding: 0;
  height: 50px;
}

.navbar-nav li {
  font-size: 20px;
  }

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: block;
}

.navBtn {
  margin: 0;
  border: none;
  border-radius: 0px;
  font-weight: normal;
}

</style>