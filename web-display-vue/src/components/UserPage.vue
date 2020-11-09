<template>
  <div class="formcontainer">
        <form name="createUserForm">
          <h1>Dina uppgifter</h1>
          <label for="username">Användarnamn:</label>
          <input
            type="text"
            name="username"
            id="username"
            :value="$store.getters.getUser.username"
           
            placeholder="användarnamn"
          /><br />
          <label for="password">Lösenord:</label>
          <input
            type="text"
            name="password"
            id="password"
            :value="$store.getters.getUser.password"
            
            placeholder="lösenord"
          /><br />
          <label for="firstname">Förnamn:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            :value="$store.getters.getUser.firstname"
            
            placeholder="förnamn"
          /><br />
          <label for="lastname">Efternamn:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            :value="$store.getters.getUser.lastname"
            
            placeholder="efternamn"
          /><br />
          <label for="gender">Kön:</label>
          <select id="gender" name="gender" :value="$store.getters.getUser.gender" >
              <option >{{$store.getters.getUser.gender}}</option>
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