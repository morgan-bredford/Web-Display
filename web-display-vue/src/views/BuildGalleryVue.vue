<template>
  <main class="about">
    <BuildGallery />
  </main>
</template>

<script>
// @ is an alias to /src
import BuildGallery from '@/components/BuildGallery.vue'

export default {
  name: 'BuildGalleryVue',
  components: {
    BuildGallery
  }
}
</script>
