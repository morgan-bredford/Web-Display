<template>
  <div>
      <br />
      <h1 >Välkommen att logga in</h1>
      <br />
      <Login  />
      <br /><br />
      <h2 >eller om du inte redan har ett användarkonto kan du skapa ett här</h2>
      <br />
      <div id="formcontainer">
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
        />{{username}}
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
import Login from './Login'
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
        submitUser(e){
            e.preventDefault()
            console.log(this)
        }
    },

}
</script>

<style>

</style>