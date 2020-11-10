<template>
  <div>
      <br />
      <h1 >Välkommen att logga in</h1>
      <br />
      <Login  />
      <br /><br />
      <h2 >eller om du inte redan har ett användarkonto kan du skapa ett här</h2>
      <br />
      <div class="formcontainer">
      <form name="createUserForm" @submit="submitUser">
        <h1 >Skapa användare</h1>
        <br />
        <h5 >----------------obligatoriskt------------------</h5>
        <label htmlFor="username">Användarnamn:</label>
        <input
          type="text"
          name="username"
          id="username"
          v-model="username"
          placeholder="användarnamn"
        />
        <span class="errormsg">{{errormsg}}</span>
        <label htmlFor="password">Lösenord:</label>
        <input
          type="text"
          name="password"
          id="password"
          v-model="password"
          placeholder="lösenord"
        />
        <br />
        <h5 >----------------frivilligt------------------</h5>
        <label htmlFor="firstname">Förnamn:</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          v-model="firstname"
          placeholder="förnamn"
        />
        <label htmlFor="lastname">Efternamn:</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          v-model="lastname"
          placeholder="efternamn"
        />
        <label htmlFor="gender">Kön:</label>
        <select id="gender" name="gender" v-model="gender">
            <option value="">-Välj-</option>
            <option value="Man">Man</option>
            <option value="Kvinna">Kvinna</option>
            <option value="Annat">Annat</option>
        </select>
        <button>Submit</button>
      </form>
      <br />
      <h2 >det går även bra att testa galleriet utan att ha ett användarkonto
      <span class="pagelinks" >{"->"}</span></h2>
      </div>
      </div>
</template>

<script>
import axios from 'axios'
import Login from './Login'
import { mapMutations } from 'vuex'
export default {
    name: 'UserForm',
    components: {
        Login
    },
    data() {
        return {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            gender: "",
            key: "uuid",
            errormsg: "",
        }
    },
    methods: {
        ...mapMutations({setuser: 'setUser', login: 'logIn'}),
        submitUser(e){
            e.preventDefault()
            const user = {username: this.username,password: this.password,firstname: this.firstname,lastname: this.lastname,gender: this.gender,galleryimages: []}
            axios
              .post("http://ec2-13-48-204-0.eu-north-1.compute.amazonaws.com:8080/users/add", user)
              .then((res) => { 
                console.log(res)
                 localStorage.setItem('user', JSON.stringify(user))
                 this.setuser(user)
                 this.login()
              })
              .catch(err => {
                this.errormsg = err.response.data.message
                console.log(err.response.data.message)})
        }
    },

}
</script>

<style>
.errormsg{
  color: red;
}
</style>