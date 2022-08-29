<template>
  <div class="transport-list-wrapper">
    <div class="cars list">
      <p class="type p-0 m-0">Легковые автомобили</p>
      <b-row class=" pt-4 ps-4 ">
      <car-for-search v-for="(car, key) in $store.state.cars" v-bind:car="car" v-bind:key="key"></car-for-search>
      </b-row>
    </div>
  </div>
  <!--  TODO empty transports-->
</template>

<script>
import CarForSearch from "@/layouts/CarForSearch";
export default {
  name: "Transports",
  components: {CarForSearch},
  async beforeMount() {
    const request = new Request(
        "http://localhost/transports",
        {
          method: "GET",
        }
    );
    if (this.$store.state.token !== null) {
      request.headers.append("Authorization", this.$store.state.token);
    }
    var response = await fetch(request);

    response.text().then(data =>{
      this.$store.state.cars = JSON.parse(data)['cars'];
    })
  }
}
</script>

<style scoped>

.transport-list-wrapper {
  margin-left: 150px;
  margin-right: 210px;
  margin-top: 50px;
}

.type {

  font-family: 'Roboto Mono', monospace;
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
}
</style>
