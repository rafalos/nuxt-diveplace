<template>
  <div class="container-fluid">
    <div class="progress" style="border: 1px solid white; height: 30px;">
      <div class="progress-bar" role="progressbar" :style="{width: progress +'%'}" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
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
      <button @click="stepUp" class="whiteButton">Next</button>
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
      <h3 class="text-center">4. Upload images of your diveplace</h3>
      <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true" @vdropzone-files-added="processFiles($event)"></dropzone>
      <button @click="stepDown" class="stdbutton">Prev</button>
      <button @click="createDiveplace" class="stdbutton">Create</button>
    </div>
      <div id="loading" v-if="loader==1">
        <h1 class="text-center">{{infoMessage}}</h1>
        <div class="loader"></div>
      </div>
  </div>
</template>

<script>
  import axios from '@/plugins/axios'
  import Dropzone from 'nuxt-dropzone'
  import 'nuxt-dropzone/dropzone.css'
  export default {
    middleware: "authenticated",
    data() {
      return {
        infoMessage: '',
        loader: 0,
        files: [],
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
          lat: 0,
          lng: 0
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
        var vm = this;
        this.infoMessage = "Creating diveplace in progress"
        this.loader = 1;
        this.diveplace.lat = this.marker.lat
        this.diveplace.lng = this.marker.lng
        this.step=5;
        this.progress=100;
        var formData = new FormData();
        for(let i=0; i<this.files.length; i++) {
          formData.append('images', this.files[i]);
        }
        axios.post("api/diveplaces", this.diveplace)
        .then((response)=>{
          axios.post(`api/diveplaces/${response.data.createdDiveplace._id}/images`, formData)
          .then( (response) => {
             this.infoMessage = "Diveplace submitted. Wait for review"
            console.log("photos created")
          vm.$router.push("/diveplaces")
        })
        })

      },
      processFiles(files, event) {
         this.files = files
      }
    },
    components: {
      Dropzone
    }
  }
</script>


<style>
  .whiteContainer {
    background: none;
    color: white;
    border-radius: 0;
  }
  .progress-bar {
    background: rgba(44,49,248,1);
background: -moz-linear-gradient(45deg, rgba(44,49,248,1) 0%, rgba(44,49,248,1) 1%, rgba(44,49,248,1) 12%, rgba(44,49,248,1) 22%, rgba(169,134,247,1) 95%, rgba(169,134,247,1) 100%);
background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(44,49,248,1)), color-stop(1%, rgba(44,49,248,1)), color-stop(12%, rgba(44,49,248,1)), color-stop(22%, rgba(44,49,248,1)), color-stop(95%, rgba(169,134,247,1)), color-stop(100%, rgba(169,134,247,1)));
background: -webkit-linear-gradient(45deg, rgba(44,49,248,1) 0%, rgba(44,49,248,1) 1%, rgba(44,49,248,1) 12%, rgba(44,49,248,1) 22%, rgba(169,134,247,1) 95%, rgba(169,134,247,1) 100%);
background: -o-linear-gradient(45deg, rgba(44,49,248,1) 0%, rgba(44,49,248,1) 1%, rgba(44,49,248,1) 12%, rgba(44,49,248,1) 22%, rgba(169,134,247,1) 95%, rgba(169,134,247,1) 100%);
background: -ms-linear-gradient(45deg, rgba(44,49,248,1) 0%, rgba(44,49,248,1) 1%, rgba(44,49,248,1) 12%, rgba(44,49,248,1) 22%, rgba(169,134,247,1) 95%, rgba(169,134,247,1) 100%);
background: linear-gradient(45deg, rgba(44,49,248,1) 0%, rgba(44,49,248,1) 1%, rgba(44,49,248,1) 12%, rgba(44,49,248,1) 22%, rgba(169,134,247,1) 95%, rgba(169,134,247,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2c31f8', endColorstr='#a986f7', GradientType=1 );
  }
</style>