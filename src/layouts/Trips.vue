<template>
  <div class="my-list">
    <div class="transport-list-wrapper mb-2 " style="margin-top: 120px">
      <div class="cars list">
        <p class="type p-0 m-0">Текущие поездки</p>
        <trip v-bind:list="currentBooks" v-bind:review="true">
        </trip>
      </div>
    </div>
    <div class="transport-list-wrapper mb-2">
      <div class="cars list">
        <p class="type p-0 m-0">Предстоящие поездки</p>
          <trip v-bind:list="futureBooks">
          </trip>
      </div>
    </div>
    <div class="transport-list-wrapper mb-2">
      <div class="cars list">
        <p class="type p-0 m-0">Прошлые поездки</p>
        <trip v-bind:list="oldBooks" v-bind:review="true">
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
      currentBooks: [],
      futureBooks: [],
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
        this.user.books.sort((x, y) => new Date(x.finish).getTime() - new Date(y.finish).getTime())
        this.oldBooks = this.user.books.filter(x => new Date(x.finish).getTime() < new Date())
        .sort((x, y) => new Date(y.finish).getTime() - new Date(x.finish).getTime());
        this.currentBooks = this.user.books.filter(x =>
            new Date(x.start).getTime() <= new Date()
            && new Date(x.finish).getTime() >= new Date()
        );
        this.futureBooks = this.user.books.filter(x =>new Date(x.start).getTime() > new Date());
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
  margin: 40px auto auto auto;
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
