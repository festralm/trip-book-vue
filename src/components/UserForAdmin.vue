<template>

  <div class="user-wrapper ">
    <div class="my-card" >
      <div class="card">
        <div class="photo-container text-center">
          <img class="photo text-center" :src="require(`../assets/${user.photoUrl}`)"/>
        </div>
        <div class="info mx-4 text-left">
          <p class="fw-bold mt-2 ">Email: {{user.email}}</p>
          <b-button class="my-button" @click="undoAdmin(user.id)" v-if="user.role === 'ADMIN'"
                    variant="outline-danger" >Сделать пользователем</b-button>
          <b-button class="my-button" @click="makeAdmin(user.id)" v-else
                    variant="outline-success" >Сделать администратором</b-button>
          <br>
          <b-button class="my-button" @click="blockUser(user.id)" v-if="user.isBlocked === false"
                    variant="outline-danger" >Заблокировать</b-button>
          <b-button class="my-button" @click="unblockUser(user.id)" v-else
                    variant="outline-success" >Разблокировать</b-button>
          <br>
          <b-button class="my-button" @click="deleteUser(user.id)" v-if="user.isDeleted === false"
                    variant="outline-danger" >Удалить</b-button>
          <b-button class="my-button" @click="restoreUser(user.id)" v-else
                    variant="outline-success" >Восстановить</b-button>
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
      <div class="mb-5" >
        <hr class="hr my-4">
        <p class="info-name">Объявления</p>
        <cars-for-admin v-bind:list="user.cars"></cars-for-admin>
      </div>
      <div class="mb-5" >
        <hr class="hr my-4">
        <p class="info-name">Список желаний</p>
        <cars-for-admin v-bind:list="user.wishlist"></cars-for-admin>
      </div>
      <div class="mb-5" >
        <hr class="hr my-4">
        <p class="info-name">Поездки</p>
        <cars-for-admin  v-bind:list="user.books"></cars-for-admin>
      </div>
      <div class="review-list">
        <hr class="hr my-4">
        <p class="info-name">Оставленные отзывы</p>
        <div class="review" v-for="(review, key) in user.reviews" v-bind:review="review" v-bind:key="key">
          <div class="review-user">
            <a class="me-3 mb-3" v-bind:href="`/transports/cars/${review.car.id}`"><img :src="require(`../assets/${review.car.carPhotoUrls[0]}`)"/></a>
            <div>
              <a v-bind:href="`/transports/cars/${review.car.id}`">{{review.car.name}}</a>
              <br>
              <p class="p-0 m-0">{{review.car.brand}} {{review.car.model}}</p>
              <p class="year p-0 m-0">{{months[new Date(review.datetime).getMonth()]}} {{new Date(review.datetime).getFullYear()}}г.</p>
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
import CarsForAdmin from "./CarsForAdmin";

export default {
  name: "UserForAdmin",
  components: {CarsForAdmin},
  data() {
    return {
      user: {},
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
    }
  },
  methods: {

    async getUserForAdmin() {
      const request = new Request(
          'http://localhost/admin/users/' + router.currentRoute.params['id'],
          {
            method: "GET",
          }
      );
      if (this.$store.state.token !== '') {
        request.headers.append("Authorization", this.$store.state.token);
      }
      const response = await fetch(request);
      if (response.status === 200) {
        await response.json().then(data => {
          this.user = data
        })
      } else {
        await router.push("/error/default")
      }
      this.$forceUpdate()
    },
    async blockUser(id) {
      const request = new Request(
          `http://localhost/admin/users/ban/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        response.json().then(data => {
          this.user = data
        })
      } else {
        await router.push("/error/default")
      }
    },
    async unblockUser(id) {
      const request = new Request(
          `http://localhost/admin/users/unban/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        response.json().then(data => {
          this.user = data
        })
      } else {
        await router.push("/error/default")
      }
    },
    async deleteUser(id) {
      const request = new Request(
          `http://localhost/admin/users/delete/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        response.json().then(data => {
          this.user = data
        })
      } else {
        await router.push("/error/default")
      }
    },
    async restoreUser(id) {
      const request = new Request(
          `http://localhost/admin/users/restore/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        response.json().then(data => {
          this.user = data
        })
      } else {
        await router.push("/error/default")
      }
    },
    async makeAdmin(id) {
      const request = new Request(
          `http://localhost/admin/make-admin/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        response.json().then(data => {
          this.user = data
        })
      } else {
        await router.push("/error/default")
      }
    },
    async undoAdmin(id) {
      const request = new Request(
          `http://localhost/admin/undo-admin/${id}`,
          {
            method: "POST",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        response.json().then(data => {
          this.user = data
        })
      } else {
        await router.push("/error/default")
      }
    },
  },
  async beforeMount() {
    await this.getUserForAdmin();
    this.user.cars.sort((x, y) => y.rating - x.rating)
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


.my-button {
  width: 100%;
  margin-bottom: 15px;
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

.review-user img {
  width: 60px;
  height: 60px;
  margin-top: 10px;
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

.review-user .year {
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
  width: 600px;
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 0px 10px 1px #dedede;
}
</style>
