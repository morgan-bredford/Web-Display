<template>
    <main>
        <br />
        <h1 >Välkommen att logga in</h1>
        <br />
        <div class="formcontainer">
            <form @submit.prevent="logIn">
                <label htmlFor="username">Användarnamn:</label>
                <input type="text" name="username" v-model="formData.username" placeholder="name" />
                <label htmlFor="password">Lösenord:</label>
                <input type="text" name="password" v-model="formData.password" placeholder="pass" />
                <button>Logga in</button>
            </form>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
    name: "Login",
    data() {
        return {
            formData: {
                username: "",
                password: "",
            },
        }
    },
    methods: {
        ...mapMutations({setuser: 'setUser', login: 'logIn'}),
        logIn(){
       
            axios
            .get("http://ec2-13-48-204-0.eu-north-1.compute.amazonaws.com:8080/users/find?search="+this.formData.username)
            .then((res) => {
                if(res.data.length){
                    if(res.data[0].password === this.formData.password){
                        localStorage.setItem('user', JSON.stringify(res.data[0]))
                        this.setuser(res.data[0])
                        this.login()
                    }
                }
            })
            .catch(err => console.log(err.response))
        }
    },
}
</script>

<style scoped>
    .formcontainer {
        width: clamp(200px, 80vw, 350px);
    }
</style>