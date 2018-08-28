<template>
  <div class="container-fluid">
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
</template>

<script>
import axios from '@/plugins/axios'
import googleMapStyle from '@/assets/google-map-style'

export default {
    asyncData() {
      return axios.get('api/diveplaces')
      .then((response) => {
        console.log(response)
        let tab=[]
        response.data.foundDiveplace.forEach((diveplace)=>{
          tab.push({
            position: {lat: diveplace.lat, lng: diveplace.lng},
            title: diveplace.name,
            id: diveplace._id
          })
        })
        return {
          markers: tab
        };
      })
      .catch(function(error){
        console.log(error)
      })
    },
  data() {
    return {
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
   methods: {
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
   mounted() {
    this.$refs.mapRef.$forceUpdate()
   }
}
</script>
