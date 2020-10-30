<template>
  <div class="formcontainer">
        <form >
            <label htmlFor="username">Användarnamn:</label>
            <input type="text" name="username" placeholder="name" />
            <label htmlFor="password">Lösenord:</label>
            <input type="text" name="password" placeholder="pass" />
            <button>Logga in</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login"
}
</script>

<style scoped>
    .formcontainer {
        width: 30vw;
    }
</style>