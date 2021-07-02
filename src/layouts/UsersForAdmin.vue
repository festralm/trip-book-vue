<template>
  <div class="users-for-admin mt-5 pt-5 mb-3" id="users">
    <div class="sort-container pb-5">
      <div ><b-select @change="sort()" class="px-3 my-select" v-model="sortType" :options="sortOptions"></b-select></div>
      <div ><b-select @change="sort()" class="px-3 my-select" v-model="sortObject" :options="objectOptions"></b-select></div>
    </div>
    <div class="users-container">
      <div class="user pt-3 " v-for="(user, key) in $store.state.users" v-bind:user="user" :key="key">
        <a v-bind:href="`/admin/users/${user.id}`">
        <img class="image pb-2" :src="require(`../assets/${user.photoUrl}`)"/>
        </a>
        <div class="text-container text-center">
          <a v-bind:href="`/admin/users/${user.id}`" class="px-1 mb-1">ID: {{user.id}}</a>
          <a v-if="user.name !== null && user.name !== ''" v-bind:href="`/admin/users/${user.id}`"
             class="px-1 mb-1">{{user.name}}</a>
          <a v-bind:href="`/admin/users/${user.id}`" class="px-1">{{user.email}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from "../router";

export default {
  name: "UsersForAdmin",
  data() {
    return {
      sortType: null,
      sortOptions: [
        { value: null, text: "По умолчанию"},
        { value: true, text: "По возрастанию"},
        { value: false, text: "По убыванию"},
      ],
      sortObject: null,
      objectOptions: [
        { value: null, text: "Сортировать по"},
        { value: true, text: "ID"},
        { value: false, text: "Email"},
      ]
    }
  },
  methods: {
    sort() {
      if (this.sortType !== null && this.sortObject !== null) {
        if (this.sortObject === true) {
          var idComparator = function (a, b) {
            return a.id - b.id;
          };
          if (this.sortType === true) {
            this.$store.state.users =  this.$store.state.users.sort(idComparator)
          } else {
            this.$store.state.users =  this.$store.state.users.sort((a, b) =>  -idComparator(a, b))
          }
        } else {
          var emailComparator = function (a, b) {
            return a.email > b.email ? 1
                : a.email < b.email ? -1
                : 0;
          };
          if (this.sortType === true) {
            this.$store.state.users =  this.$store.state.users.sort(emailComparator)
          } else {
            this.$store.state.users =  this.$store.state.users.sort((a, b) =>-emailComparator(a, b))
          }
        }
      }
      console.log(this.$store.state.users)
      this.$forceUpdate();
    },
  },
  async beforeMount() {
    const request = new Request(
        "http://localhost/admin/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
    );
    if (this.$store.state.token !== null) {
      request.headers.append("Authorization", this.$store.state.token);
    }
    var response = await fetch(request);
    if (response.status === 200) {
      response.json().then(data => {
        this.$store.state.users = data;
      })
    } else {
      await router.push("/error/default")
    }
  }
}
</script>

<style scoped>

.sort-container {
  display: flex;
  font-family: 'Roboto Mono', monospace;
  font-size: 18px;
  justify-content: space-evenly;
}

.my-select {
  width: 230px;
  border: 2px solid #eedcdc;
  border-radius: 20px;
  cursor: pointer;
}

.my-select:hover {
  border: 2px solid #b8a7a7;
}

.users-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1120px;
  margin: auto;
}

.user {
  margin: 10px 40px 10px 40px;
}

.image {
  cursor: pointer;
  border-radius: 50%;
}

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.text-container {
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 200px;
}
.text-container a:hover {
  color: #b8a7a7;
}
.text-container a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
text-decoration: none;
  color: black;
}
</style>

