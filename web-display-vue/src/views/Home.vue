<template>
  <main class="home">
      <Login  />
      <UserForm />
  </main>
</template>

<script>
// @ is an alias to /src
import UserForm from '@/components/UserForm.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    UserForm,
    Login,
  }
}
</script>
