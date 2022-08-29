<template>
  <user-for-admin v-bind:is-admin="true" ></user-for-admin>
</template>

<script>
import router from "@/router";
import Profile from "../components/Profile";
import UserForAdmin from "../components/UserForAdmin";
export default {
  name: "AdminUser",
  data() {
    return {
      user: {}
    }
  },
  components: {UserForAdmin},
  async beforeMount() {
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
