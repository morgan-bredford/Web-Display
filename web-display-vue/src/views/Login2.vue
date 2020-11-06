<template>
  <div class="about">
    <Login @login="logIn" />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Login2',
  components: {
    Login
  }
}
</script>
