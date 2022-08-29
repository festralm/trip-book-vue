<template>
<div class="car">
  <p class="name">{{$store.state.car['name']}}</p>
  <b-row>
    <b-col class="col-2">
      <p class="button"> <img width="20px" src="../assets/rating.jpg"> {{(Math.round($store.state.car['rating'] * 100) / 100).toFixed(2)}} (Отзывы)</p>
    </b-col>
    <b-col class="col-1">
      <p class="button">Адрес</p>
    </b-col>
    <b-col class="offset-8 col-1">
      <p class="button" @click="saveWishlist($store.state.car['id'])">Сохранить</p>
    </b-col>
  </b-row>
  <img class="image" :src="require(`../assets/${$store.state.car.photos[0]}`)"/>
</div>
</template>

<script>
import router from "@/router";

export default {
  name: "Car",
  methods: {
    async saveWishlist(id) {
      const request = new Request(
          "http://localhost/transports/cars/wishlist/" + id,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);


      response.text().then(data =>{
        this.$store.state.car = JSON.parse(data);
      })


    }
  },
  beforeMount() {
  }
}
</script>

<style scoped>
.car {
  width: 80%;
  margin: auto;
}

.name {
  font-size: 25px;
  padding: 10px;
}

.image {
  width: 50%;
}
p {

  font-family: 'Roboto Mono', monospace;
}

.button {
  font-size: 15px;
  cursor: pointer;
}
</style>
