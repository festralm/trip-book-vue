<template>
  <div class="user-container">
    <b-row class="row-container text-center">
      <b-col class="col-2 my-button click">
        <img class="image py-2" v-bind:src="user.photoUrl"/>
      </b-col>
      <b-col @click="getUser(user.id)" class="my-button  click col-1 pt-5">
        <div> {{user.id}}</div>
      </b-col>
      <b-col @click="getUser(user.id)"  class="my-button click col-2 pt-5">
        <div> {{user.email}}</div>
      </b-col>
      <b-col class="my-button col-2 pt-5">
        <b-button @click="blockUser(user.id)" v-if="user.isBlocked === null" variant="danger"
                  class="w-100 h-50">Заблокировать</b-button>
        <b-button @click="unblockUser(user.id)" v-else variant="success"
                  class="w-100 h-50">Разблокировать</b-button>
      </b-col>
      <b-col  class="my-button col-2 pt-5">
        <b-button @click="deleteUser(user.id)" v-if="user.isDeleted === null" variant="danger"
                  class="w-100 h-50">Удалить</b-button>
        <b-button @click="restoreUser(user.id)" v-else variant="success"
                  class="w-100 h-50">Восстановить</b-button>
      </b-col>
      <b-col class="my-button col-3  pt-5">
        <b-button @click="undoAdmin(user.id)" v-if="user.role === 'ADMIN'" variant="danger"
                  class="w-100 h-50">Сделать обычным пользователем</b-button>
        <b-button @click="makeAdmin(user.id)" v-else variant="success"
                  class="w-100 h-50">Сделать администратором</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "UserForAdminSearch",
  props: {
    user: {}
  },
  data() {
    return {
    }
  },
  methods: {
    async getUser(id) {
      await router.push({path: `/admin/users/${id}`});
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
        await this.fetchUser(id);
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
        await this.fetchUser(id);
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
        await this.fetchUser(id);
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
        await this.fetchUser(id);
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
        await this.fetchUser(id);
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
        await this.fetchUser(id);
      }
    },
    async fetchUser(id) {
      const request = new Request(
          `http://localhost/admin/users/${id}`,
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
          this.user.phoneNumber = data['phoneNumber]'];
        })
      }
    }
  },
}

</script>

<style scoped>
.my-button {
  border: 1px solid #d7d7d7;
}

.click {
  cursor: pointer;
}
.click:hover {
  background: #bebebe;
  border: 1px solid #818181;
}

.image {
  width: 110px;
}
</style>
