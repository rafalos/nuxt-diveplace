<template>
  <div id="main">
    <Header />
    <nuxt/>
  </div>
</template>

<script>
import Header from "@/components/admin/Header"
  export default {
    components: {
      Header
    }
  }
</script>

<style>
a:hover {
  text-decoration: none;
}

a {
  color: black;
}


html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after
{
  box-sizing: border-box;
  margin: 0;
}
.button--green
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover
{
  color: #fff;
  background-color: #3b8070;
}
.button--grey
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover
{
  color: #fff;
  background-color: #35495e;
}


#main:after {
    content : "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    background-image: url('https://image.ibb.co/kjAucp/pexels_photo_137612.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: -1;
}

#button-container {
  margin-bottom: 20px;
}
</style>
