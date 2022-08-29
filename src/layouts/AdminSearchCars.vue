<template>
  <div class="image py-5">
    <div class="search-wrapper">
      <b-form class="px-4 search-container">
        <div>
          <b-form-input v-model="form.id" class="my-input left id" placeholder="ID"></b-form-input>
        </div>
        <div>
          <b-form-input v-model="form.name" class="my-input name" placeholder="Имя"></b-form-input>
        </div>
        <div class="brands">
          <b-select @change="getModels"  class="form-select my-input"
                    v-model="form.brand"
                    :options="brands"></b-select>
        </div>
        <div class="models">
          <b-select  class="form-select my-input"
                     v-model="form.model"
                     :options="models"></b-select>
        </div>
        <div>
          <b-form-select class="form-select my-select my-input" v-model="form.isBlocked" :options="isBlocked"></b-form-select>
        </div>
        <div>
          <b-form-select class="form-select my-select my-input" v-model="form.isDeleted" :options="isDeleted"></b-form-select>
        </div>
        <div class="grow"></div>
        <div>
          <div @click="search()"  class="button-wrapper mt-1">
            <img class=" search-button" src="../assets/search.svg" />
          </div>
        </div>
      </b-form>
    </div>
    <div class="ads">
      <p class="p-0 m-0">Поиск по пользователям</p>
      <a href="/admin"><b-button variant="light">Искать</b-button></a>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "AdminSearchCars",
  data() {
    return {
      form: {
        id: '',
        email: null,
        isDeleted: null,
        isBlocked: null,
        role: null,
        brand: 0,
        model: 0
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
      brands: [],
      models: [],
    }
  },
  methods: {
    async search() {
      if (this.form.brand === 0) {
        this.form.brand = null
      }
      if (this.form.model === 0) {
        this.form.model = null
      }
      const request = new Request(
          "http://localhost/admin/car-search",
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
          this.$store.state.cars = JSON.parse(data);
          this.$forceUpdate()
          router.push("/admin/cars#cars");
          this.form.model = 0;
          this.form.brand = 0;
        })
      } else {
        await router.push("/error/default")
      }
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
    async getModels() {
      this.form.model = 0;
      var request = new Request(
          "http://localhost/car/" + this.form.brand + "/models",
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
  },
  async beforeMount() {
    await this.getBrands();
    this.models.push({
      "value": 0,
      "text": 'Выберите модель'
    })
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
  width: 80%;
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

.grow {
  flex-grow: 8;
}
.brands {
  width: 250px;
}
</style>
