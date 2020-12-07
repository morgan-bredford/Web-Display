<template>
  <form>
      <v-file-input
       v-model="file"
       chips
       accept="image/*"
       label="Image"
       @change="onFileChange"
    />
     <input type="file" accept="image/*" @change="onFileChange" />
  </form>
</template>

<script>
export default {
    data() { 
        return {
            file: null, 
            image: null 
            }
        },
    methods: {
        onFileChange() {
            const reader = new FileReader()
            reader.readAsDataURL(this.file)
            reader.onload = e => {
                this.image = e.target.result
                console.log(this.image)
            }
        },
    },
}
</script>
    
<style>
    v-file-input {
        height: 20px;
    }
</style>