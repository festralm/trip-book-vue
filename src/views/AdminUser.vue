<template>
  <user-for-admin v-bind:user=user :key="user.id"></user-for-admin>
</template>

<script>
import UserForAdmin from "@/layouts/UserForAdmin";
import router from "@/router";
export default {
  name: "AdminUser",
  data() {
    return {
      user: {}
    }
  },
  components: {UserForAdmin},
  async beforeMount() {
    await this.getUser();
  },
  methods: {

    async getUser() {
      const request = new Request(
          `http://localhost/admin/users/${router.currentRoute.params['id']}`,
          {
            method: "GET",
          }
      );
      if (this.$store.state.token !== '') {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);
      if (response.status === 200) {
        response.json().then(data => {
          this.user.isBlocked = data['isBlocked'];
          this.user.isDeleted = data['isDeleted'];
          this.user.role = data['role'];
          this.user.email = data['email'];
          this.user.id = data['id'];
          this.user.phoneNumber = data['phoneNumber]'];
        })
      }
      this.$forceUpdate()
    },
  }
}
</script>

<style scoped>

</style>
