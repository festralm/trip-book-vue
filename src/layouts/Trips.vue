<template>

  <div class="my-list">
    <div class="transport-list-wrapper mb-3">
      <div class="cars list">
        <p class="type p-0 m-0">Предстоящие поездки</p>
        <div class="list-wrapper mt-4 mb-5">
          <div class="car" v-for="(car, key) in user.books" v-bind:car="car" :key="key">
            <a v-bind:href="`/transports/cars/${car.id}`">
              <img class="image pb-2" :src="require(`../assets/${car.carPhotoUrls[0]}`)"/>
            </a>
            <div  class="text-container text-center">
              <a v-bind:href="`/transports/cars/${car.id}`" class="px-1">{{car.name}}</a>
              <div class="time">
              <p class="p-0 m-0">С {{getDate(car, true)}} по {{getDate(car, false)}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="transport-list-wrapper mb-3">
      <div class="cars list">
        <p class="type p-0 m-0">Прошлые поездки</p>
        <div class="list-wrapper mt-4 mb-5">
          <div class="car" v-for="(car, key) in oldBooks" v-bind:car="car" :key="key">
            <a v-bind:href="`/transports/cars/${car.id}`">
              <img class="image pb-2" :src="require(`../assets/${car.carPhotoUrls[0]}`)"/>
            </a>
            <div  class="text-container text-center">
              <a v-bind:href="`/transports/cars/${car.id}`" class="px-1">{{car.name}}</a>
              <div class="time">
                <p class="p-0 m-0">С {{getDate(car, true)}} по {{getDate(car, false)}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import TransportsList from "./TransportsList";

export default {
  name: "Trips",
  data() {
    return {
      oldBooks: [],
      user: {
        books: [],
        cars: [],
        email: null,
        id: 0,
        photoUrl: '',
        role: '',
        wishlist: [],
      },
      months: [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
      ]
    }
  },
  methods: {
    getDate(car, start) {
      if (start) {
        var date = new Date(car.start);
      } else {
        date = new Date(car.finish);
      }
      var res = date.getDate() + " " + this.months[date.getMonth()];
      if (new Date().getFullYear() !== date.getFullYear()) {
        res += date.getFullYear();
      }
      if (car.forHour) {
        res += ', ' + date.getHours() + ":00"
      }
      return res;
    }
  },
  async beforeMount() {
    var request = new Request(
        "http://localhost/profile",
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
        console.log(data)
        this.user = data;
        this.oldBooks = this.user.books.filter(x => new Date(x.start).getTime() < new Date());
        this.$forceUpdate();
      })
    } else {
      await router.push("/error/default")
    }
  }
}
</script>

<style scoped>

.my-list {
  margin-top: 70px;
  min-height: 600px;

}
.transport-list-wrapper {
  font-family: 'Roboto Mono', monospace;
  margin: 120px auto auto auto;
  width: 1200px;
}

.type {
  font-family: 'Roboto Mono', monospace;
  font-size: 30px;
  font-weight: 600;
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
  margin: 10px 30px 10px 30px;
}

.image {
  cursor: pointer;
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 20px;
}

.text-container {
  font-size: 17px;
  cursor: pointer;
  font-weight: bold;
  width: 240px;
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
.time {
  font-weight: normal;
  font-size: 15px;
}
</style>
