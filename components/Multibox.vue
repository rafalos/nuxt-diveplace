<template>
  <div class="row recent-container">
    <div v-for="item in contents" :key="item._id" class="col-lg-3" style="padding: 5px">
      <nuxt-link :to="'/diveplaces/' + item._id">
      <div class="recent-diveplace">
        <img :src="'http://res.cloudinary.com/hoahkzu0h/' + item.image[0]" class="img recent-img img-responsive ">
        <h5 class="text-center">{{item.name}}</h5>
      </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['contents']
  }
</script>

<style scoped>
.recent-container {
  width: 100%; 
  margin: 0 auto;
}

.recent-img {
  width: 100%;
  height: 120px;
}

.recent-diveplace {
  border: 1px solid lightgrey;
  padding: 5px;
  width: 100%;
}

</style>