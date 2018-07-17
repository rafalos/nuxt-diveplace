<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
   	    <div class="whiteContainer">
           <h4>{{diveplace.name}}</h4>
        </div>
   	  </div>
    </div>
  <div class="row">
    <div class="col-md-6">
      <div class="whiteContainer" style="padding: 0">
        <GmapMap
        :center="{lat: diveplace.lat, lng: diveplace.lng}"
        :zoom="11"
        map-type-id="terrain"
        style="width: 100%; height: 350px">
        <GmapMarker
        :position="{lat: diveplace.lat, lng: diveplace.lng}"
        :title="diveplace.name"
        :clickable="true"
        :draggable="false"/>
        </GmapMap>
      </div>
    </div>
    
    <div class="col-md-6">
      <Gallery :images="diveplace.image" />
    </div>
  </div>
  
  <div class="row">
    <div class="col-sm-6">
      <div class="whiteContainer" style="padding: 20px;">
        <div class="row" id="details">
          <div class="col-sm-6">
            <ul>
             <li>Widoczność</li>
             <li>Max. głębokość</li>
             <li>Powierzchnia</li>
             <li>Wysokość</li>
            </ul>
          </div>
          <div class="col-sm-6">
            <ul>
              <li>Baza nurkowa</li>
              <li>Koralowiec</li>
              <li>Zatopiony wrak:</li>
              <li>Tor podwodny:</li>
            </ul>      
          </div>
        </div>
          <div class="row">
            <div class="col=lg-12">
              <p>{{diveplace.description}}</p>
            </div>
          </div>
      </div>
    </div>

    <div class="col-sm-6">
      <div class="whiteContainer">
      <div class="comment-section">
            <div id="input-container">
             <div class="form-group">
               <textarea class="descriptionField" cols="40" rows ="1" name="comment[text]" placeholder="Napisz swoją opinię"></textarea></div>
            </div>
             <div class="form-group">
               <button class="stdbutton">Dodaj</button>
             </div>
            <div style="padding: 10px;">
              <hr>
              <div class="row comment-box" >
              <div class="col-md-12 single-comment-box ">
                <strong style="font-size: 16px;">Author napisał/a:</strong>
                <span class="pull-right">Data</span>
                <p class="normal comment-text">Text</p>
              </div>
              </div>
            </div>
      </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Gallery from '@/components/diveplaces/show/Gallery'

  export default {

    asyncData(context) {
      return axios.get('http://localhost:3000/api/diveplaces/' + context.route.params.id )
      .then((response) => {
        console.log(response)
        return {
          diveplace: response.data.foundDiveplace
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    components: {
      Gallery
    }
  }
</script>
