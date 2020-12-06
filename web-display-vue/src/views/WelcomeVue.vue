<template>
  <div>
      <br />
      <h1 >Välkommen {{$store.state.user.username}} </h1>
      <router-link to="/" tag="button" @click="() =>  {$store.commit('logOut');$router.push('/');}">Logga ut</router-link>
    </div>
</template>

<script>
//import Welcome from '../components/Welcome'
export default {
    name: 'WelcomeVue',
    components: {
        
    }

}
</script>

<style>
h1 {
    text-align: center;
}
a {
  display: block;
  width: max-content;
  margin: auto;
}
</style>