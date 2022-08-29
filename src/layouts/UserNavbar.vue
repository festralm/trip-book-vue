<template>
  <b-col class=" my-dropdown" >
    <div class="icon">
      <button class="my-dropdown-toggle" @click="openMenu()">
        <img class="m-0 p-0 " width="55%" src="https://img.icons8.com/pastel-glyph/64/000000/gender-neutral-user.png"/>
      </button>
    </div>
    <div class="dropdown-content p-3 mt-3" v-bind:style="{display: isDisplayed}">
      <a class="my-dropdown-item py-2" href="/messages">Сообщения</a>
      <a class="my-dropdown-item py-2" href="/notifications">Уведомления</a>
      <a class="my-dropdown-item py-2" href="/trips">Мои поездки</a>
      <a class="my-dropdown-item py-2" href="/my-transport">Мой транспорт</a>
      <a class="my-dropdown-item py-2" href="/wishlist">Список желаний</a>
      <hr>
      <a class="my-dropdown-item py-2" href="/rent-transport">Сдать транспорт в аренду</a>
      <a class="my-dropdown-item py-2" href="/profile">Мой профиль</a>
      <div v-if="JSON.parse($store.state.user)['role'] === 'ADMIN'">
        <a class="my-dropdown-item py-2" @click="getAdminPage()">Страница администратора</a>
      </div>
      <hr>
      <a class="my-dropdown-item py-2" href="/help">Помощь</a>
      <a class="my-dropdown-item py-2" @click="logout()">Выйти</a>
    </div>
  </b-col>
</template>

<script>
import router from "@/router";

export default {
  name: "UserNavbar",
  data() {
    return {
      isDisplayed: 'none',
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
      if (this.$store.state.token !== '') {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);
      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authorised');
        this.$forceUpdate();
        await router.push("/sign-in");
      }
    },

    openMenu() {
      if (this.isDisplayed === 'none') {
        this.isDisplayed = 'block';
      } else {
        this.isDisplayed = 'none';
      }
    },
    async getAdminPage() {
      await router.push("/admin");
    }
  },
  beforeDestroy() {
    this.isDisplayed = 'none';
  }
}
</script>

<style scoped>

</style>
