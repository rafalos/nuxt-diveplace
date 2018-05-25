<template>
  <nuxt-link :to="'/diveplaces/' + diveplace._id">
		<div class="row diveplace-column">
      <div class="image col-md-4 col-xs-6 content-column" style="padding:0">
        <img width="300" height="240" class="img img-responsive" :src="'http://res.cloudinary.com/hoahkzu0h/' + diveplace.image[0]" onerror="this.src='/img/nophoto.png';" >
      </div>
		  <div class="col-md-8 col-xs-6 content-column">
			  <h3 class="text-center head-text">{{diveplace.name}}</h3>
			    <div id="content-container">
            <h4>Kraj: {{diveplace.country}} </h4>
			      <h4>Głębokość maksymalna {{diveplace.depth}} m.</h4>
	          <span class="pull-right"> Dodał: </span>
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

.diveplace-box {
    border: 1px solid black;
    background: white;
  }

.diveplace-column {
	color: black;
  background: #F8F8F8;
  margin: 0px 0px 10px 0px;
  -webkit-box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
  -moz-box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
  box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
  transition: 0.2s;
  }

.diveplace-column:hover {
  background: #e9f3f5;
  }

.image {
   position: relative; 
   height: 165px;
   width: 200px;
   overflow: hidden;
}

</style>
