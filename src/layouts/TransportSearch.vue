<template>
  <div class="image py-5">
    <div class="search-wrapper ">
      <b-form @submit.prevent="" class="search-container">
        <div>
          <p class="p-0 m-0 ps-2">Начало</p>
          <b-form-input v-model="$store.state.carSearch.start" type="date" :min="getDate()"
                        :max="$store.state.carSearch.finish" class="py-2 my-input date"></b-form-input>
        </div>
        <div>
          <p class="p-0 m-0 ps-2">Конец</p>
          <b-form-input :min="$store.state.carSearch.start" v-model="$store.state.carSearch.finish"
                        type="date" class="p-2 my-input date"></b-form-input>
        </div>
        <div>
          <div class="button-wrapper">
            <img @click="search()" class="search-button" src="../assets/search.svg" />
          </div>
        </div>
      </b-form>
    </div>
    <div class="advices">
      <p class="p-0 m-0">Читайте наши советы и советы наших пользователей</p>
      <a href="/"><b-button variant="light">Читать</b-button></a>
      <!--      todo advices-->
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "TransportSearch",
  data() {
    return {
    }
  },
  methods: {
    getDate() {
      var now = new Date();
      var month = now.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      var date = now.getDate();
      if (date < 10) {
        date = '0' + date;
      }
      return now.getFullYear() + '-' + month + '-' + date
    },
    async search() {
      if (this.$store.state.carSearch.start !== null && this.$store.state.carSearch.finish !== null) {
        await router.push('/search');
      }
    },
  },
}
</script>

<style scoped>

.search-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 5px;
}

.search-wrapper {
  font-family: 'Roboto Mono', monospace;
  margin: auto;
  width: 35%;
  background-color: white;
  height: 13%;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 550;
}
.button-wrapper {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: #cbbcbc solid 1px;
  border-radius: 50px;
  margin-top: 10px;
  margin-left: 40px;
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
.image {
  top: 0;
  left: 0;
  width: 100%;
  background: url("../assets/background.jpg") no-repeat;
  background-size: cover;
  z-index: -1;
  height: 700px;
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
}

.left  {
  border-left: none;
}

.advices {
  margin-left: 180px;
  margin-top: 300px;
  font-family: 'Roboto Mono', monospace;
  color: white;

  font-size: 30px;
  font-weight: bold;
  width: 400px;
}
</style>
