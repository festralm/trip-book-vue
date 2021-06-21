<template>
  <div class="transport-list-wrapper mb-3">
    <div class="cars list">
      <a href="/" class="type p-0 m-0">Легковые автомобили ></a>
<!--      todo search-->
      <div class="list-wrapper mt-4">
        <div class="car" v-for="(car, key) in $store.state.cars" v-bind:car="car" :key="key">
          <a v-bind:href="`/transports/cars/${car.id}`">
            <img class="image pb-2" :src="require(`../assets/${car.carPhotoUrls[0]}`)"/>
          </a>
          <div  class="text-container text-center">
            <a v-bind:href="`/transports/cars/${car.id}`" class="px-1">{{car.name}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Transports",
  methods: {
  },
  async beforeMount() {
    const request = new Request(
        "http://localhost/car/best/4",
        {
          method: "GET",
        }
    );
    if (this.$store.state.token !== null) {
      request.headers.append("Authorization", this.$store.state.token);
    }
    var response = await fetch(request);

    if (response.status === 200) {
      response.text().then(data => {
        this.$store.state.cars = JSON.parse(data);
      })
    } else {
      await router.push("/error/default")
    }
  },
}
</script>

<style scoped>

.transport-list-wrapper {
  margin: 50px auto auto auto;
  width: 1200px;
}

.type {

  font-family: 'Roboto Mono', monospace;
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.list-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
}


.car {
  margin: 10px 20px 10px 20px;
}

.image {
  cursor: pointer;
  width: 260px;
  height: 260px;
  object-fit: cover;
  border-radius: 20px;
}

.text-container {
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  width: 260px;
}
.text-container a {
  display: block;
  font-family: 'Roboto Mono', monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  color: black;
}
.text-container a:hover {
  color: #b8a7a7;
}
</style>
