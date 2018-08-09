<template>
  <div class="container">
    <div class="whiteContainer" style="padding: 50px;">
      <h1 class="text-center">Settings</h1>
      <div class="row">
        <div class="col-lg-4">
          <dropzone @vdropzone-file-added="uploadAvatar($event)" id="foo" ref="el" :options="options" :destroyDropzone="true" :style=" `background-image:url(http://res.cloudinary.com/hoahkzu0h/${fetchUser.avatar[0]}`">
          </dropzone>
        </div>
        <div class="col-lg-8">
          <input type="text" class="input-line" placeholder="First Name" :value="fetchUser.firstName">
          <input type="text" class="input-line" placeholder="Second Name" :value="fetchUser.lastName">
          <input type="text" class="input-line" placeholder="Certificate Number" :value="fetchUser.certNumber">
          <h5 class="empw">Change password</h5><h5 class="empw">Change email</h5>
          <h4 class="empw">Privacy settings <i class="fas fa-arrow-down"></i></h4>
          <div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1">
                Display my name
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1">
                Display my calculations
              </label>
            </div>
              <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1">
                Display my certification number
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1">
                Display my visited diveplaces
              </label>
            </div>
          </div>
          <button class="stdbutton float-right" @click="updateData">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import Dropzone from 'nuxt-dropzone'
  export default {
    data() {
      return {
        options: {
          maxFiles: 1,
          url: "http://httpbin.org/anything",
          createImageThumbnails: false
        }
      }
    },
    computed: {
      fetchUser() {
        return this.$store.state.auth.user
      }
    },
    mounted() {
      const instance = this.$refs.el.dropzone
    },
    middleware: ["authenticated", "isthatyou"],
    components: {
      Dropzone
    },
    methods: {
      updateData() {
        console.log("clicked")
      },
      uploadAvatar(file, event) {
        var formData = new FormData();
        formData.append('images', file);
        axios.post(`api/users/${this.$route.params.name}/avatar`, formData)
        .then((response) => {
          this.$store.dispatch('updateUser', response.data)
        })
      }
    }
  }
</script>

<style scoped>
.dropzone {
  height: 250px;
  width: 250px;
  border-radius: 100%;
  font-size: 0px;
  background-size: 250px 250px;
}

.dropzone:hover {
  opacity: 0.7;
  cursor: pointer;
}

.empw {
  margin: 8px;
}

.form-check {
  margin-left: 15px;
}
</style>