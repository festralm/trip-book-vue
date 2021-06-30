<template>
  <div class="car-container" v-if="list !== null && list !== undefined && list.length > 0">
    <div class="car" v-for="(car, key) in list" v-bind:car="car" :key="key">
      <a v-bind:href="`/transports/cars/${car.id}`">
        <img class="car-photo" :src="require(`../assets/${car.carPhotoUrls[0]}`)"/>
      </a>
      <div class="rating-container">
        <div class="car-image">
          <a v-bind:href="`/transports/cars/${car.id}`"><img src="../assets/rating.png"></a>
        </div>
        <div class="top ">
          <a v-bind:href="`/transports/cars/${car.id}`" class="ps-2  button">{{car.rating}} ({{car.reviews.length}} отзывов)</a>
        </div>
      </div>
      <a v-bind:href="`/transports/cars/${car.id}`">{{car.name}}</a>
      <br>
      <a  v-bind:href="`/transports/cars/${car.id}`">{{car.brand}} {{car.model}}</a>
      <b-button class="car-button" @click="blockCar(car)" v-if="car.isBlocked === false"
                variant="outline-danger" >Заблокировать</b-button>
      <b-button class="car-button" @click="unblockCar(car)" v-else
                variant="outline-success" >Разблокировать</b-button>
      <br>
      <b-button class="car-button" @click="deleteCar(car)" v-if="car.isDeleted === false"
                variant="outline-danger" >Удалить</b-button>
      <b-button class="car-button" @click="restoreCar(car)" v-else
                variant="outline-success" >Восстановить</b-button>
    </div>
  </div>
    <div class="no-trip text-center" v-else><p>Поездок пока нет</p></div>
</template>

<script>
import router from "../router";

export default {
  name: "CarsForAdmin",
  props: {
    list: [],
  },
  methods: {

    async blockCar(car) {
      const request = new Request(
          `http://localhost/admin/cars/ban/${car.id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        this.$forceUpdate()
        car.isBlocked = true;
      } else {
        await router.push("/error/default")
      }
    },
    async unblockCar(car) {
      const request = new Request(
          `http://localhost/admin/cars/unban/${car.id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        car.isBlocked = false;
      } else {
        await router.push("/error/default")
      }
    },
    async deleteCar(car) {
      const request = new Request(
          `http://localhost/admin/cars/delete/${car.id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        car.isDeleted = true;
      } else {
        await router.push("/error/default")
      }
    },
    async restoreCar(car) {
      const request = new Request(
          `http://localhost/admin/cars/restore/${car.id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        car.isDeleted = false;
      } else {
        await router.push("/error/default")
      }
    },
  },
  beforeMount() {
    console.log(this.list)
  }
}
</script>

<style scoped>

.car-button {
  width: 100%;
  margin-top: 10px;
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
.no-trip {
  margin: 20px;
  width: 100%;
  height: 120px;
  background-color: #fff9f9;
  border-radius: 20px;
  font-size: 25px;
  color: #b8a7a7;
  padding: 40px 20px 20px;
}
</style>
