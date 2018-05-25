<template>
  <div class="row">
    <nuxt-link :to="'/diveplaces/' + item._id" v-for="item in contents" :key="item._id" class="col-lg-3 recent-diveplace">
      <img :src="'http://res.cloudinary.com/hoahkzu0h/' + item.image[0]" class="img recent-img img-responsive ">
      <h5 class="text-center">{{item.name}}</h5>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['contents']
  }
</script>

<style scoped>
.recent-img {
  width: 100%;
  height: 120px;
}

.recent-diveplace {
  border: 1px solid lightgrey;
  padding: 15px;
}

</style>
