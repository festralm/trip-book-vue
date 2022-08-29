<template>
  <div class="users-for-admin m-5 p-5 ">
    <div class="names-container">
      <b-row class="row-container text-center">
        <b-col class="my-button col-1 p-2 fw-bold">
          <div> {{names.id}}</div>
        </b-col>
        <b-col class="my-button col-2 p-2 fw-bold">
          <div> {{names.phoneNumber}}</div>
        </b-col>
        <b-col class="my-button col-2 p-2 fw-bold">
          <div> {{names.email}}</div>
        </b-col>
        <b-col class="my-button col-2 p-2 fw-bold">
          <div> {{names.isBlocked}}</div>
        </b-col>
        <b-col class="my-button col-2 p-2 fw-bold">
          <div> {{names.isDeleted}}</div>
        </b-col>
        <b-col class="my-button col-3 p-2 fw-bold">
          <div> {{names.role}}</div>
        </b-col>
      </b-row>
    </div>
    <user-for-admin-search v-for="(user, key) in $store.state.users" v-bind:user="user" :key="key"></user-for-admin-search>
  </div>
</template>

<script>
import router from "@/router";
import UserForAdminSearch from "@/layouts/UserForAdminSearch";

export default {
  name: "UsersForAdmin",
  components: {UserForAdminSearch},
  data() {
    return {
      names: {
        id: 'ID',
        phoneNumber: 'Номер телефона',
        email: 'Email',
        isBlocked: 'Заблокирован',
        isDeleted: 'Удален',
        role: 'Статус'
      }
    }
  },
  async beforeMount() {
    const request = new Request(
        "http://localhost/admin/users",
        {
          method: "GET"
        }
    );
    if (this.$store.state.token !== '') {
      request.headers.append("Authorization", this.$store.state.token);
    }
    var response = await fetch(request);
    if (response.status === 200) {
      response.json().then(data => {
        console.log(data[0])
        this.$store.state.users = data;
      })
    }
  }
}
</script>

<style scoped>

.my-button {
  border: 1px solid #bebebe;
  min-height: 40px;
}

.names-container {

}

</style>
