<template>

  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Выберите даты</p>
      </div>
    </div>
    <div class="right">
      <div class="my-input text-center">
        <v-date-picker
          :value="null"
          color="red"
          v-bind:mode="$store.state.transportForm.forHour === true ? 'dateTime' : 'date'"
          :available-dates="[{
                  start: new Date() ,
                  end: null
                },
                ]"
          is-range
          v-model="$store.state.transportForm.range"
      />
      </div>
      <div class="my-footer">
        <div class="footer-content m-4">
          <b-button class="back" @click="$emit('back')" variant="outline-secondary">Назад</b-button>
          <b-button class="next" @click="$emit('next')" variant="secondary"
          v-bind:disabled="$store.state.transportForm.range === null">
            Продолжить</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dates9",
  data() {
    return {
    }
  },
  methods: {

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

.my-footer {
  width: 100%;
}
.my-input {
  margin: 150px auto 113px auto;
  width: 70%;

}
</style>
