<template>
  <div class="image py-5">
    <div class="search p-5 mx-5 pt-5">
      <b-form @submit.prevent="search()">
        <b-row class="px-3">
          <b-col class="col-1 pt-2">
            <b-form-input v-model="form.id" placeholder="ID"></b-form-input>
          </b-col>
          <b-col class="col-2 pt-2">
            <b-form-input v-model="form.phoneNumber" placeholder="Номер телефона"></b-form-input>
          </b-col>
          <b-col class="col-2 pt-2">
            <b-form-input v-model="form.email" placeholder="Email"></b-form-input>
          </b-col>
          <b-col class="col-2 pt-2">
            <b-form-select class="form-select" v-model="form.role" :options="form.options"></b-form-select>
          </b-col>
          <b-col class="col-2 pt-2">
            <b-button class="button w-50" variant="outline-primary" type="submit">Искать</b-button>
          </b-col>
        </b-row>
      </b-form>

      <div class="mt-5">
        <div class="main-text">
          <p class="m-0 pt-5">Поиск</p>
          <p class="mt-0 pt-2">пользователей</p>
        </div>
        <div class="pt-4">
          <b-button variant="outline-secondary">Искать по объявлениям</b-button>
        </div>
      </div>
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
        phoneNumber: '',
        email: null,
        deleted: '',
        blocked: '',
        role: null,
        options: [
          { value: null, text: "Выбрать"},
          { value: 'USER', text: "Пользователь"},
          { value: 'ADMIN', text: "Администратор"},
        ]
      }
    }
  },
  methods: {
    async search() {
      if (this.form.email == '') {
        this.form.email = null
      }
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
      console.log(this.form)
      if (this.$store.state.token !== '') {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      response.text().then(data =>{
        this.$store.state.users = JSON.parse(data);
      })
    }
  }

}
</script>

<style scoped>

.main-text {
  font-size: 40px;
  font-weight: 600;
}

.search {
  background: rgba(233, 214, 214, 0.7);
  border-radius: 50px;
}

.search span {
  font-size: 17px;
}
.image {
  top: 0;
  left: 0;
  width: 100%;
  background: url("../assets/background.jpg") no-repeat;
  background-size: cover;
  z-index: -1;
  height: 700px;
}

</style>
