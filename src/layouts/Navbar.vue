<template>
  <div class="drop-down">
    <div class="sign-in">
      <a href="/sign-in">Войти</a>
    </div>
    <div class="sign-up">
      <a href="/sign-up">Зарегистрироваться</a>
    </div>
    <div class="logout">
      <a href="/logout" @click="logout">Выйти</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    logout() {

    }
  }
}
</script>

<style scoped>

</style>
