<template>
  <div class="filter-container">
    <div class="form-group">
      <label for="name">Name</label>
      <p>{{ searchIndicator }}</p>
      <input name="name" v-model="name" type="text" id="search-bar" class="form-control" autocomplete="off">
		</div>
    <div class="form-group">
      <label for="depth">Max. depth: <span id="depthValue">{{depth}}</span> m</label>
      <input name="depth" v-model="depth" type="range" min="1" max="150" style="width: 100%" @input="sendDepth($event)">
		</div>
    <div class="form-group">
      <label for="sight">Max. height: <span id="sightValue">{{sight}}</span> m</label>
      <input @input="sendSight($event)" name="sight" v-model="sight" class="slideRange" id="sightSlider" type="range" min="1" max="100" step="1" value="20" style="width: 100%">
		</div>
    <div class="form-group">
      <label for="country">Country</label>
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
        searchQueryIsDirty: false,
        isCalculating: false,
        name: "",
        depth: 50,
        sight: 50,
        country: ""
      } 
    },
    computed: {
        searchIndicator() {
          if (this.isCalculating) {
            return '⟳ searching' 
          } else if (this.searchQueryIsDirty) {
            return '⟳ searching'
          } else {
            this.$emit("nameChanged", this.name)  
          }
        }
      },
      watch: {
        name() {
          this.searchQueryIsDirty = true
          this.expensiveOperation()
        }
      },
    methods: {
      sendDepth(e) {
        this.$emit("depthChanged",this.depth)
      },
      sendSight(e) {
        this.$emit("sightChanged",this.sight)
      },
      expensiveOperation: _.debounce(function () {
          this.isCalculating = true
          setTimeout(function () {
            this.isCalculating = false
            this.searchQueryIsDirty = false
          }.bind(this), 400)
        }, 100)
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
