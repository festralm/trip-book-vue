<template>
  <div class="image py-5">
    <div class="search-wrapper">
      <b-form class="px-4 search-container">
        <div>
          <b-form-input v-model="form.id" class="my-input left id" placeholder="ID"></b-form-input>
        </div>
        <div>
          <b-form-input v-model="form.email" class="my-input email" placeholder="Email"></b-form-input>
        </div>
        <div>
          <b-form-select class="form-select my-select my-input" v-model="form.isBlocked" :options="isBlocked"></b-form-select>
        </div>
        <div>
          <b-form-select class="form-select my-select my-input" v-model="form.isDeleted" :options="isDeleted"></b-form-select>
        </div>
        <div>
          <b-form-select class="form-select my-select my-input" v-model="form.role" :options="roles"></b-form-select>
        </div>
        <div>
          <div class="button-wrapper mt-1 ms-4">
            <img @click="search()" class=" search-button" src="../assets/search.svg" />
          </div>
        </div>
      </b-form>
    </div>
    <div class="ads">
      <p class="p-0 m-0">Поиск по объявлениям</p>
      <b-button variant="light">Искать</b-button>
      <!--          todo transports search-->
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "AdminSearch",
  data() {
    return {
      form: {
        id: '',
        email: null,
        isDeleted: null,
        isBlocked: null,
        role: null,
      },
      roles: [
        { value: null, text: "Выбрать роль"},
        { value: 'USER', text: "Пользователь"},
        { value: 'ADMIN', text: "Администратор"},
      ],
      isBlocked: [
        { value: null, text: "Заблокирован?"},
        { value: true, text: "Да"},
        { value: false, text: "Нет"},
      ],
      isDeleted: [
        { value: null, text: "Удален?"},
        { value: true, text: "Да"},
        { value: false, text: "Нет"},
      ],
    }
  },
  methods: {
    async search() {
      const request = new Request(
          "http://localhost/admin/search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.form),
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      if (response.status === 200) {
        response.text().then(data => {
          this.$store.state.users = JSON.parse(data);
        })
      }
      //todo errors
    }
  }

}
</script>

<style scoped>
.my-select {
  cursor: pointer;
}
.search-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.search-wrapper {
  font-family: 'Roboto Mono', monospace;
  margin: auto;
  width: 59%;
  background-color: white;
  height: 58px;
  border-radius: 50px;
  font-weight: 550;
}

.button-wrapper {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: #cbbcbc solid 1px;
  border-radius: 50px;
}
.button-wrapper:hover {
  border: 2px solid #b8a7a7;
  background-color: #eedcdc;
}

.search-button {
  width: 50%;
  margin-left: 13px;
  margin-top: 12px;
}
.my-input::placeholder {
  font-size: 15px;
}

.my-input {
  border-top: none;
  border-bottom: none;
  border-right: none;
  border-radius: 0;
  border-left: 1px solid #e0e0e0;
  margin-top: 11px;
}
input[type=text] {
  font-size: 15px;
}

.left  {
  border-left: none;
}

.image {
  margin-top: 70px;
  top: 0;
  left: 0;
  width: 100%;
  background: url("../assets/background.jpg") no-repeat;
  background-size: cover;
  z-index: -1;
  height: 651px;
}

.ads {
  margin-left: 180px;
  margin-top: 300px;
  font-family: 'Roboto Mono', monospace;
  color: white;

  font-size: 30px;
  font-weight: bold;
  width: 400px;
}

.id {
  width: 60px;
}

.email {
  width: 250px;
}
</style>
