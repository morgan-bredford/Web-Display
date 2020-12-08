<template>
  <form>
     <input type="file" accept="image/*" @change="uploadImage($event)" />
  </form>
  <img v-if="item.imageUrl" :src="item.imageUrl" />
</template>

<script>
//import axios from 'axios'
export default {
    data() { 
        return {
           item:{
                image : null,
                imageUrl: null
            }
        }
    },
    methods: {
        uploadImage(event) {
            const file = event.target.files[0]
            this.image = file
            this.item.imageUrl = URL.createObjectURL(file)
        },
    }
}
</script>
    
<style>
    v-file-input {
        height: 20px;
    }
</style>