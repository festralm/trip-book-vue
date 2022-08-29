<template>
  <div class="car">
    <p class="name pt-4">{{car['name']}}</p>
    <div class="top-container">
      <div class="image">
        <a href="#rating">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               width="18" height="18"
               viewBox="0 0 50 50"
               style=" fill:#000000;">
            <path d="M 25 1 A 1.0001 1.0001 0 0 0 24.068359 1.6386719 L 17.902344 17.535156 L 0.94921875 18.400391 A 1.0001 1.0001 0 0 0 0.3671875 20.173828 L 13.568359 30.966797 L 9.2324219 47.34375 A 1.0001 1.0001 0 0 0 10.740234 48.441406 L 25 39.289062 L 39.259766 48.441406 A 1.0001 1.0001 0 0 0 40.767578 47.34375 L 36.431641 30.966797 L 49.632812 20.173828 A 1.0001 1.0001 0 0 0 49.050781 18.400391 L 32.097656 17.535156 L 25.931641 1.6386719 A 1.0001 1.0001 0 0 0 25 1 z M 25 4.7636719 L 30.466797 18.861328 A 1.0001 1.0001 0 0 0 31.349609 19.498047 L 46.359375 20.265625 L 34.667969 29.826172 A 1.0001 1.0001 0 0 0 34.333984 30.855469 L 38.175781 45.369141 L 25.541016 37.257812 A 1.0001 1.0001 0 0 0 24.458984 37.257812 L 11.824219 45.369141 L 15.666016 30.855469 A 1.0001 1.0001 0 0 0 15.332031 29.826172 L 3.640625 20.265625 L 18.650391 19.498047 A 1.0001 1.0001 0 0 0 19.533203 18.861328 L 25 4.7636719 z">
            </path>
          </svg>
        </a>
      </div>
      <div class="top ">
        <a href="#rating" class="ps-3 fw-bold button">{{car['rating']}} ({{ car.reviews.length }} отзывов)</a>
      </div>
      <div class="top">
        <p class="px-3">·</p>
      </div>
      <div class="top">
        <p>Адрес</p>
      </div>
      <div class="right"></div>
      <div>
        <div class="car-buttons">
          <b-button class="car-button me-2" @click="blockCar(car)" v-if="car.isBlocked === false"
                    variant="outline-danger" >Заблокировать</b-button>
          <b-button class="car-button me-2" @click="unblockCar(car)" v-else
                    variant="outline-success" >Разблокировать</b-button>
          <br>
          <b-button class="car-button" @click="deleteCar(car)" v-if="car.isDeleted === false"
                    variant="outline-danger" >Удалить</b-button>
          <b-button class="car-button" @click="restoreCar(car)" v-else
                    variant="outline-success" >Восстановить</b-button>
        </div>
      </div>
    </div>
    <div class="photo-container ">
      <div v-if="car['carPhotoUrls'].length === 1">
        <img class="one-image" :src="require(`../assets/${car['carPhotoUrls'][0]}`)"/>
      </div>
      <div v-else-if="car['carPhotoUrls'].length === 2">
        <img class="two-image-first pe-1" :src="require(`../assets/${car['carPhotoUrls'][0]}`)"/>
        <img class="two-image-second ps-1" :src="require(`../assets/${car['carPhotoUrls'][1]}`)"/>
      </div>
      <div v-else-if="car['carPhotoUrls'].length === 3">
        <div class="three-photos">
          <img class="three-image-first pe-1" :src="require(`../assets/${car['carPhotoUrls'][0]}`)"/>
          <div class="three-two-photos">
            <img class="three-image-second ps-1 pb-1" :src="require(`../assets/${car['carPhotoUrls'][1]}`)"/>
            <img class="three-image-third ps-1 pt-1" :src="require(`../assets/${car['carPhotoUrls'][2]}`)"/>
          </div>
        </div>
      </div>
      <div v-else-if="car['carPhotoUrls'].length === 4">
        <div class="four-photos">
          <img class="four-image-first pe-1 pb-1" :src="require(`../assets/${car['carPhotoUrls'][0]}`)"/>
          <img class="four-image-second ps-1 pb-1" :src="require(`../assets/${car['carPhotoUrls'][1]}`)"/>
          <img class="four-image-third pe-1 pt-1" :src="require(`../assets/${car['carPhotoUrls'][2]}`)"/>
          <img class="four-image-forth ps-1 pt-1" :src="require(`../assets/${car['carPhotoUrls'][3]}`)"/>
        </div>
      </div>
      <div v-else>
        <div class="five-photos">
          <img class="five-image-first pe-1" :src="require(`../assets/${car['carPhotoUrls'][0]}`)"/>
          <div class="five-four-container">
            <img class="five-image-second ps-1 pe-1 pb-1" :src="require(`../assets/${car['carPhotoUrls'][1]}`)"/>
            <img class="five-image-third ps-1 pb-1" :src="require(`../assets/${car['carPhotoUrls'][2]}`)"/>
            <img class="five-image-forth ps-1 pe-1 pt-1" :src="require(`../assets/${car['carPhotoUrls'][3]}`)"/>
            <img class="five-image-fifth ps-1 pt-1" :src="require(`../assets/${car['carPhotoUrls'][4]}`)"/>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-container mt-5 mb-5">
      <div class="left ms-3">
        <div class="description">
          <p class="brand">{{ car['brand'] }} {{car['model']}}</p>
          <p class="with-driver">·
            <span v-if="car['withDriver'] === true">Автомобиль с водителем</span>
            <span v-else>Автомобиль без водителя</span>
            ·
          </p>
          <hr class="my-4 hr">
          <p > {{car['description']}}</p>
          <hr class="my-4 hr">
        </div>
        <div class="user mt-5">
          <p class="mt-3">Хозяин: <a v-bind:href="`/admin/users/${car.user.id}`">{{car.user.name}}</a></p>
          <a class="ms-5" v-bind:href="`/admin/users/${car.user.id}`">
            <img class="user-photo" :src="require(`../assets/${car.user.photoUrl}`)">
          </a>
        </div>
      </div>
      <div class="rent ">
        <p>
          <span  class="price" >{{getPrice(car['price'])}}₽</span> / <span v-if="car['forHour']">в час</span><span v-else>в сутки</span> </p>
        <div class="calendar-container text-center">
          <div class="me-3">
            <v-date-picker :value="null"
                           color="red"
                           v-bind:mode="car.forHour === true ? 'dateTime' : 'date'"
                           v-bind:disabled-dates="car.books"
                           is-range
                           v-model="range"
            />
          </div>
        </div>
      </div>

    </div>
    <div class="rating" id="rating">
      <div class="rating-top-container">
        <div class="image">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               width="18" height="18"
               viewBox="0 0 226 226"
               style=" fill:#000000;">
            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none"  font-size="none" style="mix-blend-mode: normal">
              <path d="M0,226v-226h226v226z" fill="none">
              </path>
              <g fill="#f1c40f">
                <path d="M113,4.52c-1.86473,0.00162 -3.53712,1.14809 -4.21102,2.8868l-27.87039,71.85211l-76.62813,3.91086c-1.86719,0.09451 -3.48354,1.32871 -4.06653,3.10506c-0.58299,1.77636 -0.01231,3.72832 1.43575,4.91087l59.6693,48.78422l-19.59844,74.02383c-0.4789,1.80371 0.19982,3.71631 1.70858,4.81466c1.50876,1.09835 3.53739,1.15664 5.10673,0.14675l64.45414,-41.36859l64.45414,41.36859c1.56934,1.00989 3.59797,0.9516 5.10673,-0.14675c1.50876,-1.09835 2.18749,-3.01095 1.70858,-4.81466l-19.59844,-74.02383l59.66929,-48.78422c1.44806,-1.18256 2.01874,-3.13452 1.43575,-4.91087c-0.58299,-1.77636 -2.19934,-3.01055 -4.06653,-3.10506l-76.62812,-3.91086l-27.87039,-71.85211c-0.6739,-1.7387 -2.34628,-2.88518 -4.21102,-2.8868zM113,21.5318l24.70992,63.72141c0.64587,1.66252 2.20892,2.78985 3.99031,2.87797l67.84414,3.46945l-52.84516,43.21367c-1.3712,1.12114 -1.96132,2.93979 -1.50961,4.65242l17.36492,65.6018l-57.10914,-36.66321c-1.48951,-0.95805 -3.40128,-0.95805 -4.89078,0l-57.10914,36.66321l17.36492,-65.6018c0.45171,-1.71263 -0.13841,-3.53128 -1.50961,-4.65242l-52.84516,-43.21367l67.84414,-3.46945c1.78139,-0.08812 3.34444,-1.21545 3.99031,-2.87797z">
                </path>
              </g>
            </g>
          </svg>
        </div>
        <div class="top">
          <p href="" class="ps-3 fw-bold">{{car['rating']}} · {{ car.reviews.length }} отзывов</p>
        </div>
      </div>
      <div class="review-list">
        <div class="review" v-for="(review, key) in car.reviews" v-bind:review="review" v-bind:key="key">
          <div class="review-user">
            <a class="me-3 mb-3" v-bind:href="`/users/${review.user.id}`"><img :src="require(`../assets/${review.user.photoUrl}`)"/></a>
            <div>
              <a v-bind:href="`/users/${review.user.id}`">{{review.user.name}}</a>
              <p class="p-0 m-0">{{months[new Date(review.datetime).getMonth()]}} {{new Date(review.datetime).getFullYear()}}г.</p>
            </div>
          </div>
          <div class="review-description">
            <p>{{review.text}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "CarForAdmin",
  data() {
    return {
      months: [
        'январь',
        'февраль',
        'март',
        'апрель',
        'май',
        'июнь',
        'июль',
        'август',
        'сентябрь',
        'октябрь',
        'ноябрь',
        'декабрь',
      ],
      car: {
        id: 0,
        finish: null,
        start: null,
        forHour: null,
        brand: '',
        price: 0,
        carPhotoUrls: [],
        description: '',
        model: '',
        name: '',
        rating: 0,
        user: {},
        withDriver: null,
        books: []
      },
      range: {
        start: null,
        end: null
      }
    }
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
      if (this.car.forHour) {
        hour = date.getHours();
      }
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
          hour, minute, second, ms).getTime()
    },
    async editBooks() {
      this.car['start'] = (new Date() > new Date(this.car['start']) ? new Date() :
          new Date(this.car['start'])).getTime()
      this.car['finish'] = new Date(this.car['finish']).getTime()
      this.car.books = this.car.books.map((x) => {
            return {
              start: new Date(x.start).getTime(),
              end: new Date(x.end).getTime()
            }
          }
      );
      this.car.books.push(
          {
            start: null,
            end: this.car['start'] - 1000 * 60 * 60 * 24
          },
          {
            start: this.car['finish'] + 1000 * 60 * 60 * 24,
            end: null
          },
      )
    },
    async getCar() {
      const request = new Request(
          "http://localhost/admin/cars/" + router.history.current.params['id'],
          {
            method: "GET",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);
      if (response.status === 200) {
        this.car = await response.json()
        await this.editBooks();
      } else {
        await router.push("/error/default")
      }
    },
    getPrice(oldPrice) {
      var price = oldPrice.toString();
      for (var i = price.length - 3; i > 0; i -= 3) {
        price = price.substr(0, i) + ' ' + price.substr(i)
      }
      return  price;
    },
  },
  async beforeMount() {
    this.$store.state.fixed = false;
    await this.getCar();
    this.$forceUpdate()
  },
}
</script>

