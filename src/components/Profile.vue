<template>
  <div class="user-wrapper ">
    <div class="my-card" >
      <div class="card">
        <div class="photo-container text-center">
          <img class="photo text-center" :src="require(`../assets/${user.photoUrl}`)"/>
        </div>
        <div class="info mx-4 text-left">
          <p class="fw-bold mt-2 ">Email: {{user.email}}</p>
        </div>
      </div>
    </div>
    <div class="more-info">
      <p class="name p-0 m-0">Здравствуйте, меня зовут {{user.name}}!</p>
      <p class="p-0 m-0 pt-1 joined mb-5">На Tripbook с {{new Date(user.joined).getFullYear()}}</p>
      <div v-if="user.description !== null && user.description !== ''">
        <p class="info-name mpt-5">Информация</p>
        <p class="description">{{ user.description }}</p>
      </div>
      <div class="mb-5" v-if="user.cars !== null && user.cars !== undefined && user.cars.length > 0">
        <hr class="hr my-4">
        <p class="info-name">Объявления</p>
        <div class="car-container">
          <div class="car" v-for="(car, key) in user.cars" v-bind:car="car" :key="key">
            <a v-bind:href="`/transports/cars/${car.id}`">
              <img class="car-photo" :src="require(`../assets/${car.carPhotoUrls[0]}`)"/>
            </a>
            <div class="rating-container">
              <div class="car-image">
                <a v-bind:href="`/transports/cars/${car.id}`"><img src="../assets/rating.png"></a>
              </div>
              <div class="top ">
                <a v-bind:href="`/transports/cars/${car.id}`"
                   class="ps-2  button">{{car.rating}} ({{car.reviews.length}} отзывов)</a>
              </div>
            </div>
            <a v-bind:href="`/transports/cars/${car.id}`">{{car.name}}</a>
            <br>
            <a v-bind:href="`/transports/cars/${car.id}`">{{car.brand}} {{car.model}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Profile",
  props: {
    id: null
  },
  data() {
    return {
      user: {},
    }
  },
  methods: {
    async getUser() {
      let url;
      if (this.id === null) {
        url = 'http://localhost/profile';
      } else {
        url = 'http://localhost/users/' + this.id
      }
      const request = new Request(
          url,
          {
            method: "GET"
          }
      );
      if (this.$store.state.token !== '') {
        request.headers.append("Authorization", this.$store.state.token);
      }
      const response = await fetch(request);
      if (response.status === 200) {
        this.user = await response.json()
      } else {
        await router.push("error/default")
      }
      this.$forceUpdate()

    },
  },
  async beforeMount() {
    await this.getUser();
    this.user.cars.sort((x, y) => y.rating - x.rating)
    console.log(this.user.cars)
  }
}
</script>

<style scoped>
.user-wrapper {
  font-family: 'Roboto Mono', monospace;
  margin: 140px auto;
  width: 70%;
  display: flex;
  flex-flow: row;
}

.my-card {
  width: 320px;
}
.card {
  box-shadow: 0 0 20px 1px #dedede;
  border-radius: 15px;
  border: 1px solid #b8a7a7;

}
.photo {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin: 50px 0 20px 0;
}
.image img{
  width: 17px;
}
.top {
  font-size: 17px;
  padding-top: 3px;
}
.top a {
  text-decoration: none;
  color: black;
}
.button:hover {
  cursor: pointer;
  color: #b8a7a7;
}
.rating-container {
  display: flex;
}

.more-info {
  margin: 0 0 0 100px;
}

.name {
  font-weight: bold;
  font-size: 25px;
}

.joined {
  font-size: 15px;
  color: #b8a7a7;
}

.info-name {
  font-size: 21px;
  font-weight: 600;
}
.hr {
  height: 1px;
  color: #b8a7a7;
}

.car-container {
  display: flex;
  width: 600px;
  flex-wrap: wrap;
}

.car-photo {
  width: 280px;
  height: 170px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 10px;
}
.car {
  width: 280px;
  margin: 0 10px 30px 10px;
}

.car a {
  text-decoration: none;
  color: black;
  font-size: 15px;
}

.car a:hover, .car p:hover {
  color: #b8a7a7;
}
.car-image img{
  width: 15px;
}
</style>
