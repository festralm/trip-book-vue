<template>
  <div class="my-list">
    <div class="transport-list-wrapper mb-3">
      <div class="cars list">
        <p class="type p-0 m-0">Предстоящие поездки</p>
          <trip v-bind:list="user.books">
          </trip>
      </div>
    </div>
    <div class="transport-list-wrapper mb-3">
      <div class="cars list">
        <p class="type p-0 m-0">Прошлые поездки</p>
          <trip v-bind:list="oldBooks">
          </trip>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import TransportsList from "../components/TransportsList";
import Trip from "../components/Trip";

export default {
  name: "Trips",
  components: {Trip},
  data() {
    return {
      oldBooks: [],
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
  methods: {
    getDate(car, start) {
      if (start) {
        var date = new Date(car.start);
      } else {
        date = new Date(car.finish);
      }
      var res = date.getDate() + " " + this.months[date.getMonth()];
      if (new Date().getFullYear() !== date.getFullYear()) {
        res += date.getFullYear();
      }
      if (car.forHour) {
        res += ', ' + date.getHours() + ":00"
      }
      return res;
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
        this.user = data;
        this.oldBooks = this.user.books.filter(x => new Date(x.start).getTime() < new Date());
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
