<template>
    <div class="formcontainer">
        <h1 >Sök på bilder from Pixabay</h1>
        <form>
            <input type="text" name="searchbox" />
            <button>Sök bild</button>
        </form>
        <h4 >klicka på + för att lägga till bilden till ditt galleri</h4>
        <div className="imagecontainer">
        </div>
        <br />
        <div id="linkcontainer">
        </div>
    </div>
</template>

<script>
// import axios from "axios";
export default {
    name: "SearchImages"

}
</script>

<style>

</style>