<template>
  <div class="filter-container">
    <div class="form-row">
    <div class="form-group col-lg-4">
      <p>{{ searchIndicator }}</p>
      <input name="name" v-model="name" type="text" id="search-bar" class="form-control input-line" placeholder="name" autocomplete="off">
		</div>
    <div class="form-group col-lg-4">
      <label for="depth">Max. depth: <span id="depthValue">{{depth}}</span> m</label>
      <input name="depth" v-model="depth" type="range" min="1" max="150" style="width: 100%">
		</div>
    <div class="form-group col-lg-4">
      <label for="sight">Max. sight: <span id="sightValue">{{sight}}</span> m</label>
      <input name="sight" v-model="sight" class="slideRange" id="sightSlider" type="range" min="1" max="100" step="1" value="20" style="width: 100%">
		</div>
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
            this.$emit("filterChanged", this.name, parseInt(this.depth), parseInt(this.sight))
          }
        }
      },
      watch: {
        name() {
          this.searchQueryIsDirty = true
          this.expensiveOperation()
        },
        depth() {
          this.searchQueryIsDirty = true
          this.expensiveOperation()
        },
        sight() {
          this.searchQueryIsDirty = true
          this.expensiveOperation()
        },
      },
    methods: {
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
  background: none;
  color: white; 
}

#submit-button {
  background: #466FA2;
  border: none;
  border-radius: 0;
}
</style>
