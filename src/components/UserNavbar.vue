<template>
  <div class="dropdown-container">
    <a href="/messages">Сообщения</a>
    <a href="/notifications">Уведомления</a>
    <a href="/trips">Мои поездки</a>
    <a href="/my-transport">Мой транспорт</a>
    <a href="/wishlist">Список желаний</a>
    <hr>
    <a href="/rent-transport#rent">Сдать транспорт в аренду</a>
    <a href="/profile">Мой профиль</a>
    <a href="/admin" v-if="$store.state.isAdmin === 'true'" @click="getAdminPage()">Страница администратора</a>
    <hr>
    <a href="/help">Помощь</a>
    <a @click="logout()" href="#">Выйти</a>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "UserNavbar",
  data() {
    return {

    }
  },
  methods: {
    async logout() {
      const request = new Request(
          "http://localhost/logout",
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);
      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authorised');
        this.$emit('updateMenu')
        router.push("/sign-in")
      } else {
        router.push("/error/default")
      }
    },
  },
}
</script>

<style scoped>

</style>
