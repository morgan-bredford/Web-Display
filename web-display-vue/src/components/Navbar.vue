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
    <div id="react_link">
      <img src="../assets/react_logo_small.png" id="react_link_img" />
      <a href="http://ec2-13-48-85-50.eu-north-1.compute.amazonaws.com/" id="react_link_a">
          <div id="react_link_text">React versionen</div>
      </a>
    </div>
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
  background: url(../assets/logo.png) center no-repeat;
  background-size: 10vh;
  background-color: rgba(49, 71, 94, .9);
  height: 10vh;
  font-size: 1.5em;
  position: relative;
 
}

nav::after {
  content: "";
  display: inline-block;
  position: absolute;
  background-color: var(--lightgreen);
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
    z-index: 333;
}

li:last-child {
  margin-left: auto;
}

li::before {
  content: "";
  display: inline-block;
  position: absolute;
  background-color:  rgb(80, 245, 173,.2);
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
  font-family: 'Times New Roman', Times, serif;
  margin: 4vh;
  text-decoration: none;
  color: #fff;
  transition: color 1.4s;

}

a:last-child {
  margin-left: auto;
}

a:hover {
  color: rgba(255, 255, 255, 0.3);
}

#react_link {
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 9em;
  height: 1.5em;
  right: 0;
  bottom: 0;
  transform: translate(-0.4em, 100%);
  background-color: rgba(49, 71, 94, .9);
  padding: 0.2em;
  font-size: 0.8em;
  text-align: center;
  border-left: 1px solid var(--lightblue);
  border-bottom: 1px solid var(--lightblue);
  border-right: 1px solid var(--lightblue);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

#react_link_a {
  margin: 0;
}

#react_link_img {
  height: 100%;
  object-fit: contain;
  margin-right: 0.2em;
  transition: transform 5s ease-in-out;
}

#react_link:hover #react_link_img {
  transform: rotate(5turn);
}

#react_link_text {
  color: rgb(97, 218, 251);
  padding-bottom: 0.2em;
}
</style>