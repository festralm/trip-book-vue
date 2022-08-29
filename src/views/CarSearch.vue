<template>
  <div class="car-search">
    <div class="left">
      <div class="driver mb-3">
        <b-button class="me-2"
                  v-bind:variant="$store.state.carSearch.withDriver === true ? 'secondary' : 'outline-secondary'"
                  @click="changeDriver(true); searchCar()">
          С водителем</b-button>
        <b-button class="me-2"
                  v-bind:variant="$store.state.carSearch.withDriver === false ? 'secondary' : 'outline-secondary'"
                  @click="changeDriver(false); searchCar()">
          Без водителя</b-button>
        <b-button v-bind:variant="$store.state.carSearch.withDriver == null ? 'secondary' : 'outline-secondary'"
                  @click="changeDriver(null); searchCar()">
          Все</b-button>
      </div>
      <div class="brands mb-2">
        <b-select @change="getModels(); searchCar();"  class="form-select my-input"
                  v-model="brand"
                  :options="brands"></b-select>
      </div>
      <div class="models">
        <b-select  @change="searchCar()" class="form-select my-input"
                   v-model="model"
                   :options="models"></b-select>
      </div>
      <p class="name" v-if="$store.state.chosenCar == null">Выберите автомобиль</p>
      <p class="name" v-else>Выбранный автомобиль</p>
      <div v-if="$store.state.chosenCar !== null" class="car">
        <div class="photo">
          <a :href="`/transports/cars/${$store.state.chosenCar.id}`">
            <img class="one-image" :src="require(`../assets/${$store.state.chosenCar['carPhotoUrls'][0]}`)"/>
          </a>
        </div>
        <div class="reviews mt-2">
          <div class="car-image">
            <a v-bind:href="`/transports/cars/${$store.state.chosenCar.id}#rating`">
              <img src="../assets/rating.png"></a>
          </div>
          <div class="top pt-1">
            <a v-bind:href="`/transports/cars/${$store.state.chosenCar.id}#rating`"
               class="ps-2  button">{{$store.state.chosenCar.rating}} ({{$store.state.chosenCar.reviews.length}} отзывов)</a>
          </div>
        </div>
        <a class="my-text" v-bind:href="`/transports/cars/${$store.state.chosenCar.id}`">{{$store.state.chosenCar.name}}</a>
        <br>
        <a class="my-text"  v-bind:href="`/transports/cars/${$store.state.chosenCar.id}`">
          {{$store.state.chosenCar.brand}} {{$store.state.chosenCar.model}}</a>
        <p class="my-text" ><span class="price">{{$store.state.chosenCar.price}}₽</span> / <span v-if="$store.state.chosenCar.forHour">час</span>
          <span v-else>сутки</span></p>
      </div>
    </div>
    <my-map></my-map>
  </div>
</template>

<script>
import MyMap from "../components/MyMap";
import router from "../router";
export default {
  name: "CarSearch",
  components: {MyMap},
  data() {
    return {
      brands: [],
      models: [],
      model: 0,
      brand: 0,
    }
  },
  methods: {
    async getModels() {
      this.model = 0;
      var request = new Request(
          "http://localhost/car/" + this.brand + "/models",
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
          this.models = data.reduce((opts, model) => {
            opts.push({
              "value": model['id'],
              "text": model['name']
            })
            return opts;
          }, []);
          this.models.push({
            "value": 0,
            "text": 'Выберите модель'
          })
          this.$forceUpdate()
        })
      } else {
        await router.push("/error/default")
      }
    },
    async searchCar() {
      this.$store.state.carSearch.start =
          this.getNormalDate(new Date(this.$store.state.carSearch.start), true);
      this.$store.state.carSearch.finish =
          this.getNormalDate(new Date(this.$store.state.carSearch.finish), false);
      if (this.brand === 0) {
        this.$store.state.carSearch.brand = null
      } else {
        this.$store.state.carSearch.brand = this.brand
      }
      if (this.model === 0) {
        this.$store.state.carSearch.model = null
      } else {
        this.$store.state.carSearch.model = this.model
      }
      console.log(this.$store.state.carSearch)
      const request = new Request(
          "http://localhost/car/search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.$store.state.carSearch),
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        await response.text().then(data => {
          this.$store.state.cars = JSON.parse(data);
        })
      } else {
        await router.push("/error/default")
      }
    },
    changeDriver(val) {
      this.$store.state.carSearch.withDriver = val;
      this.$forceUpdate()
    },
    getDate(now) {
      console.log(this.$store.state.carSearch.start)
      console.log(this.$store.state.carSearch.finish)
      console.log(now)
      var month = now.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      var date = now.getDate();
      if (date < 10) {
        date = '0' + date;
      }
      var res = now.getFullYear() + '-' + month + '-' + date
      console.log(res)
      console.log(' ')
      return res;
    },
    getNormalDate(date, start) {
      if (start) {
        var hour = 0;
        var minute = 0;
        var second = 0;
        var ms = 0;
      } else {
        hour = 23;
        minute = 59;
        second = 59;
        ms = 999;
      }
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
          hour, minute, second, ms).getTime()
    },
    async getBrands() {

      var request = new Request(
          "http://localhost/car/brands",
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
          this.brands = data.reduce((opts, brand) => {
            opts.push({
              "value": brand['id'],
              "text": brand['name']
            })
            return opts;
          }, []);
          this.brands.push({
            "value": 0,
            "text": 'Выберите марку'
          })
          this.$forceUpdate()
        })
      } else {
        await router.push("/error/default")
      }
    },
  },
  async beforeMount() {
    await this.searchCar()
    await this.getBrands();
    this.models.push({
      "value": 0,
      "text": 'Выберите модель'
    })
  }
}
</script>

<style scoped>
.car-search {
  margin-top: 70px;
  display: flex;
}

.left {
  margin-top: 30px;
  width: 50%;
  height: 100%;
  margin-left: 70px;
  font-family: 'Roboto Mono', monospace;
}

.name {
  font-size: 30px;
  font-weight: bold;
}

.car {
}
.photo img {
  border-radius: 20px;
  width: 50%;
  height: 200px;
  object-fit: cover;
}

.car a {
  font-family: 'Roboto Mono', monospace;
  color: black;
  text-decoration: none;

}
.car a:hover {
  color: #b8a7a7;
}

.car-image img {
  width: 15px;
}

.reviews {
  display: flex;
}

.top {
  font-size: 15px;
}

.my-text {
  font-size: 18px;
}

.my-text .price {
  font-weight: bold;
}
.brands, .models {
  width: 50%;
}
</style>
