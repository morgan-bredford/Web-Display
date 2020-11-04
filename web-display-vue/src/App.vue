<template>
  <div>
    <Navbar />
    <BuildGallery />
    <Login />
    
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import BuildGallery from './components/BuildGallery.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    BuildGallery
  }
}
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}

#app {
  color: #2c3e50;
}

.formcontainer {
  display: block;
  margin: auto;
  width: 50vw;
}

form {
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  border-radius: 5px;
  border: 1px solid rgba(207, 195, 248, 0.9);
  /* box-shadow: 0px 0px 20px 2px rgba(27, 11, 87, 0.7); */
}

label {
  font-weight: 700;
}

input:focus {
  background-color: rgba(207, 195, 248, 0.2);
}

.imagecontainer {
  background-color: rgba(27, 11, 87, 0.1);
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  margin: 0 auto;
  padding: 10px;
  border-radius: 4px;
}

.page-links {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 100%;
}

button {
  cursor: pointer;
  background-color: rgba(207, 195, 248, 0.5);
}

</style>
