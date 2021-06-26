<template>

  <div class="user-wrapper ">
    <div class="my-card" >
      <div class="card">
        <div class="photo-container text-center">
          <img class="photo text-center" :src="require(`../assets/${user.photoUrl}`)"/>
        </div>
        <div class="info mx-4 text-left">
          <div class="rating-container">
            <div class="image">
              <a href="#reviews"><img src="../assets/rating.png"></a>
            </div>
            <div class="top ">
              <a href="#reviews" class="ps-2 fw-bold button">Количество отзывов</a>
            </div>
          </div>
          <p class="fw-bold mt-3 ">Email: {{user.email}}</p>
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
      <div class="mb-5" v-if="user.cars !== null && user.cars !== undefined && user.cars.length > 0">
        <hr class="hr my-4">
        <p class="info-name">Объявления</p>
        <div class="car-container">
          <div class="car" v-for="(car, key) in user.cars" v-bind:car="car" :key="key">
            <a v-bind:href="`/transports/cars/${car.id}`">
              <img class="car-photo" :src="require(`../assets/${car.carPhotoUrls[0]}`)"/>
            </a>
            <div class="rating-container">
              <div class="car-image">
                <a v-bind:href="`/transports/cars/${car.id}`"><img src="../assets/rating.png"></a>
              </div>
              <div class="top ">
                <a v-bind:href="`/transports/cars/${car.id}`" class="ps-2  button">{{car.rating}} (Количество отзывов)</a>
              </div>
            </div>
            <a v-bind:href="`/transports/cars/${car.id}`">{{car.name}}</a>
            <br>
            <a v-bind:href="`/transports/cars/${car.id}`">{{car.brand}} {{car.model}}</a>
          </div>
        </div>
      </div>
      <div id="reviews" class="rating-container mt-5">
        <div class="image">
          <!--        todo rating-->
          <p><img src="../assets/rating.png"></p>
        </div>
        <div class="top ">
          <p class="ps-2 fw-bold">Количество отзывов</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "UserForAdmin",
  data() {
    return {
      user: {}
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
      var response = await fetch(request);
      if (response.status === 200) {
        response.json().then(data => {
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
</style>
