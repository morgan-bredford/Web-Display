<template>
  <div class="formcontainer">
        <form name="createUserForm">
          <h1>Dina uppgifter</h1>
          <label for="username">Användarnamn:</label>
          <input
            type="text"
            name="username"
            id="username"
            :value="user.username"
           
            placeholder="användarnamn"
          /><br />
          <label for="password">Lösenord:</label>
          <input
            type="text"
            name="password"
            id="password"
            :value="user.password"
            
            placeholder="lösenord"
          /><br />
          <label for="firstname">Förnamn:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            :value="user.firstname"
            
            placeholder="förnamn"
          /><br />
          <label for="lastname">Efternamn:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            :value="user.lastname"
            
            placeholder="efternamn"
          /><br />
          <label for="gender">Kön:</label>
          <select id="gender" name="gender" :value="user.gender" >
              <option >{{user.gender}}</option>
          </select>
          <br />
          
        </form>
        <br />
        <router-link to="/" >
          <button @click="$store.commit('logOut')">Logga ut</button>
        </router-link>
    </div>
</template>

<script>
export default {
 
}
</script>

<style>

</style>