<template>
<div class="gallery">
  <div class="img-c" @click="showImage($event)" v-for="image in images" :key="image">
  <div class="img-w">
    <img :src="`http://res.cloudinary.com/hoahkzu0h/${image}`">
  </div>
  </div>   
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
  
.gallery {
  overflow: hidden;
}
.img-c {
  width: 220px;
  height: 220px;
  float: left;
  position: relative;
  overflow: hidden;
  margin: 5px;
}

.img-w {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: transform ease-in-out 300ms;
}

.img-c {
    transition: width ease 400ms, height ease 350ms, left cubic-bezier(0.4, 0, 0.2, 1) 420ms, top cubic-bezier(0.4, 0, 0.2, 1) 420ms;
}

.img-c:hover .img-w {
  transform: scale(1.08);
  transition: transform cubic-bezier(0.4, 0, 0.2, 1) 450ms;
}

.img-c.active {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  z-index: 2;
  //transform: translateX(-50%);
}

.img-c.postactive {
  position: absolute;
  z-index: 2;
  pointer-events: none;
}

.img-c.active.positioned {
  left: 0 !important;
  top: 0 !important;
  transition-delay: 50ms;
}



  
</style>

