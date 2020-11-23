<template>
  <div>
      <br /><br />
      <h3 >eller om du inte redan har ett användarkonto kan du skapa ett här</h3>
      <br />
      <div class="formcontainer" id="create_user_form">
        <form name="createUserForm" @submit.prevent="submitUser">
          <h1 >Skapa användare</h1>
          <br />
          <h5 >----------------obligatoriskt------------------</h5>
          <label htmlFor="username">Användarnamn:</label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="formData.username"
            placeholder="användarnamn"
          />
          <span class="errormsg">{{errormsg}}</span>
          <label htmlFor="password">Lösenord:</label>
          <input
            type="text"
            name="password"
            id="password"
            v-model="formData.password"
            placeholder="lösenord"
          />
          <br />
          <h5 >----------------frivilligt------------------</h5>
          <label htmlFor="firstname">Förnamn:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            v-model="formData.firstname"
            placeholder="förnamn"
          />
          <label htmlFor="lastname">Efternamn:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            v-model="formData.lastname"
            placeholder="efternamn"
          />
          <label htmlFor="gender">Kön:</label>
          <select id="gender" name="gender" v-model="formData.gender">
              <option value="">-Välj-</option>
              <option value="Man">Man</option>
              <option value="Kvinna">Kvinna</option>
              <option value="Annat">Annat</option>
          </select>
          <button>Skapa användare</button>
        </form>
      </div>
        <br />
        <router-link to="/buildgallery">
          <h2 >det går även bra att testa galleriet utan att ha ett användarkonto
          <span>-></span></h2>
        </router-link>
      
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
    name: 'UserForm',
    components: {
       
    },
    data() {
        return {
          formData: {  
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            gender: "",
            key: "uuid",
            errormsg: ""
          }
        }
    },
    methods: {
        ...mapMutations({setuser: 'setUser', login: 'logIn'}),
        submitUser(){
            // const user = {username: this.username,password: this.password,firstname: this.firstname,lastname: this.lastname,gender: this.gender,galleryimages: []}
            this.formData.galleryimages = []
            axios
              .post("http://ec2-13-48-204-0.eu-north-1.compute.amazonaws.com:8080/users/add", this.formData)
              .then((res) => { 
                console.log(res)
                 localStorage.setItem('user', JSON.stringify(this.formData))
                 this.setuser(this.formData)
                 this.login()
              })
              .catch(err => {
                this.errormsg = err.response.data.message
                console.log(err.response.data.message)})
        }
    },

}
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}
a {
  color: #000;
}
a:hover {
  color:  rgb(27, 11, 87, 0.7);
}
.errormsg{
  color: red;
}
select {
  display: flex;
  width: 40%;
  margin: auto;
}
select option {
  font-family: Arial;
  width: 333px;
  background-color: rgba(207, 195, 248, 1);
  border-radius: 50%;
}
button {
  width: 70%;
  transform: translateX(37%);
}
#create_user_form {
  transform: scale(0);
  animation: user_form 1s ease-in-out forwards;
}
@keyframes user_form {
  from {
    transform: scale(0.7);
    outline: none;
  }
  50% {
    transform: scale(1.2);
  }
  60% {
    transform: scale(1.2);
    background: rgba(207, 195, 248, 1);
  }
  to {
    transform: scale(1);
    outline: 100px solid rgba(73, 226, 253,.2);
  }
}
</style>