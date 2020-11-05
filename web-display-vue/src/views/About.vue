<template>
  <div class="about">
    <BuildGallery />
  </div>
</template>

<script>
// @ is an alias to /src
import BuildGallery from '@/components/BuildGallery.vue'

export default {
  name: 'About',
  components: {
    BuildGallery
  }
}
</script>
