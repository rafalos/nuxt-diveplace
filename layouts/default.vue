<template>
  <div id="main">
    <Header/>
    <nuxt/>
  </div>
</template>

<script>
import Header from "@/components/Header"
  export default {
    components: {
      Header
    }
  }
</script>

<style>
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
    background-image: url(http://www.divingkarpathos.gr/wp-content/uploads/2013/05/bg23.jpg);
    width: 100%;
    height: 100%;
    opacity : 0.4;
    z-index: -1;
}

.stdbutton {
  font-family: Roboto;
  font-weight: bold;
  color: white;
  text-align: center;
  letter-spacing: 1px;
  width:150px;
  font-size: 13px;
  background: #143D61;
  padding: 10px;
  text-decoration: none;
  transition: 0.1s;
  margin-right: 5px;
  display: inline-block;
  margin-bottom: 5px;
  line-height: 15px;
  border: none;
  border-bottom: 4px solid white;
}

.stdbutton:focus {outline:0;}

.stdbutton:hover {
 text-decoration: none;
 background: #F8F8F8;
 font-weight: bold;
 color: #143D61;
}
.stdbutton:active {
 text-decoration: none;
}
.stdbutton:visited {
 text-decoration: none;
}
.stdbutton:link {
 text-decoration: none;
}

.whiteContainer {
  padding: 0px 13px 0px 13px;
  width: 100%;
  font-size: 1.1em;
  font-family: "Roboto";
  background-color: #F6F7F7;
  margin: 20px 0 20px 0;
  font-weight: bold;
  -webkit-box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
  -moz-box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
  box-shadow: 7px 7px 28px -6px rgba(0,0,0,0.79);
}
</style>
