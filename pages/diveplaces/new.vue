<template>
  <div class="container">
    <div v-show="step==1" class="whiteContainer">
      <h3 class="text-center">Mark your diveplace on the map</h3>
      <GmapMap
      @click="placeMarker($event)"
      :center="{lat: 52.96187505907603, lng: 20.7861328125}"
      :zoom="6"
      ref="mapRef"
      map-type-id="terrain"
      style="width: 100%; height: 500px">
        <GmapMarker
        :clickable="true"
        :draggable="false"
        :position="marker"/>
      </GmapMap>
      <button @click="step=2" class="stdbutton">Next</button>
      {{marker.lat}} | {{marker.lng}} | {{country}}
    </div>

    <div v-show="step==2" class="whiteContainer">
      <h3 class="text-center">2. Complete diveplace details</h3>
      <div class="form-group">
        <label for="diveplaceName">Diveplace name</label>
        <input type="text" class="form-control" id="diveplaceName">
      </div>
      <div class="form-row">
        <div class="col">
          <input type="text" class="form-control" placeholder="Height">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Depth">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Surface">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Sight">
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button @click="step--" class="stdbutton">Prev</button>
      <button @click="step++" class="stdbutton">Next</button>
    </div>


    <div v-show="step==3" class="whiteContainer">
      <h3 class="text-center">3. Mark special attractions you can expect on your diveplace</h3>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="First">
        <label class="form-check-label" for="First">
          First
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="Second">
        <label class="form-check-label" for="Second">
          Second
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="Third">
        <label class="form-check-label" for="Third">
          Third
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="Fourth">
        <label class="form-check-label" for="Fourth">
          Fourth
        </label>
      </div>
      
      <button @click="step--" class="stdbutton">Prev</button>
      <button @click="step++" class="stdbutton">Next</button>
    </div>


    <div v-show="step==4" class="whiteContainer">
      <h3 class="text-center">4. Upload images of your diveplace</h3>
      <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true"></dropzone>
      <button @click="step--" class="stdbutton">Prev</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Dropzone from 'nuxt-dropzone'
  import 'nuxt-dropzone/dropzone.css'
  export default {
    middleware: "authenticated",
    data() {
      return {
        step: 1,
        marker: {
          lat:0,
          lng:0,
        },
        country:"",
        options:{
          url: "http://httpbin.org/anything"
        }
      }
    },
    mounted() {
      const instance = this.$refs.el.dropzone
    },
    methods: {
      placeMarker(e) {
        axios.get(`http://api.geonames.org/countryCodeJSON?lat=${e.latLng.lat()}&lng=${e.latLng.lng()}&username=rafalos`)
        .then((response) => {
          this.marker.lat = e.latLng.lat()
          this.marker.lng = e.latLng.lng()
          this.country = response.data.countryName
        })
      }
    },
    components: {
      Dropzone
    }
  }
</script>