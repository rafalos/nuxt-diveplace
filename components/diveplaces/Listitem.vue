<template>
  <nuxt-link :to="'/diveplaces/' + diveplace._id">
		<div class="row diveplace-column">
      <div class="image col-md-12 content-column" style="padding:0">
        <img class="img img-responsive" :src="'http://res.cloudinary.com/hoahkzu0h/' + diveplace.image[0]" onerror="this.src='/img/nophoto.png';" >
        <div class="desc">
        <h5>{{diveplace.name}}</h5>
        </div>
      </div>
      	
		</div>
	</nuxt-link>
</template>

<script>
  export default {
    props: ['diveplace']
  }
</script>

<style scoped>
.img {
  position: relative;
}
.desc {
  float: left;
   position: absolute;
   width: 100%;
   left: 0px;
   top: 220px;
   z-index: 1000;
   background: rgba(0, 0, 0, 0.6);
   padding: 5px;
   color: #FFFFFF;
   font-weight: bold;
}


.diveplace-box {
    background: white;
  }

.diveplace-column {
	color: black;
  background: white;
  height: 250px;
  margin: 0px 0px 10px 0px;
  -webkit-box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
  -moz-box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
  box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
  transition: 0.2s;
  position: relative;
  }

.diveplace-column:hover {
  opacity: 0.8;
  }

.image {
   position: relative;
   width: 100%;
   overflow: hidden;
}

</style>
