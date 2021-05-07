<template>
  <div class="user-container">
    <div class="id">
      <p>{{user.id}}</p>
    </div>
    <div class="email">
      <p>{{user.email}}</p>
    </div>
    <div class="ban" v-if="user.banned === null">
      <p>Не заблокирован</p>
      <p><button @click="banUser">Заблокировать</button></p>
    </div>
    <div class="ban" v-else>
      <p>Заблокирован</p>
      <p><button @click="banUser">Разблокировать</button></p>
    </div>
    <div class="delete" v-if="user.deleted === null">
      <p>Не удален</p>
      <p><button @click="deleteUser">Удалить</button></p>
    </div>
    <div class="delete" v-else>
      <p>Удален</p>
      <p><button @click="deleteUser">Восстановить</button></p>
    </div>
    <div class="role">
      <p>{{ user.role }}</p>
    </div>
    <!--TODO задать права-->
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
  },
  methods: {
    banUser() {
      this.$emit('banUser', this.user);
    },
    deleteUser() {
      this.$emit('deleteUser', this.user);
    }
  }
}
</script>

<style scoped>
.user-container {
  width: 200px;
  height: 230px;
  padding: 20px;
  margin: 10px;
  background-color: bisque;
}
</style>
