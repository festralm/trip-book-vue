<template>
  <div class="list-wrapper mt-4 ">
    <div class="car" v-for="(car, key) in list" v-bind:car="car" :key="key">
      <a v-bind:href="`/transports/cars/${car.id}`">
        <img class="image pb-2" :src="require(`../assets/${car.carPhotoUrls[0]}`)"/>
      </a>
      <div  class="text-container ">
        <a v-bind:href="`/transports/cars/${car.id}`" class="px-1 pb-2">{{car.name}}</a>
        <div class="model">
          <p class="p-0 m-0 pb-1">{{car.brand}} {{car.model}}</p>
        </div>
        <div class="time">
          <p class="p-0 m-0">С {{getDate(car, true)}} по {{getDate(car, false)}}</p>
        </div>
<!--        todo onclick-->
        <b-button class="mt-3" v-if="review === true" variant="outline-warning"
        @click="getReviewPage">Оставить отзыв</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Trip",
  props: {
    list: {},
    review: null,
  },
  data() {
    return {
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
    getReviewPage() {

    },
    getDate(car, start) {
      let date;
      if (start) {
        date = new Date(car.start);
      } else {
        date = new Date(car.finish);
      }
      let res = date.getDate() + " " + this.months[date.getMonth()];
      if (new Date().getFullYear() !== date.getFullYear()) {
        res += date.getFullYear();
      }
      if (car.forHour) {
        res += ', ' + date.getHours() + ":00"
      }
      return res;
    }
  }
}
</script>

<style scoped>

.car {
  display: flex;
  margin: 10px 20px 10px 20px;
}
.car:hover {
  background-color: #fff9f9;
  border-radius: 30px;
}
.image {
  cursor: pointer;
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 20px;
  margin: 20px ;
}

.text-container {
  margin: 20px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  width: 240px;
}
.time {
  font-weight: normal;
  font-size: 15px;
}


.list-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
}


.text-container a {
  display: block;
  font-family: 'Roboto Mono', monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  color: black;
}
.text-container a:hover {
  color: #b8a7a7;
}

.model {
  font-size: 17px;
  font-weight: normal;
}
</style>