<style scoped>
.car {
  width: 80%;
  margin: auto;
  font-family: 'Roboto Mono', monospace;
}

.name {
  font-size: 25px;
}
.top-container, .rating-top-container {
  display: flex;
}
.image img{
  width: 17px;
}
.top {
  font-size: 17px;
  padding-top: 3px;
}
.right {
  flex-grow: 8;
}

.top-container img, .top-container p, .top-container a, .rating-top-container a {
  color: black;
  text-decoration: none;
}

.button:hover {
  cursor: pointer;
  color: #b8a7a7;
}

.photo-container img {
}
.one-image {
  border-radius: 30px;
  width: 100%;
  height: 550px;
  object-fit: cover;
}
.two-image-first, .two-image-second {
  width: 50%;
  height: 450px;
  object-fit: cover;
}
.two-image-first {
  border-radius: 30px 0 0 30px;
}
.two-image-second {
  border-radius: 0 30px 30px 0;
}
.three-image-first {
  width: 60%;
  height: 450px;
  object-fit: cover;
  border-radius: 30px 0 0 30px;
}
.three-image-second, .three-image-third {
  width: 100%;
  height: 225px;
  object-fit: cover;
}
.three-photos {
  display: flex;
}
.three-two-photos {
  display: flex;
  flex-flow: column;
}
.three-image-second {
  border-radius: 0 30px 0 0;
}
.three-image-third {
  border-radius: 0 0 30px 0;
}

