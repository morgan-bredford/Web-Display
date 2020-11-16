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

<style >
nav {
  background-color: rgba(27, 11, 87, 0.7);
  height: 10vh;
  font-size: 1.5em;
 
}

ul {
  display: flex;
  align-items: center;
  list-style: none;
}

li {
  text-transform: uppercase;
  text-shadow: 0px 0px 4px #000;
}

li:last-child {
  margin-left: auto;
}

a {
  margin: 4vh;
  text-decoration: none;
  color: #eee;
}

a:last-child {
  margin-left: auto;
}

a:hover {
  color: rgba(207, 195, 248, 0.7);
}

</style>