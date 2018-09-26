<template>
<div>
  <div class="row" style="color: white">
  <div class="col-lg-6">
    
  </div>
    <div class="col-lg-6" style="padding-top: 100px;">
      <img src="@/static/map.png" class="img img-responsive" style="width: 70%; margin-bottom: 50px;">
      <h1>Discover thousands of diving places around.</h1>
      <h2>Explore the world with <b>diveplace!</b></h2>
      <nuxt-link to="/account"><button style="margin-top: 10px;" class="whiteButton">Join us</button></nuxt-link>
      <nuxt-link to="/diveplaces"><button style="margin-top: 10px;" class="whiteButton">Explore now</button></nuxt-link>
    </div>
  </div>
  
</div>


</template>

<script>

  export default {
    layout: "blank"
  }
</script>

<style scoped>
  #main:after {
    background-image: url('https://image.ibb.co/kjAucp/pexels_photo_137612.jpg');
  }

  .whiteButton {
    font-size: 21px;
  }
</style>