.four-photos {
  display: flex;
  flex-wrap: wrap;
}

.four-image-first {
  width: 70%;
  height: 250px;
  object-fit: cover;
  border-radius: 30px 0 0 0 ;
}
.four-image-second {
  width: 30%;
  height: 250px;
  object-fit: cover;
  border-radius: 0 30px 0 0 ;
}
.four-image-third {
  width: 40%;
  height: 250px;
  object-fit: cover;
  border-radius: 0 0 0 30px;
}
.four-image-forth {
  width: 60%;
  height: 250px;
  object-fit: cover;
  border-radius: 0 0 30px 0 ;
}

.five-image-first {
  width: 50%;
  height: 400px;
  object-fit: cover;
  border-radius: 30px 0 0 30px;
}

.five-four-container {
  display: flex;
  flex-wrap: wrap;
}
.five-image-second {
  width: 50%;
  height: 200px;
  object-fit: cover;
}
.five-image-third {
  width: 50%;
  height: 200px;
  object-fit: cover;
  border-radius:  0 30px 0 0;
}
.five-image-forth {
  width: 50%;
  height: 200px;
  object-fit: cover;
}
.five-image-fifth {
  width: 50%;
  height: 200px;
  object-fit: cover;
  border-radius:  0 0  30px 0 ;
}
.five-photos {
  display: flex;
}
.flex-container {
  display: flex;
}
.left {
  width: 60%;
  margin-right: 120px;

}
.description {
  font-size: 17px;
  line-height: 28px;
}

