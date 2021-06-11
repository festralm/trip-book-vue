<template>
  <b-col class="auto col-3">
    <img class="image" :src="require(`../assets/${this.car.photos[0]}`)" @click="openCar(car.id)"/>
<!--    v-bind:src="'/img/' + car.photos[0].replace('.', '.de7ea3e8.')"-->
    <p class="name" @click="openCar(car.id)">{{car.name}}</p>
  </b-col>
</template>

<script>
import router from "@/router";

export default {
  name: "CarForSearch",
  props: {
    car: {},
  },
  data() {
    return {
      url: '',
    }
  },
  methods: {
    async openCar(id) {
      const request = new Request(
          "http://localhost/transports/cars/" + id,
          {
            method: "GET",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      response.text().then(data =>{
        this.$store.state.car = JSON.parse(data);
      })

      await router.push({path: `/transports/cars/${id}`});
    }
  }
}
</script>

<style scoped>
.image {
  width: 270px;
  height: 270px;
  object-fit: cover;
  border-radius: 20px;
  cursor: pointer;
}

.auto {
  width: 25%;
}
.name {
  font-family: 'Roboto Mono', monospace;
  cursor: pointer;
  padding-left: 10px;
  padding-top: 10px;
  font-weight: 400;
  font-size: 20px;
}
</style>
