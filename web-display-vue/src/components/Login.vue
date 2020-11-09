<template>
  <div class="formcontainer">
        <form @submit="logIn">
            <label htmlFor="username">Användarnamn:</label>
            <input type="text" name="username" placeholder="name" />
            <label htmlFor="password">Lösenord:</label>
            <input type="text" name="password" placeholder="pass" />
            <button>Logga in</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Login",
    data() {
        return {
            isLoggedIn: ""
        }
    },
    mounted() {
        this.isLoggedIn = this.$store.getters.isLoggedIn
    },
    methods: {
        logIn(e){
            e.preventDefault()
            console.log('what')
           
            axios
            .get("http://ec2-13-48-204-0.eu-north-1.compute.amazonaws.com:8080/users/find?search="+e.target[0].value)
            .then((res) => {
                console.log(res.data)
                this.$store.commit('setUser', res.data[0])
                 this.$store.commit('logIn')
                })
            .catch(err => console.log(err.response))
        }
    },
}
</script>

<style scoped>
    .formcontainer {
        width: 30vw;
    }
</style>