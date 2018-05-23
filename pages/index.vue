<template>
<div class="container">
  <div class="whiteContainer">
    <div class="row">
      <div class="col-lg-3" style="border-right: 2px solid black;">
        <h3 class="text-center">Featured diveplace</h3>
        <h4 class="text-center">{{getRandomDiveplace.name}}</h4>
        <img class="img-thumbnail" :src="'http://res.cloudinary.com/hoahkzu0h/' + getRandomDiveplace.image[0]" alt="">
      </div>
      <div class="col-lg-9">
       <h3> Explore our {{ diveplaces.length }} diveplaces NOW! </h3>
      <div>
    <b-carousel id="carousel1"
      style="text-shadow: 1px 1px 2px #333;"
      controls
      indicators
      background="#ababab"
      :interval="7000"
      img-width="300"
      img-height="150"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      >

      <b-carousel-slide
      class="slideImg"
      v-for="diveplace in getRandomDiveplaces"
      :key="diveplace._id" 
      :caption="diveplace.name"
      text="Test description"
      :img-src="'http://res.cloudinary.com/hoahkzu0h/' + diveplace.image[0]">
    </b-carousel-slide>
    </b-carousel>

  </div>
      </div>  
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

  export default {
    data () {
    return {
      slide: 0,
      sliding: null
    }
  },
    asyncData() {
      return axios.get('http://localhost:3000/api/diveplaces')
      .then((response) => {
        console.log(response)
        return {
          diveplaces: response.data.foundDiveplace
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    computed: {
      getRandomDiveplace() {
        return this.diveplaces[Math.floor(Math.random() * this.diveplaces.length)]
      },
      getRandomDiveplaces() {
        return this.diveplaces.slice(0,5)
      }
    },
    methods: {

      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style scoped>
.slideImg {
  width: 100%;
  height: 250px;
}

</style>
