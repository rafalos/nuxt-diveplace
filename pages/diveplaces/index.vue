<template>
 <div class="container-fluid">
   <div class="row">
     <div class="col-lg-3" style="padding-top: 12px;">
        <h4 class="text-center" style="color: white; padding: 0; margin: 0;"><i class="fas fa-level-up-alt fa-rotate-180"></i> Found {{diveplaces.length}} diveplaces</h4>
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
        <Listitem class="listItem" v-else v-for="(diveplace, index) in diveplaces" @mouseover.native="centerMap(diveplace.lat, diveplace.lng, index)" @mouseleave.native="clearAnimation(diveplace.lat, diveplace.lng, index)" :key="diveplace._id" :diveplace="diveplace" @click.native="toggleDescription(diveplace._id)"/>
      </div>  
      <div class="col-lg-9">
        <modal name="report" v-if="this.fetchUser !== null">
        <div style="padding: 50px;">
        <h3>Report </h3>
        <input type="text" :value="fetchUser.email" readonly style="display: block;">
        <select type="text" style="display: block;" v-model="reportData.reason">
          <option>Wrong data</option>
          <option>Offensive language</option>
          <option>Non exisiting place</option>
        </select>
        <textarea type="text" style="display: block;" v-model="reportData.description"></textarea>
            <button class="stdbutton" @click="report(descDiveplace._id)">Submit</button>
            </div>
        </modal>
      <div class="desc" v-if="descOpen" style="background:rgba(255,255,255, 0.17); height: 800px; color: white; border-radius: 25px; padding: 10px;">
        <i class="fas fa-arrow-left" style="cursor: pointer;" @click="closeDescription"></i><i @click="$modal.show('report')" v-if="fetchUser !== null" class="float-right fas fa-exclamation-circle" v-b-modal.myModal></i>
        <h1 class="text-center">{{descDiveplace.name}}</h1>
        <h2 v-if="fetchUser !== null" class="text-center"><i class="fas fa-heart" @click="like(descDiveplace._id)"></i><span>{{descDiveplace.liked.length}}</span> <i class="fas fa-map-marker" @click="wasThere(descDiveplace._id)"></i><span>{{descDiveplace.visited.length}}</span></h2>
      <button class="whiteButton descButton" @click="descMode=1" :class="{'descButtonActive':descMode==1}" style="border-radius: 25px 0px 0px 25px">Description</button>
      <button class="whiteButton descButton" @click="descMode=2" :class="{'descButtonActive':descMode==2}" >Gallery ({{descDiveplace.image.length}}) </button>
      <button class="whiteButton descButton" @click="descMode=3" :class="{'descButtonActive':descMode==3}" style="border-right: 2px solid white; border-radius: 0px 25px 25px 0px">Comments ({{descDiveplace.comments.length}}) </button>
      <div id="descBox" class="detailsBox sticky" v-if="descMode==1">
        <p>{{descDiveplace.description}}</p>
      </div>
       <div id="galleryBox" class="detailsBox sticky" v-if="descMode==2">
        <Gallery :images="descDiveplace.image"/>
      </div>
       <div id="commentBox" class="detailsBox sticky" v-if="descMode==3">
        <Comments @commentAdded="updateSingleData" :diveplaceID="descDiveplace._id" :comments="descDiveplace.comments"/>
      </div>
      </div>
      <div id="gmap" v-if="mapOpen">
    <GmapMap
    :center="center"
    :zoom="6"
    ref="mapRef"
    map-type-id="terrain"
    style="width: 100%; height: 800px"
    :options="{
      styles: styles,
      disableDefaultUI: true
    }"
    >
    <GmapInfoWindow :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <h6 style="cursor: pointer;" @click="toggleDescription(infoContent.id)" >{{infoContent.title}}</h6>
    </GmapInfoWindow>

    <GmapMarker
    :key="index"
    v-for="(m, index) in diveplaces"
    :position="{lat: m.lat, lng: m.lng}"
    :title="m.name"
    :clickable="true"
    :draggable="false"
    :icon="icon"
    ref="markers"
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
import Comments from '@/components/diveplaces/show/Comments'

  export default {
    data() {
      return {
        reportData: {
          author: '',
          reason: '',
          description: ''
        },
        descMode: 2,
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
    computed: {
      fetchUser() {
        return this.$store.getters.userData
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
      like(diveplaceID){
        let username = this.fetchUser.username
        axios.post(`api/diveplaces/${diveplaceID}/like`, {
          username: username
        })
        .then((response) => {
          if(response.data.success){
            console.log(response.data)
            this.descDiveplace = response.data.diveplace
          }
          else {
            alert(response.data.message)
          }
          
        })
      },
      wasThere(diveplaceID) {
        let username = this.fetchUser.username
        axios.post(`api/diveplaces/${diveplaceID}/visited`, {
          username: username
        })
        .then((response) => {
          if(response.data.success){
            console.log(response.data)
            this.descDiveplace = response.data.diveplace
          }
          else {
            alert(response.data.message)
          }
          
        })
      },
      report(diveplaceID){
        axios.post(`api/diveplaces/${diveplaceID}/report`, {
          author: this.$store.getters.userData.email,
          reason: this.reportData.reason,
          description: this.reportData.description
        }).then((response) => {
          console.log(response.data.message)
        })
      },
      centerMap(lat, lng, index) {
        if(this.mapOpen){
        this.$refs.markers[index].$markerObject.setAnimation(google.maps.Animation.BOUNCE)
        this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({lat: lat, lng: lng})
          })
        }
      },
      clearAnimation(lat, lng, index) {
        if(this.mapOpen){
        if(this.$refs.markers[index] !== index) {
          this.$refs.markers[index].$markerObject.setAnimation(null)
        }
        }
      },
      toggleDescription(diveplace) {
        axios.get(`api/diveplaces/${diveplace}`)
      .then((response) => {
        this.descDiveplace = response.data.foundDiveplace
        this.descMode = 2;
        this.mapOpen = false
        this.descOpen = true
      })
      .catch(function(error){
        console.log(error)
      })
        
      },
      closeDescription() {
        this.mapOpen = true
        this.descOpen = false
      },
      updateSingleData(data) {
        console.log(data)
        this.descDiveplace = data
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
    this.infoWindowPos = {lat: marker.lat, lng: marker.lng};
    this.infoContent = {
      title: marker.name,
      id: marker._id
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
      Gallery,
      Comments
    },
    mounted() {
    if(this.mapOpen){
      this.$refs.mapRef.$forceUpdate()
    }
    
   }
  }
</script>

<style scoped>
  span {
    margin-right: 10px;
  },
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
    overflow: scroll
  }
  
  .fas {
    margin-right: 5px;
    cursor: pointer;
    transition: 0.2s;
  }

  .fas:hover {
    font-size: 1.1em;
  }

  .descButton {
    border-right: none;
    border-radius: 0;
    width: 33.3%;
    margin: 0;
  }

  .descButtonActive {
    background: white;
    color: #283BED;
  }

  .detailsBox {
    color: black;
    background: white;
    opacity: 0.9;
    height: 550px;;
    margin: 20px;
    padding: 30px;
    -webkit-box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
    -moz-box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
    box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
    }

  #descBox {
    font-size: 1.2em;
  }

  .listItem:hover {
    cursor: pointer
  }
</style>
