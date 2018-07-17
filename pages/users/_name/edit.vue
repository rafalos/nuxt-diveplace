<template>
  <div class="container">
    <div class="whiteContainer" style="padding: 50px;">
      <h1 class="text-center">Settings</h1>
      <div class="row">
        <div class="col-lg-4">
          <img id="userAvatar" class="img img-responsive" src="http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png">
        </div>
        <div class="col-lg-8">
          <input type="text" class="input-line" placeholder="First Name">
          <input type="text" class="input-line" placeholder="Second Name">
          <input type="text" class="input-line" placeholder="Certificate Number">
          Change password Change email
          <h4>Privacy settings</h4> 
        </div>
      </div>
      <button class="stdbutton align-right">Update</button>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: ["authenticated", "isthatyou"]
  }
</script>