.rent {
  margin: 0 20px 0 20px;
  width: 320px;
  border-radius: 20px;
  border: 1px solid #b8a7a7;
  box-shadow: 0 0px 20px 1px #dedede;
  padding: 30px;
}

.price {
  font-size: 20px;
  font-weight: bold;
}
.brand {
  font-size: 25px;
}

.hr {
  height: 1px;
  color: #b8a7a7;
}
.with-driver {
  font-size: 15px;
  color: #b8a7a7;
}

.rating-top-container .top {
  font-size: 19px;
  padding-top: 0px;
}

.rating-top-container .image img{
  width: 19px;
}

.user a, .user p {
  font-size: 20px;
  text-decoration: none;
  color: black;
}

.user a:hover {
  color: #b8a7a7;
}
.user {
  display: flex;
}

.user-photo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.review-list {
  display: flex;
  flex-wrap: wrap;
}
.review-user img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.review-user {
  display: flex;
}

.review-user a {
  text-decoration: none;
  color: black;
  font-size: 18px;
}

.review-user p {
  font-size: 15px;
  color: #b8a7a7;
}

.review-user a:hover {
  color: #b8a7a7;
}

.review-description {
  font-size: 17px;
}

.review {
  margin: 30px;
  padding: 10px;
  width: 547px;
}

.car-button {
  padding: 1px 3px 1px 3px;
}

.car-buttons {
  display: flex;
}

</style>
