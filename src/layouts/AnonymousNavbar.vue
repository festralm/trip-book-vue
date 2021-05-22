<template>
  <b-col class="my-dropdown" >
    <div class="icon">
      <button class="my-dropdown-toggle" @click="openMenu()">
        <img class="m-0 p-0 " width="55%" src="https://img.icons8.com/pastel-glyph/64/000000/gender-neutral-user.png"/>
      </button>
    </div>
    <div class="dropdown-content p-3 mt-3" v-bind:style="{display: isDisplayed}">
      <a class="my-dropdown-item py-2" href="/sign-in">Войти</a>
      <a class="my-dropdown-item py-2" href="/sign-up" >Зарегистрироваться</a>
      <hr>
      <a class="my-dropdown-item py-2" href="/sign-in">Сдать транспорт в аренду</a>
    </div>
  </b-col>
</template>

<script>
import router from "@/router";

export default {
  name: "AnonymousNavbar",
  data() {
    return {
      isDisplayed: 'none',
    }
  },
  methods: {
    openMenu() {
      if (this.isDisplayed === 'none') {
        this.isDisplayed = 'block';
      } else {
        this.isDisplayed = 'none';
      }
    }
  },
  beforeDestroy() {
    this.isDisplayed = 'none';
  }
}
</script>

<style scoped>

</style>
