<template>
  <div class="car">
    <p class="name pt-4">{{car['name']}}</p>
    <div class="top-container">
      <div class="image">
        <!--        todo rate-->
        <a href=""><img src="../assets/rating.png"></a>
      </div>
      <div class="top ">
        <a href="" class="ps-3 fw-bold button">{{car['rating']}} (Количество)</a>
      </div>
      <div class="top">
        <p class="px-3">·</p>
      </div>
      <div class="top">
        <p>Адрес</p>
      </div>
      <div class="right"></div>
      <div class="image button">
        <img src="../assets/heart-empty.png">
      </div>
      <!--      todo wishlist-->
      <div  class="top px-3">
        <p class="button">Сохранить</p>
      </div>
    </div>
    <div class="photo-container">
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
    <div class="flex-container mt-5">
      <div class="description">
        <p>{{car['description']}}</p>
      </div>
      <div class="rent">
        <p ><span class="price" >{{getPrice(car['price'])}}₽</span> / <span v-if="car['forHour']">в час</span><span v-else>в сутки</span> </p>

        <div class="calendar-container">
          <div class="me-3">
            <p class="p-0 m-1 text-center">Выберите даты</p>
            <v-date-picker
                :value="null"
                color="red"
                mode="dateTime"
                :available-dates="[{
                  start: (new Date() > new Date(car['start']) ? new Date() :  new Date(car['start'])) ,
                  end: new Date(car['finish'])
                },
                ]"
                is-range
                v-model="range"
            />
          </div>
        </div>
        <div class="rent-button">
          <b-button>Написать продавцу</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import router from "@/router";


export default {
  name: "Car",
  data() {
    return {
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
      },
      range: {
        start: new Date(),
        end: new Date()
      }
    }
  },
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

      if (response.status === 200) {
        response.text().then(data => {
          this.$store.state.car = JSON.parse(data);
        })
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
    const request = new Request(
        "http://localhost/car/" + router.history.current.params['id'],
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
        const statusNumber = data['statusNumber'];
        if (statusNumber === 10 || statusNumber === 11 || statusNumber === 12) {
          router.push("/error/default")
        }
        this.car = JSON.parse(data);
      })
    } else {
      await router.push("/error/default")
    }
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

.top-container {
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

.top-container img, .top-container p, .top-container a {
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

.description {
  width: 70%;
  font-size: 17px;
  line-height: 28px;
}

.rent {
  margin: 0 20px 0 20px;
  width: 320px;
  height: 600px;
  border-radius: 20px;
  border: 1px solid #b8a7a7;
  box-shadow: 0 0px 20px 1px #dedede;
  padding: 30px;
}

.price {
  font-size: 20px;
  font-weight: bold;
}


</style>
