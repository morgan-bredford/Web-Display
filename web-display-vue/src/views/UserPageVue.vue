<template>
  <div class="about">
    <UserPage />
  </div>
</template>

<script>
// @ is an alias to /src
import UserPage from '@/components/UserPage.vue'

export default {
  name: 'UserPageVue',
  components: {
    UserPage
  }
}
</script>