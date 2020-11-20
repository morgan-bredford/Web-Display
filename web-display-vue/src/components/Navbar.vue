<template>
  <nav>
    <ul>
        <router-link to="/" v-if="!loggedin"><li>hem</li></router-link>
        <router-link to="/welcome" v-else><li>hem</li></router-link>
        <router-link to="/buildgallery"><li>bygg galleri</li></router-link>
        <router-link to="/gallery"><li>ditt galleri</li></router-link>
        <router-link to="/login" v-if="!loggedin"><li >logga in</li></router-link>
        <router-link to="/userpage" v-else><li>inloggad som: {{user.username}}</li></router-link>
    </ul>
    <a href="http://ec2-13-48-204-0.eu-north-1.compute.amazonaws.com/">React</a>
  </nav>
  <router-view/>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Navbar",
  data() {
    return {

    }
  },
  computed: {
    ...mapState({user: 'user', loggedin: 'loggedIn'}),
  },
}
</script>

<style scoped >
nav {
  background-color: rgba(27, 11, 87, 0.7);
  height: 10vh;
  font-size: 1.5em;
  position: relative;
 
}

nav::after {
  content: "";
  display: inline-block;
  position: absolute;
  background-color: aqua;
  width: 100%;
  height: 10%;
  bottom: 3%;
  left: 0;
  transform: translate(0%,55%);
  z-index: -1;
  transition: transform .4s linear;
}

ul {
  display: flex;
  align-items: center;
  list-style: none;
}

li {
  text-transform: uppercase;
  text-shadow: 0px 0px 4px #000;
  display: block;
  position: relative;
  
}

li:last-child {
  margin-left: auto;
}

li::before {
  content: "";
  display: inline-block;
  position: absolute;
  background-color: aqua;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid black;
  transform: translate(25%,-30%);
  z-index: -1;
  transition: transform .4s linear;
}

li:hover::before {
  transform: translate(-5%,5%);
}

a {
  margin: 4vh;
  text-decoration: none;
  color: #eee;
  transition: color 1.4s;
}

a:last-child {
  margin-left: auto;
}

a:hover {
  color: rgba(207, 195, 248, 0.7);
}

</style>