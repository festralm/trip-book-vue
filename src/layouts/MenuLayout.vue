<template>
<div class="menu">
  <div class="logo">
    <a href="/">Логотип</a>
  </div>
  <div class="home">
    <a href="/">Tripbook</a>
  </div>
  <div class="lease">
    <a href="/transports">Арендовать транспорт</a>
  </div>
  <div class="rent-with-driver">
    <a href="/transports-with-drivers">Не хочу быть за штурвалом</a>
  </div>
  <AnonymousNavbar :user="user"/>
</div>
</template>

<script>
import AnonymousNavbar from "./AnonymousNavbar";
export default {
  name: "MenuLayout",
  components: {AnonymousNavbar},
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
