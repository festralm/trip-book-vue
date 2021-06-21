<template>
  <div class="my-list">
    <div class="transport-list-wrapper mb-3">
      <div class="cars list">
        <p class="type p-0 m-0">Мой транспорт</p>
        <transports-list v-bind:list="user.cars"></transports-list>
      </div>
    </div>
  </div>
</template>

<script>
import TransportsList from "./TransportsList";
import router from "../router";

export default {
  name: "MyTransport",
  components: {TransportsList},
  data() {
    return {
      user: {
        books: [],
        cars: [],
        email: null,
        id: 0,
        photoUrl: '',
        role: '',
        wishlist: [],
      },
    }
  },
  async beforeMount() {
    var request = new Request(
        "http://localhost/profile",
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
        console.log(data)
        this.user = data;
        this.$forceUpdate();
      })
    } else {
      await router.push("/error/default")
    }
  }
}
</script>

<style scoped>

.my-list {
  margin-top: 70px;
  min-height: 600px;

}
.transport-list-wrapper {
  font-family: 'Roboto Mono', monospace;
  margin: 120px auto auto auto;
  width: 1200px;
}

.type {
  font-family: 'Roboto Mono', monospace;
  font-size: 30px;
  font-weight: 600;
  color: black;
  text-decoration: none;
}

</style>
