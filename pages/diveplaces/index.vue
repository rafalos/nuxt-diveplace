<template>
 <div class="container-fluid">
   <div class="row">
     <div class="col-lg-3" style="padding-top: 12px;">
        <h2 class="text-center" style="color: white; padding: 0; margin: 0;"><i class="fas fa-level-up-alt fa-rotate-180"></i> Found {{diveplaces.length}} diveplaces</h2>
     </div>
     <div class="col-lg-9">
        <Filterbox style="margin-left: 5px;" @filterChanged="updateData"/>
     </div>
   </div>
    <div class="row">
      <div class="col-lg-3 sticky" style="padding-right: 0;">
           <div id="loading" v-if="loader==1">
        <div class="loader"></div>
      </div>
        <div v-else-if="diveplaces.length==0">
          <h3 class="whiteContainer">No diveplaces found matching your search criteria</h3>
        </div>
        <Listitem v-else v-for="diveplace in diveplaces" :key="diveplace._id" :diveplace="diveplace" @click.native="toggleDescription(diveplace)"/>
      </div>  
      <div class="col-lg-9">
      <div class="desc" v-if="descOpen" style="background:rgba(255,255,255, 0.2); height: 800px; color: white; border-radius: 25px; padding: 10px;">
        <i class="fas fa-arrow-left" style="cursor: pointer;" @click="closeDescription"></i>
        <h1 class="text-center">{{descDiveplace.name}}</h1>
        <h1 class="text-center"><i class="fas fa-heart"></i> <i class="fas fa-thumbtack"></i><i class="fas fa-exclamation-circle"></i></h1>
      <button class="whiteButton descButton" style="border-radius: 25px 0px 0px 25px">Description</button>
      <button class="whiteButton descButton">Gallery</button>
      <button class="whiteButton descButton" style="border-right: 2px solid white; border-radius: 0px 25px 25px 0px">Comments</button>

        <Gallery :images="descDiveplace.image"/>

      </div>
      <div id="gmap" v-if="mapOpen">
    <GmapMap
    :center="center"
    :zoom="6"
    ref="mapRef"
    map-type-id="terrain"
    style="width: 100%; height: 800px"
    :options="{styles: styles}"
    >
    <GmapInfoWindow :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <nuxt-link :to="'/diveplaces/' + infoContent.id">{{infoContent.title}}</nuxt-link>
    </GmapInfoWindow>

    <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :title="m.title"
    :clickable="true"
    :draggable="false"
    :icon="icon"
    @click="toggleInfoWindow(m,index)"
    />
    </GmapMap>   
    </div>
    </div>
      </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import Listitem from '@/components/diveplaces/Listitem'
import Filterbox from '@/components/diveplaces/Filterbox'
import googleMapStyle from '@/assets/google-map-style'
import Gallery from '@/components/diveplaces/show/Gallery'

  export default {
    data() {
      return {
        descOpen: false,
        descDiveplace: null,
        mapOpen: true,
        showDiveplaces: 1,
        loader: 0,
        search: '',
        depth: 50,
        sight: 50,
        center: { lat: 52.237049, lng: 21.017532 },
      places: [],
      icon: {
        url: 'https://image.ibb.co/eMmAWy/marker2.png',
        size: {width: 46, height: 46, f: 'px', b: 'px'},
        scaledSize: {width: 30, height: 50, f: 'px', b: 'px'}
      },
      styles: googleMapStyle,
      currentPlace: null,
      infoContent: '',
      infoWindowPos: {
            lat: 0,
            lng: 0
      },
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: -7,
          height: -35
        }
      }
      }
    },
    asyncData() {
      return axios.get('api/diveplaces')
      .then((response) => {
        let tab=[]
        response.data.foundDiveplace.forEach((diveplace)=>{
          tab.push({
            position: {lat: diveplace.lat, lng: diveplace.lng},
            title: diveplace.name,
            id: diveplace._id
          })
        })
        return {
          diveplaces: response.data.foundDiveplace,
          markers: tab
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    methods: {
      toggleDescription(diveplace) {
        this.mapOpen = false
        this.descOpen = true
        console.log(diveplace)
        this.descDiveplace = diveplace
      },
      closeDescription() {
        this.mapOpen = true
        this.descOpen = false
      },
      updateData(name, depth, sight) {
        this.loader = 1
         axios.post('api/diveplaces/search', 
         {
           name: name,
           depth: depth,
           sight: sight
          })
        .then((response)=> {
          let tab=[]
        response.data.foundDiveplace.forEach((diveplace)=>{
          tab.push({
            position: {lat: diveplace.lat, lng: diveplace.lng},
            title: diveplace.name,
            id: diveplace._id
          })
        })
          this.diveplaces = response.data.foundDiveplace;
          this.loader= 0
          this.markers = tab;
        })
      },
      toggleInfoWindow(marker, idx) {
    this.infoWindowPos = marker.position;
    this.infoContent = {
      title: marker.title,
      id: marker.id
    }
    if (this.currentMidx == idx) {
      this.infoWinOpen = !this.infoWinOpen;
      }
    else {
      this.infoWinOpen = true;
      this.currentMidx = idx;
      }
    }
    },
    components: {
      Listitem,
      Filterbox,
      Gallery
    },
    mounted() {
    if(this.mapOpen){
      this.$refs.mapRef.$forceUpdate()
    }
    
   }
  }
</script>

<style scoped>
  #loading {
  margin-left: 100px;
  position: relative;
  bottom: 50;
  left: 50;
  z-index: 999;
  }
  .sticky {
    height:800px;
    overflow-y: scroll;
  }
  
  .fas {
    margin-right: 20px;
    cursor: pointer;
  }

  .fas:hover {
    border-bottom: 4px solid white;
  }

  .descButton {
    border-right: none;
    border-radius: 0;
    width: 33.3%;
    margin: 0;
  }
</style>
