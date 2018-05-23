<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Język" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right>
        <template slot="button-content">
          <em>Użytkownik</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
<div class="container">
  <a href="#"><img src="@/static/logo.png" class="img img-responsive" style="margin-top: 15px; margin-bottom: 20px;"></a>
</div>
<div class="container" id="button-container">
  <nuxt-link to="/"><button class="stdbutton">Home</button></nuxt-link>
  <nuxt-link to="/diveplaces"><button class="stdbutton">Diveplaces</button></nuxt-link>
  <nuxt-link to="/"><button class="stdbutton">Worldmap</button></nuxt-link>
</div>

  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
#button-container {
  margin-bottom: 20px;
}

button {
  border: none;
}

img {
    height: auto; 
    width: auto; 
    max-width: 350px; 
    max-height: 350px;
}

</style>