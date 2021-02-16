<template>
  <section>
      <br /><br />
      <h3 style="font-style: italic;font-weight: 500">eller om du inte redan har ett användarkonto kan du skapa ett här</h3>
      <br />
      <div class="formcontainer" id="create_user_form">
        <form name="createUserForm" @submit.prevent="submitUser">
          <h2 >Skapa användare</h2>
          <h6 >-------------obligatoriskt---------------</h6>
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
          <h6 >----------------frivilligt------------------</h6>
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
      <aside>
        <router-link to="/buildgallery">
          <br />
          <p>Testa galleriet utan att ha ett användarkonto</p>
          <img src="../assets/gallery_arrow.svg" class="arrow">
        </router-link>
      </aside>
    </section>
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
              .post("http://ec2-13-48-85-50.eu-north-1.compute.amazonaws.com:8080/users/add", this.formData)
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
  font-family: Montserrat,Arial, Helvetica, sans-serif;
}
h2 {
  margin-bottom: .3em;
}
h6 {
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}
aside {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 30vh;
  right: 17vw;
  width: 10vw;
  height: 10vw;
  color: rgba(49, 71, 94,.5);
  background-color: rgba(63, 185, 132,.2);
  border-radius: 50%;
  padding: .7em;
  font-size: 1vw;
  overflow: hidden;
  /* transition: all .2s linear; */
}
aside:hover {
  background-color: rgba(63, 185, 132,.6);
  /* box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, .7) */
}
aside:hover .arrow {
  animation: move_arrow 1s;
}
@keyframes move_arrow {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(35%);
  }
  40% {
    transform: translateX(25%);
  }
  70% {
    transform: translateX(35%);
  }
  100% {
    transform: translateX(0);
  }
}
.arrow {
  width: 3vw;
}
/* a {
  color: #000;
} */
a:visited {
  color: inherit;
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
    outline: 100px solid rgba(63, 185, 132,.2);
  }
}
</style>