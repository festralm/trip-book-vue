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
            <b-form-input class="p-3" v-model="$store.state.transportForm['start']" type="date" ></b-form-input>
          </b-col>
<!--          todo wrong date choosing-->
          <b-col class="offset-1 col-5 end">
            <p class="">Конец</p>
            <b-form-input class="p-3" v-model="$store.state.transportForm['finish']" type="date" ></b-form-input>
          </b-col>
        </b-row>
      </div>
      <div class="footer">
        <div class="footer-content m-4">
          <b-button class="back" @click="$emit('back')" variant="outline-secondary">Назад</b-button>
          <b-button class="next" @click="$emit('next')" variant="secondary">Продолжить</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dates9"
}
</script>

<style scoped>

.rent {
  height: 722px;

  font-family: 'Roboto Mono', monospace;
}
.left {
  float: left;
  width: 50%;
  background: rgb(255,125,117);
  background: linear-gradient(15deg, rgba(255,125,117,1) 0%, rgba(254,134,255,1) 35%, rgba(255,250,143,1) 100%);
  height: 722px;
}
.right {
  float: right;
  width: 50%;
  height: 722px;
}
.text {
  width: 70%;
  margin: 290px auto auto;

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
