<template>
  <div class="drop-down">
    <div class="messages">
      <a href="/messages">Сообщения</a>
    </div>
    <div class="notifications">
      <a href="/notifications">Уведомления</a>
    </div>
    <div class="trips">
      <a href="/trips">Мои поездки</a>
    </div>
    <div class="my-transport">
      <a href="/my-transport">Мой транспорт</a>
    </div>
    <div class="wishlist">
      <a href="/wishlist">Список желаний</a>
    </div>
    <div class="rent-transport">
      <a href="/rent-transport">Сдать транспорт в аренду</a>
    </div>
    <div class="profile">
      <a href="/profile">Мой профиль</a>
    </div>
    <div class="help">
      <a href="/help">Помощь</a>
    </div>
    <div class="logout">
      <a href="/logout" @click="logout">Выйти</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserNavbar"
}
</script>

<style scoped>

</style>
