<template>
<div class="menu">
  <div class="logo">
    <a href="/">Логотип</a>
  </div>
  <div class="home">
    <a href="/">Tripbook</a>
  </div>
  <navbar :user="user"/>
  <div class="admin">
    <a href="/admin">Страница администратора</a>
  </div>
</div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  name: "MenuLayout",
  components: {Navbar},
  data() {
    return {
      user: {}
    }
  }
}
</script>

<style scoped>
.menu {
  background-color: aqua;
  margin: 20px;
}
</style>
