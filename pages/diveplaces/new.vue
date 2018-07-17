<template>
  <div class="container">
    <div class="progress">
      <div class="progress-bar" role="progressbar" :style="{width: progress +'%'}" style="background: #143D61;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
        <span class="text-center font-weight-bold" style="color-white">{{progress}}</span>
      </div>
    </div>
     
    <div v-show="step==1" class="whiteContainer">
      <h3 class="text-center">1. Mark your diveplace on the map</h3>
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
      <button @click="stepUp" class="stdbutton">Next</button>
      {{marker.lat}} | {{marker.lng}} | {{diveplace.country}}
    </div>

    <div v-show="step==2" class="whiteContainer">
      <h3 class="text-center">2. Complete diveplace details</h3>
      <div class="form-group">
        <label for="diveplaceName">Diveplace name</label>
        <input type="text" class="form-control" id="diveplaceName" v-model="diveplace.name">
      </div>
      <div class="form-row">
        <div class="col">
          <input type="text" class="form-control" placeholder="Height" v-model="diveplace.height">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Depth" v-model="diveplace.depth">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Surface" v-model="diveplace.surface">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Sight" v-model="diveplace.sight">
        </div>
      </div>
      <div class="form-group">
        <label for="diveplaceDescription">Description</label>
        <textarea class="form-control" id="diveplaceDescription" v-model="diveplace.description" rows="3"></textarea>
      </div>
      <button @click="stepDown" class="stdbutton">Prev</button>
      <button @click="stepUp" class="stdbutton">Next</button>
    </div>


    <div v-show="step==3" class="whiteContainer">
      <h3 class="text-center">3. Mark special attractions you can expect on your diveplace</h3>
      <div class="form-check">
        <input class="form-check-input" v-model="diveplace.coral" type="checkbox" value="" id="coral">
        <label class="form-check-label" for="coral">
          Coral
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" v-model="diveplace.base" type="checkbox" value="" id="base">
        <label class="form-check-label" for="base">
          Diving base
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" v-model="diveplace.wreck" type="checkbox" value="" id="wreck">
        <label class="form-check-label" for="wreck">
          Underwater wreck
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" v-model="diveplace.road" type="checkbox" value="" id="road">
        <label class="form-check-label" for="road">
          Underwater road
        </label>
      </div>
      
      <button @click="stepDown" class="stdbutton">Prev</button>
      <button @click="stepUp" class="stdbutton">Next</button>
    </div>


    <div v-show="step==4" class="whiteContainer" >
      {{diveplace.images}}
      <h3 class="text-center">4. Upload images of your diveplace</h3>
      <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true" @vdropzone-files-added="processFiles($event)"></dropzone>
      <button @click="stepDown" class="stdbutton">Prev</button>
      <button @click="createDiveplace" class="stdbutton">Create</button>
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
        progress: 0,
        marker: {
          lat:0,
          lng:0,
        },
        diveplace: {
          country: '',
          name: '',
          height: '',
          depth: '',
          surface: '',
          sight: '',
          description: '',
          coral: false,
          base: false,
          wreck: false,
          road: false,
          images: []
        },
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
          this.diveplace.country = response.data.countryName
        })
      },
      stepUp() {
        this.step++
        this.progress+=25
      },
      stepDown() {
        this.step--
        this.progress-=25
      },
      createDiveplace() {
        this.step=5;
        this.progress=100;
      },
      processFiles(files, event) {
         console.log(files, event)
      }
    },
    components: {
      Dropzone
    }
  }
</script>