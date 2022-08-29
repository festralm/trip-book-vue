<template>
  <div class="user-wrapper m-5 p-5">
    <div class="brief-info m-3 p-3">
      <b-button @click="undoAdmin(user.id)" v-if="user.role === 'ADMIN'" variant="danger" class="w-50 h-100">Сделать обычным пользователем</b-button>
      <b-button @click="makeAdmin(user.id)" v-else variant="success" class="w-50 h-100">Сделать администратором</b-button>
      <br>
      <b-button @click="blockUser(user.id)" v-if="user.isBlocked == null" variant="danger" class="w-50 h-100">Заблокировать</b-button>
      <b-button @click="unblockUser(user.id)" v-else variant="success" class="w-50 h-100">Разблокировать</b-button>
      <br>
      <b-button @click="deleteUser(user.id)" v-if="user.isDeleted == null" variant="danger" class="w-50 h-100">Удалить</b-button>
      <b-button @click="restoreUser(user.id)" v-else variant="success" class="w-50 h-100">Восстановить</b-button>
    </div>
    <div class="info m-3 p-3">
      <p>{{user.phoneNumber}}</p>
      <p>{{user.email}}</p>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "UserForAdmin",
  props: {
    user: {},
    key: {}
  },
  data() {
    return {
    }
  },
  methods: {
    async getUser() {
      const request = new Request(
          `http://localhost/admin/users/${router.currentRoute.params['id']}`,
          {
            method: "GET",
          }
      );
      if (this.$store.state.token !== null) {
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
          this.user.phoneNumber = data['phoneNumber'];
          this.$forceUpdate()
        })
      }
      console.log(this.user)
    },
    async blockUser(id) {
      const request = new Request(
          `http://localhost/admin/users/ban/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        await this.getUser(id);
      }
    },
    async unblockUser(id) {
      const request = new Request(
          `http://localhost/admin/users/unban/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        await this.getUser(id);
      }
    },
    async deleteUser(id) {
      const request = new Request(
          `http://localhost/admin/users/delete/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        await this.getUser(id);
      }
    },
    async restoreUser(id) {
      const request = new Request(
          `http://localhost/admin/users/restore/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        await this.getUser(id);
      }
    },
    async makeAdmin(id) {
      const request = new Request(
          `http://localhost/admin/make-admin/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        await this.getUser(id);
      }
    },
    async undoAdmin(id) {
      const request = new Request(
          `http://localhost/admin/undo-admin/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        await this.getUser(id);
      }
    },
  },
  beforeMount() {

    console.log(this.user)
    this.$forceUpdate()
  }
}
</script>

<style scoped>
.brief-info {
  width: 35%;
  border: 1px solid #b0b0b0;
  border-radius: 20px;
  float: left;
}
.info {
  width: 55%;
  border:  1px solid #b0b0b0;
  border-radius: 20px;
  float: right;
}
</style>
