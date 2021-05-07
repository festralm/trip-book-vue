<template>
  <div class="users-container">
    <user v-for="(user, index) in users" :key="index" :user="user" @banUser="banUser" @deleteUser="deleteUser"/>
  </div>
</template>

<script>
import User from "./User";
export default {
  name: "Users",
  components: {User},
  data() {
    return {
      users: [
        {
          id: 1,
          email: "alia@gmail.com",
          banned: null,
          deleted: null,
          role: "ADMIN"
        },
        {
          id: 2,
          email: "kate@gmail.com",
          banned: true,
          deleted: null,
          role: "USER"
        },
        {
          id: 3,
          email: "max@gmail.com",
          banned: null,
          deleted: true,
          role: "USER"
        },
      ]
    }
  },
  methods: {
    banUser(user) {
      if (user.banned === null) {
        user.banned = true;
      } else {
        user.banned = null;
      }
    },
    deleteUser(user) {
      if (user.deleted === null) {
        user.deleted = true;
      } else {
        user.deleted = null;
      }
    }
  }
}
</script>

<style scoped>

</style>
