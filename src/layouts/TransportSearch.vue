<template>
  <div class="image py-5">
    <div class="search-wrapper ">
      <b-form @submit.prevent="" class="search-container">
        <div>
          <p class="p-0 m-0 ps-2">Местоположение</p>
          <b-form-input v-model="form.address" autocomplete="off" @click="showOptions()"
                        class="p-2 my-input" placeholder="Где будем искать?"></b-form-input>
        </div>
        <div>
          <p class="p-0 m-0 ps-2">Начало</p>
          <b-form-input v-model="form.start" type="date" class="py-2 my-input date"></b-form-input>
        </div>
        <div>
          <p class="p-0 m-0 ps-2">Конец</p>
          <b-form-input v-model="form.end" type="date" class="p-2 my-input date"></b-form-input>
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
      <b-button variant="light">Читать</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransportSearch",
  data() {
    return {
      form: {
        address: null,
        start: null,
        end: null
      }
    }
  },
  methods: {
    async search() {
      const request = new Request(
          "http://localhost/transports/search",
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

      response.text().then(data =>{
        this.$store.state.transports = JSON.parse(data);
      })
    },

    async showOptions() {
      const request = new Request(
          "http://localhost/transports/addresses",
          {
            method: "GET",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);

      response.text().then(data =>{
        this.$store.state.addresses = JSON.parse(data);
      })
    }
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
  width: 50%;
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

.left .my-input {
  border-left: none;
}

.advices {
  margin-left: 180px;
  margin-top: 280px;
  font-family: 'Roboto Mono', monospace;
  color: white;

  font-size: 30px;
  font-weight: bold;
  width: 400px;
}
</style>
