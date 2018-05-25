<template>
  <div>
    <nuxt-link :to="'/diveplaces/' + contents._id">
      <img class="img-thumbnail" :src="'http://res.cloudinary.com/hoahkzu0h/' + contents.image[0]" alt="">
      <div class="caption">
        <p class="text-center">{{contents.name}}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['contents']
  }
</script>

<style scoped>
  a {
    color: white;
  }
</style>
