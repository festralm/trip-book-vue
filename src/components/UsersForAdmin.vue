<template>
  <div class="users-container">
    <user-comp-for-admin v-for="(user, index) in users"
                         :key="index"
                         :user="user"
                         @banUser="banUser"
                         @deleteUser="deleteUser"
                         @undoAdmin="undoAdmin"/>
  </div>
</template>

<script>
import UserCompForAdmin from "./UserCompForAdmin";
export default {
  name: "UsersForAdmin",
  components: {UserCompForAdmin},
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
    },
    undoAdmin(user) {
      if (user.role === 'ADMIN') {
        user.role = 'USER';
      } else {
        user.role = 'ADMIN';
      }
    }
  }
}
</script>

<style scoped>

</style>
