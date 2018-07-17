<template>
  <div class="filter-container">
    <div class="form-group">
      <label for="name">Nazwa</label>
      <input name="name" v-model="name" type="text" id="search-bar" class="form-control" autocomplete="off" @keyup="sendName($event)">
		</div>
    <div class="form-group">
      <label for="depth">Max. głębokość: <span id="depthValue">{{depth}}</span> m</label>
      <input name="depth" v-model="depth" type="range" min="1" max="150" style="width: 100%" @input="sendDepth($event)">
		</div>
    <div class="form-group">
      <label for="sight">Min. Widoczność: <span id="sightValue">{{sight}}</span> m</label>
      <input @input="sendSight($event)" name="sight" v-model="sight" class="slideRange" id="sightSlider" type="range" min="1" max="100" step="1" value="20" style="width: 100%">
		</div>
    <div class="form-group">
      <label for="country">Kraj</label>
      <select v-model="country" name="country" class="form-control input-field" id="countryField">
        <option>test</option>
      </select>
		</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: "",
        depth: 50,
        sight: 50,
        country: ""
      } 
    },
    methods: {
      sendName(e) {
        this.$emit("nameChanged",e.target.value)
      },
      sendDepth(e) {
        this.$emit("depthChanged",e.target.value)
      },
      sendSight(e) {
        this.$emit("sightChanged",e.target.value)
      }
    }
  }
</script>

<style scoped>
.filter-container {
  font-family: Roboto;
  background: #143D61; 
  color: white; 
  padding: 10px; 
}

#submit-button {
  background: #466FA2;
  border: none;
  border-radius: 0;
}
</style>
