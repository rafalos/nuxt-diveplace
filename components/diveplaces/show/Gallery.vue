<template>
<div>
  <img @click="showImage($event)" v-for="image in images" :key="image" class="img-thumbnail image" :src="`http://res.cloudinary.com/hoahkzu0h/${image}`" style="height: 200px;">   
</div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: ['images'],
    methods: {
      showImage(e) {
        window.open(e.target.src);
      }
    }
  }
</script>

<style scoped>
  .image:hover {
    cursor: pointer;
    border: 1px solid black;
    opacity: 0.8;
  }
</style>

