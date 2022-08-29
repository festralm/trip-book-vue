<template>

  <div class="user-container">
    <div class="id">
      <p>{{user.id}}</p>
    </div>
    <div class="email">
      <a href="">{{user.email}}</a>
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
      <p>
        <button v-if="user.role === 'ADMIN'" @click="undoAdmin">Убрать права администраторва</button>
        <button v-else @click="undoAdmin">Сделать администратором</button>
      </p>
    </div>
    <!--TODO задать права-->
  </div>
</template>

<script>
export default {
  name: "UserForAdmin",
  data() {
    return {
      user: {
        id: 1,
        email: "alia@gmail.com",
        banned: null,
        deleted: null,
        role: "ADMIN"
      }
    }
  },
  methods: {
    banUser() {
      if (this.user.banned === null) {
        this.user.banned = true;
      } else {
        this.user.banned = null;
      }
    },
    deleteUser() {
      if (this.user.deleted === null) {
        this.user.deleted = true;
      } else {
        this.user.deleted = null;
      }
    },
    undoAdmin() {
      if (this.user.role === 'ADMIN') {
        this.user.role = 'USER';
      } else {
        this.user.role = 'ADMIN';
      }
    }
  }
}
</script>

<style scoped>

.user-container {
  width: 200px;
  height: 300px;
  padding: 20px;
  margin: 10px 10px 10px 700px;
  background-color: bisque;
  text-align: center;
}
</style>
