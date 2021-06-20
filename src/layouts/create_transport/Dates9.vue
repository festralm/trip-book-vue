<template>

  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Выберите даты</p>
      </div>
    </div>
    <div class="right">
      <div class="my-input text-center">
        <b-row class="ps-4">
          <b-col class="col-5 start">
            <p class="">Начало</p>
            <b-form-input class="p-3" v-bind:min="getStartDate()" v-model="$store.state.transportForm['start']" type="date" ></b-form-input>
          </b-col>
<!--          todo wrong date choosing-->
          <b-col class="offset-1 col-5 end">
            <p class="">Конец</p>
            <b-form-input class="p-3" v-bind:min="getFinishDate()"
                          v-model="$store.state.transportForm['finish']" type="date" ></b-form-input>
          </b-col>
        </b-row>
      </div>
      <div class="footer">
        <div class="footer-content m-4">
          <b-button class="back" @click="$emit('back')" variant="outline-secondary">Назад</b-button>
          <b-button class="next" @click="$emit('next')" variant="secondary"
          v-bind:disabled="$store.state.transportForm.start === null || $store.state.transportForm.finish === null">
            Продолжить</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dates9",
  methods: {
    getStartDate() {
      var now = new Date();
      var month = now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
      var date = now.getFullYear() + '-' + month + '-' + now.getDate();
      return date
    },
    getFinishDate() {
      return this.$store.state.transportForm['start'];
    },
  }
}
</script>

<style scoped>

.rent {
  height: 723px;

  font-family: 'Roboto Mono', monospace;
}
.left {
  float: left;
  width: 50%;
  background: rgb(255,125,117);
  background: linear-gradient(15deg, rgba(255,125,117,1) 0%, rgba(254,134,255,1) 35%, rgba(255,250,143,1) 100%);
  height: 723px;
}
.right {
  float: right;
  width: 50%;
  height: 723px;
}
.text {
  width: 70%;
  margin: 150px auto auto;

}
.name {
  font-size: 45px;
  font-weight: bold;
}
.back {
  float: left;
}
.next {
  float: right;
}

.footer {
  width: 100%;
}
.my-input {
  margin: 250px auto 318px auto;
  width: 70%;

}
</style>
