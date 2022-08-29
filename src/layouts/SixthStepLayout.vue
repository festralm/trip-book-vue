<template>
  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Теперь выберите название для вашего объявления</p>
      </div>
    </div>
    <div class="right">
      <div class="my-input ">
        <b-input class="address-input my-4 py-2" v-model="$store.state.transportForm['name']"
                 placeholder="Введите название" v-bind:value="$store.state.transportForm['name']"></b-input>
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
  name: "SixthStepLayout",
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
  margin: 270px auto auto;

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
  margin: 300px auto 324px auto;
  width: 70%;

}
</style>
