<template>
  <div class="user-container">
    <div class="id">
      {{user.id}}
    </div>
    <div class="email">
      {{user.email}}
    </div>
    <div class="bann">
      <button>Заблокировать</button>
    </div>
    <div class="delete">
      <button>Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    user: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.user-container {
  width: 100px;
  height: 100px;
  padding: 25px;
  margin: 30px;
  background-color: bisque;
}
</style>
