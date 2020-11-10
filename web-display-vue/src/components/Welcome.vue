<template>
  <div>
      <br />
      <h1 >Välkommen {{$store.state.user.username}} </h1>
      <router-link to="/" tag="button" @click="() =>  {$store.commit('logOut');$router.push('/');}">Logga ut</router-link>
      </div>
</template>

<script>


export default {
    name: 'Welcome',
    components: {
        
        
    },

}
</script>

<style>

</style>