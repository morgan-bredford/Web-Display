<template>
    <section class="formcontainer">
        <form @submit.prevent="updateUser(form)">
          <h1>Redigera dina uppgifter</h1>
          <label for="username">Användarnamn:</label>
          <span>{{form.username}}</span>
        <br />
          <label for="password">Lösenord:</label>
          <input
            type="text"
            name="password"
            id="password"
            v-model="form.password"
          /><br />
          <label for="firstname">Förnamn:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            v-model="form.firstname"
          /><br />
          <label for="lastname">Efternamn:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            v-model="form.lastname"
          /><br />
          <label for="gender">Kön:</label>
          <select id="gender" name="gender" v-model="form.gender" >
              <option >{{form.gender}}</option>
              <option value="Man">Man</option>
              <option value="Kvinna">Kvinna</option>
              <option value="Annat">Annat</option>
          </select>
          <br />
          <button>Uppdatera</button>
        </form>
        <br />
        <router-link to="/" >
          <button @click="logOut">Logga ut</button>
        </router-link>
    </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {},
    } 
  },
  mounted() {
    this.form = this.user
  },
   computed: {
    ...mapState({user: 'user', loggedin: 'loggedIn'}),
  },
  methods: {
    ...mapMutations(['logOut']),
    ...mapActions(['updateUser']),
  }
 
}

</script>

<style scoped>
  .formcontainer {
    display: block;
    margin-top: 6vh;
  }
  form {
    display: block;
    margin: auto;
  }
  h1 {
    width: max-content;
    margin: 0 auto 1vh;
  }
  label {
    display: inline-block;
    width: 140px;
    text-align: right;
    margin-right: .5em;
  }
  input {
    width: 189px;
    background-color: rgb(250, 247, 255);
    border: none;
    border-radius: unset;
    box-shadow: unset;
    text-align: left;
    font-size: 0.8em;
    font-style: unset;
    line-height: 30px;
    padding-left: .4em;
  }
  button {
    display: block;
    width: max-content;
    margin: 1em auto;
    border: none;
    border-radius: 10px;
    padding: 2px 10px 0px 10px;
    color: var(--darkblue);
    background-color: rgba(63, 185, 132,.7);
    font-weight: 600;

  }
  button:hover {
    background-color: rgba(63, 185, 132,.9);
  }
</style>