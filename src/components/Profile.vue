<template>
  <div class="user-wrapper ">
    <div class="my-card" >
      <div class="card">
        <div class="photo-container text-center">
          <img v-if="!editing" class="photo text-center" :src="require(`../assets/${user.photoUrl}`)"/>
          <img v-else class="photo text-center" :src="require(`../assets/${userEdit.photoUrl}`)"/>
          <div class="my-input" v-if="editing" >
            <p>Поменять изображение</p>
            <input class="image-input" @change="getFile"
                   type="file" name="photo" accept="image/png, image/jpeg">
          </div>
          <b-button v-if="editing" variant="outline-secondary" class="mt-3 delete-photo py-0 "
                    @click="deletePhoto()">Удалить фото</b-button>
        </div>
        <div class="info mx-4 text-left">
          <p class="fw-bold mt-2 ">Email: {{user.email}}</p>
        </div>
        <div v-if="editing" class="mx-4 change-password text-center">
          <p class="mb-0">Поменять пароль</p>
          <div class="error text-center" v-for="(error, key) in errors" v-bind:error="error" v-bind:key="key">
            <p class="m-0 pt-2">{{error}}</p>
          </div>
          <div v-if="success" class="success-pass text-center">
            <p class="m-0 pt-2">Пароль обновлен</p>
          </div>
          <b-form>
            <b-form-input @change="checkPasswords()" minlength="8" type="password"
                          v-model="passwords.oldPassword" placeholder="Старый пароль" class="my-2"></b-form-input>
            <b-form-input minlength="8" @change="checkPasswords()" type="password"
                          v-model="passwords.newPassword" placeholder="Новый пароль" class="my-2"></b-form-input>
            <b-form-input minlength="8" @change="checkPasswords()" type="password"
                          v-model="passwords.newPasswordRepeat" placeholder="Повторите новый пароль" class="my-2"></b-form-input>
            <b-button
                v-bind:disabled="passwords.newPassword !== passwords.newPasswordRepeat ||
                passwords.oldPassword.length < 8 ||
              passwords.newPassword.length < 8 || passwords.newPasswordRepeat.length < 8"
                variant="outline-danger" class="mb-2"
                @click="changePassword()">Поменять</b-button>
          </b-form>
        </div>
      </div>
    </div>
    <div class="more-info">
      <div class="info-top">
        <div class="left">
          <p class="name p-0 m-0">Здравствуйте, меня зовут
            <span v-if="!editing">{{user.name}}</span>
            <b-input v-model="userEdit.name" v-else class="name-input py-1 my-1" ></b-input>!</p>
          <p class="p-0 m-0 pt-1 joined mb-5">На Tripbook с {{new Date(user.joined).getFullYear()}}</p>
        </div>
        <div class="long"></div>
        <div v-if="id == null" class="ms-2 right">
          <div v-if="!editing" class="edit-buttons">
            <b-button class="edit-button me-2"
                      variant="outline-secondary" @click="edit()">Редактировать</b-button>
            <b-button class="delete-button"
                      variant="outline-danger" @click="open = true">Удалить профиль</b-button>
            <delete-popup v-bind:open="open" @revertDeleting="open = false" @deleteProfile="deleteProfile">
            </delete-popup>
          </div>
          <div v-else class="edit-buttons">
            <b-button class="revert-button me-2"
                      variant="outline-danger" @click="revertEdit()">Отменить</b-button>
            <b-button class="save-button"
                      variant="outline-success" @click="saveEdit()">Сохранить</b-button>
          </div>
        </div>
      </div>
      <div v-if="user.description !== null && user.description !== '' && !editing">
        <p class="info-name mpt-5">Информация</p>
        <p v-if="!editing" class="description">{{ user.description }}</p>
      </div>
      <div v-if="editing">
        <p class="info-name mpt-5">Информация</p>
        <b-textarea class="description-area" v-model="userEdit.description" no-resize></b-textarea>
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
                <a v-bind:href="`/transports/cars/${car.id}`"
                   class="ps-2  button">{{car.rating}} ({{car.reviews.length}} отзывов)</a>
              </div>
            </div>
            <a v-bind:href="`/transports/cars/${car.id}`">{{car.name}}</a>
            <br>
            <a v-bind:href="`/transports/cars/${car.id}`">{{car.brand}} {{car.model}}</a>
            <div v-if="id == null" class="text-center">
              <b-button class="delete-car-button mt-2 mb-3"
                        variant="outline-danger" @click="openCar(car.id)">Удалить объявление</b-button>
              <delete-car-popup v-bind:open="openCarDelete" @revertDeletingCar="openCarDelete = false"
                                @deleteCar="deleteCar(deletingCar)">
              </delete-car-popup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import DeletePopup from "./DeletePopup";
import DeleteCarPopup from "./DeleteCarPopup";

