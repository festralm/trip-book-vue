<template>

  <div class="cars-for-admin mt-5 pt-5 mb-3" id="cars">
    <div class="sort-container pb-5">
      <div ><b-select @change="sort()" class="px-3 my-select" v-model="sortType" :options="sortOptions">
      </b-select></div>
     </div>
    <div class="users-container">
      <div class="user pt-3 " v-for="(user, key) in $store.state.cars" v-bind:user="user" :key="key">
        <a v-bind:href="`/admin/cars/${user.id}`">
          <img class="image pb-2" width="200px" :src="require(`../assets/${user.carPhotoUrls[0]}`)"/>
        </a>
        <div class="text-container text-center">
          <a v-bind:href="`/admin/cars/${user.id}`" class="px-1 mb-1">ID: {{user.id}}</a>
          <a v-bind:href="`/admin/cars/${user.id}`" class="px-1">{{user.name}}</a>
          <a v-bind:href="`/admin/cars/${user.id}`" class="px-1">{{user.brand}} {{user.model}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "CarsForAdmin",
  data() {
    return {
      sortType: null,
      sortOptions: [
        { value: null, text: "По умолчанию"},
        { value: true, text: "По возрастанию"},
        { value: false, text: "По убыванию"},
      ]
    }
  },
  methods: {
    sort() {
      if (this.sortType !== null ) {
        var idComparator = function (a, b) {
          return a.id - b.id;
        };
        if (this.sortType === true) {
          this.$store.state.users =  this.$store.state.users.sort(idComparator)
        } else {
          this.$store.state.users =  this.$store.state.users.sort((a, b) =>  -idComparator(a, b))
        }
      }
      this.$forceUpdate();
    },
  },
  async beforeMount() {
    const request = new Request(
        "http://localhost/admin/car-search",
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
      await response.json().then(data => {
        this.$store.state.cars = data;
        console.log(this.$store.state.cars.length)
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
  border-radius: 20px;
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
.image {
  border-radius: 50%;
}
img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
