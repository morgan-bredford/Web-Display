<template>
  <nav>
      <ul>
       
          <a href="#"><li>hem</li></a>
        
        
          <a href="#"><li>bygg galleri</li></a>
          <a href="#"><li>ditt galleri</li></a>
          <a href="#"><li>logga in</li></a>
       
      </ul>
      
    </nav>
</template>

<script>
export default {
  name: "Navbar",
}
</script>

<style >
nav {
  background-color: rgba(27, 11, 87, 0.7);
  height: 10vh;
  font-size: 1.5em;
 
}

ul {
  display: flex;
  align-items: center;
  list-style: none;
}

li {
  text-transform: uppercase;
  text-shadow: 0px 0px 4px #000;
}

li:last-child {
  margin-left: auto;
}

a {
  margin: 4vh;
  text-decoration: none;
  color: #eee;
}

a:last-child {
  margin-left: auto;
}

a:hover {
  color: rgba(207, 195, 248, 0.7);
}

</style>