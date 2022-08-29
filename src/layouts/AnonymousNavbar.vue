<template>
  <div class="drop-down">
    <div class="sign-in">
      <a href="/sign-in">Войти</a>
    </div>
    <div class="sign-up">
      <a href="/sign-up">Зарегистрироваться</a>
    </div>
    <div class="rent-transport">
      <a href="/rent-transport">Сдать транспорт в аренду</a>
    </div>
    <div class="admin">
      <a href="/admin">Страница администратора</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnonymousNavbar",
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
