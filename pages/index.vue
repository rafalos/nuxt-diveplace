<template>
<div class="container">
  <div class="whiteContainer">
    <div class="row">
      <div class="col-lg-3" style="border-right: 1px solid lightgrey; background: #143D61; color: white; padding: 10px;">
        <h3 class="text-center">Featured diveplace</h3>
        <img class="img-thumbnail" :src="'http://res.cloudinary.com/hoahkzu0h/' + getRandomDiveplace.image[0]" alt="">
        <div class="caption">
        <p class="text-center">{{getRandomDiveplace.name}}</p>
        </div>
      </div>
      <div class="col-lg-9" style="padding: 10px;">
       <h3> {{ diveplaces.length }} diveplaces wait for you to <nuxt-link to="/diveplaces">explore!</nuxt-link> </h3>
       <hr>
       <h3>Most recently added diveplaces:</h3>
       <div class="row">
        <div v-for="diveplace in getRandomDiveplaces" :key="diveplace._id" class="col-lg-3 recent-diveplace">
          <img :src="'http://res.cloudinary.com/hoahkzu0h/' + diveplace.image[0]" class="img recent-img img-responsive ">
          <h5 class="text-center">{{diveplace.name}}</h5>
        </div>
       </div>
       <hr>
       <h3>Trending now</h3>
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
      :text="diveplace.country"
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
        return this.diveplaces.slice(0,4)
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
  height: 210px;
}
.recent-img {
  width: 100%;
  height: 120px;
}

a:hover {
  text-decoration: none;
}

</style>
