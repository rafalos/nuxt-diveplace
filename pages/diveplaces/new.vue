<template>
  <div class="container">
    <div v-if="step==1">
      <GmapMap
      :center="{lat: 52.96187505907603, lng: 20.7861328125}"
      :zoom="6"
      ref="mapRef"
      map-type-id="terrain"
      style="width: 100%; height: 500px">
        <GmapMarker
        :clickable="true"
        :draggable="false"/>
      </GmapMap>
      <button @click="step=2" class="stdbutton">Next</button>
    </div>

    <div v-if="step==2">
      <h4>2. Uzupełnij informacje o miejscu</h4>
      <div class='input-fields'> 
        <input id="nameField" type="text" class="input-line full-width" placeholder="Nazwa" name="name" autocomplete="off">
        <div id="numberContainer">
          <input class="input-line numberField" type="number" step="0.01" placeholder="Glebokosc max (m)" name="depth">
          <input class="input-line numberField" type="number" step="0.01" placeholder="Widocznosc (m)" name="sight">
          <input class="input-line numberField" type="number" step="0.01" placeholder="Wysokość n.p.m (m)" name="height">
          <input class="input-line numberField" type="number" step="0.01" placeholder="Powierzchnia">
        </div>
          <textarea class="descriptionField" cols="50" rows="8" name="description" placeholder="Opisz krótko swoje miejsce do nurkowania"></textarea>
        </div>  

      <button @click="step--" class="stdbutton">Prev</button>
      <button @click="step++" class="stdbutton">Next</button>
    </div>
    <div v-if="step==3">
      Step3
      <button @click="step--" class="stdbutton">Prev</button>
      <button @click="step++" class="stdbutton">Next</button>
    </div>
    <div v-if="step==4">
      Step4
      <button @click="step--" class="stdbutton">Prev</button>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: "authenticated",
    data() {
      return {
        step: 1
      }
    }
  }
</script>