export default {
  name: "Profile",
  components: {DeleteCarPopup, DeletePopup},
  props: {
    id: null
  },
  data() {
    return {
      user: {},
      success: false,
      editing: false,
      errors: new Set(),
      passwords: {
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
      },
      userEdit: {},
      open: false,
      openCarDelete: false,
      deletingCar: 0,
    }
  },
  methods: {
    revertEdit() {
      this.$forceUpdate()
      this.editing = false;
    },
    openCar(id) {
      this.openCarDelete = true;
      this.deletingCar = id
    },
    checkPasswords() {
      this.errors.delete('Старый пароль указан неверно');
      this.success = false;
      if (this.passwords.newPassword !== '' && this.passwords.newPasswordRepeat !== '') {
        if (this.passwords.newPassword !== this.passwords.newPasswordRepeat) {
          this.errors.add("Пароли не совпадают!");
        } else {
          this.errors.delete("Пароли не совпадают!");
        }
      }
      if (this.passwords.newPassword.length < 8 && this.passwords.newPassword !== '' ||
          this.passwords.newPasswordRepeat.length < 8  && this.passwords.newPasswordRepeat !== '' ||
          this.passwords.oldPassword.length < 8 && this.passwords.oldPassword !== '') {
        this.errors.add("Ппароль должен быть длиннее 8 символов")
      } else {
        this.errors.delete("Ппароль должен быть длиннее 8 символов");
      }
      this.$forceUpdate();
    },
    deletePhoto() {
      this.userEdit.photoUrl = 'default-user.png';
    },
    getFile(event) {
      this.userEdit.photoUrl = Object.entries(event.target.files).map((x, y) => x[1].name)[0];
    },
    edit() {
      this.userEdit = Object.assign({}, this.user);
      this.editing = true;
    },
    async saveEdit() {
      if (this.user.name === this.userEdit.name) {
        this.userEdit.name = null;
      }
      if (this.user.photoUrl === this.userEdit.photoUrl) {
        this.userEdit.photoUrl = null;
      }
      if (this.user.description === this.userEdit.description) {
        this.userEdit.description = null;
      }
      const request = new Request(
          'http://localhost/profile',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.userEdit),
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      const response = await fetch(request);
      if (response.status === 200) {
        this.user = await response.json();
        this.editing = false;
      } else {
        await router.push("error/default")
      }
      this.$forceUpdate()
    },
    async deleteProfile() {
      this.editing = false;
      const request = new Request(
          'http://localhost/profile',
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      const response = await fetch(request);
      if (response.status === 200) {
        this.user = await response.json();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authorised');
        this.$emit('updateMenu')
        router.push("/")
      } else {
        await router.push("error/default")
      }
    },
    async deleteCar(id) {
      const request = new Request(
          'http://localhost/car/' + id,
          {
            method: "DELETE",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      const response = await fetch(request);
      if (response.status === 200) {
        this.user.cars = this.user.cars.filter(x => x.id !== id);
        this.editing = false;
        this.openCarDelete = false
      } else {
        await router.push("error/default")
      }
    },
    async changePassword() {
      const request = new Request(
          'http://localhost/change-password',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.passwords),
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      const response = await fetch(request);
      if (response.status === 200) {
        this.user = await response.json();
        this.success = true;
      } else if (response.status === 403) {
        console.log(response)
        this.errors.add('Старый пароль указан неверно');
        this.success = false;
        this.$forceUpdate()
      } else {
        await router.push("error/default")
      }
    },
    async getUser() {
      let url;
      if (this.id === null) {
        url = 'http://localhost/profile';
      } else {
        url = 'http://localhost/users/' + this.id
      }
      const request = new Request(
          url,
          {
            method: "GET"
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      const response = await fetch(request);
      if (response.status === 200) {
        this.user = await response.json()
      } else {
        await router.push("error/default")
      }
      this.$forceUpdate()

    },
  },
  async beforeMount() {
    await this.getUser();
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

.info-top {
  display: flex;
}
.long {
  flex-grow: 8;
}

.edit-button, .revert-button, .save-button, .delete-button {
  padding: 1px 3px 1px 3px;
  height: 100%;
}
.image-input::-webkit-file-upload-button {
  visibility: hidden;
  width: 0;
}

.image-input {
  display: inline-block;
  -webkit-user-select: none;
  cursor: pointer;

  border: 3px solid #969696;
  height: 35px;

  width: 70%;
  border-radius: 20px;
  font-size: 15px;
}
.my-input {
  width: 80%;
  margin: auto;
}

.name-input {
  border: 1px solid #969696;
  border-radius: 5px;
  width: 202px;
  font-size: 18px;
}

.error {
  color: red;
  font-size: 15px;
}
.success-pass {
  color: green;
  font-size: 15px;

}
.description-area {
  height: 150px;
}

.edit-buttons {
  display: flex;
}

.delete-button {
  width: 160px;
}

.delete-photo {
  height: 30px;
}
</style>
