<template>
  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Укажите, где можно забрать автомобиль</p>
      </div>
    </div>
    <div class="right">
      <div class="address ">
        <b-input class="address-input my-4 py-2" v-model="form.country" placeholder="Страна"></b-input>
        <b-input class="address-input my-4 py-2" v-model="form.region" placeholder="Регион"></b-input>
        <b-input class="address-input my-4 py-2" v-model="form.city" placeholder="Город"></b-input>
        <b-input class="address-input my-4 py-2" v-model="form.street" placeholder="Улица"></b-input>
        <b-input class="address-input my-4 py-2" v-model="form.building" placeholder="Дом"></b-input>
        <b-input class="address-input my-4 py-2" v-model="form.literal" placeholder="Литреал"></b-input>
      </div>
      <div class="my-footer">
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
  name: "Address5",
  data() {
    return {
      form: {
        country: '',
        region: '',
        city: '',
        street: '',
        building: '',
        literal: ''
      }
    }
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
  margin: 100px auto auto;

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
.address {
  margin: 150px auto 144px auto;
  width: 70%;

}
</style>
