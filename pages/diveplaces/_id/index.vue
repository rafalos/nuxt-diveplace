<template>
  <div class="container">
      <modal name="report" v-if="this.$store.state.auth !== null">
        <div style="padding: 10px">
        <h3 class="text-center">Report {{diveplace.name}}</h3>
        <input type="text" :value="this.$store.state.auth.user.username" readonly>
        <select class="form-control" v-model="report.reason">
          <option>Wrong data</option>
          <option>Offensive language</option>
          <option>Non exisiting place</option>
        </select>
        <div>
        <textarea class="form-control" v-model="report.description"></textarea>
        </div>
        <button class="stdbutton" @click="reportDiveplace(diveplace._id)">Submit</button>
        </div>
      </modal>

  <div class="row whiteContainer" style="padding: 0">
    <div class="col-md-6" style="padding: 0">
        <GmapMap
        :center="{lat: diveplace.lat, lng: diveplace.lng}"
        :zoom="11"
        map-type-id="terrain"
        style="width: 100%; height: 350px"
        :options="{styles: styles}">
        <GmapMarker
        :position="{lat: diveplace.lat, lng: diveplace.lng}"
        :title="diveplace.name"
        :clickable="true"
        :draggable="false"
        :icon="icon"/>
        </GmapMap>
    </div>
<div class="col-sm-6" style="padding: 0;">
  <div class="row">
    <div class="col-lg-12">
      <button class="boxButton float-right" @click="$modal.show('report')"><i class="fas fa-exclamation-triangle" title="Report this diveplace"></i></button>
      <button class="boxButton float-right"><i class="fas fa-thumbtack" title="I was there!"></i></button>
      <button class="boxButton float-right"><i class="fas fa-thumbs-up" title="I recommend it!"></i></button>
    </div>
  </div>
  <h2 class="text-center">{{diveplace.name}}</h2>
      <div style="padding: 20px; margin: 0" >
        <div class="row" id="details">
          <div class="col-sm-6" >
            <ul style="list-style: none">
             <li>Maximum sight: {{diveplace.sight}}</li>
             <li>Maximum depth: {{diveplace.depth}} m</li>
             <li>Surface: {{diveplace.surface}}</li>
             <li>Height: {{diveplace.height}} m</li>
            </ul>
          </div>
          <div class="col-sm-6">
            <ul>
              <li>Diving base: {{diveplace.base}}</li>
              <li>Coral: {{diveplace.coral}}</li>
              <li>Underwater wreck: {{diveplace.garbage}}</li>
              <li>Underwater road: {{diveplace.road}}</li>
            </ul>      
          </div>
        </div>
          <div class="row">
            <div id="containerFooter">
              <button class="stdbutton switchButton" @click="switchMode(1)">Details</button>
              <button class="stdbutton switchButton" @click="switchMode(2)">Gallery ({{diveplace.image.length}})</button>
              <button class="stdbutton switchButton" @click="switchMode(3)">Comments ({{diveplace.comments.length}})</button>
            </div>
          </div>
      </div>
  </div>
  </div>
  
  <div class="row whiteContainer" style="padding: 0">
    <div class="col-lg-12" style="padding: 0;">
      <Comments @commentAdded="updateData" :comments="diveplace.comments" v-if="mode==3"/>
      <Gallery :images="diveplace.image" v-if="mode==2"/>
      <Details :description="diveplace.description" v-if="mode==1"/>
    </div>
  </div>
</div>
</template>

<script>
  import axios from '@/plugins/axios'
  import Gallery from '@/components/diveplaces/show/Gallery'
  import googleMapStyle from '@/assets/google-map-style'
  import Comments from '@/components/diveplaces/show/Comments'
  import Details from '@/components/diveplaces/show/Details'

  export default {
    data() {
      return {
        mode: 2,
        report: {
          reason: '',
          description: ''
        },
        styles: googleMapStyle,
        icon: {
          url: 'https://image.ibb.co/eMmAWy/marker2.png',
          size: {width: 46, height: 46, f: 'px', b: 'px'},
          scaledSize: {width: 30, height: 50, f: 'px', b: 'px'}
        },
      }
    },
    asyncData(context) {
      return axios.get(`api/diveplaces/${context.route.params.id}`)
      .then((response) => {
        return {
          diveplace: response.data.foundDiveplace
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    components: {
      Gallery,
      Comments,
      Details
    },
    methods: {
      switchMode(param) {
        this.mode = param;
      },
      reportDiveplace(diveplace) {
          axios.post(`api/diveplaces/'${this.$route.params.id}/report`, {
            diveplaceId: diveplace,
            date: new Date(),
            author: this.$store.state.auth.user.username,
            reason: this.report.reason,
            description: this.report.description
          })
          .then((response) => {
          console.log("reported")
          this.$modal.hide('report')
        })
      },
      updateData() {
      axios.get(`api/diveplaces/${this.$route.params.id}`)
      .then((response) => {
        this.diveplace = response.data.foundDiveplace
      })
    }
    }
   
  }
</script>

<style scoped>
#containerFooter {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 0;
  padding-left: 15px;
}

.switchButton {
  margin: 5px;
  width: 30%;
}
 
</style>
