<template>
  <div class="users-container">
    <user v-for="(user, index) in users" :key="index"/>
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
        },
        {
          id: 2,
          email: "kate@gmail.com",
        },
        {
          id: 3,
          email: "max@gmail.com",
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
