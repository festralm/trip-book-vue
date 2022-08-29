<template>
  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Добро пожаловть на Tripbook! Сдайте транспорт в аренду здесь.</p>
        <br>
        <p class="description">Арендодатели Tripbook - это маленькое сообщество любителей транспорта,
          которые не прочь поделиться своей радостью с арендаторами.</p>
        <br>
        <p class="description">Все объвления на Tripbook рассматриваются нашей маленькой командой. Если ваша идея будет соответствовать нашим стандартам,
          вы сможете добавить дату и начать сдавать транспорт в аренду!</p>
        <br>
        <b-button @click="$emit('next')" variant="outline-secondary">Продолжить</b-button>
      </div>
    </div>
    <div class="right">
      <div class="first-col mt-5 ">
<!--        todo alt-->
        <img class="car1 ms-3" src="../../assets/car1.jpg"/>
        <img class="car2 mt-5" src="../../assets/car2.jpg"/>
      </div>
      <div class="second-col mt-5">
        <img class="car3" src="../../assets/car4.jpg"/>
        <img class="car4 mt-5 ms-4"  src="../../assets/car3-copy.jpg"/></div>
    </div>
  </div>
</template>

<script>
export default {
  // todo if user is not authenticated
  name: "ZeroStep0",
}
</script>

<style scoped>
.rent {
  height: 722px;
}
.left {
  float: left;
  width: 50%;
}
.right {
  width: 50%;
  float: right;
}
.text {
  font-family: 'Roboto Mono', monospace;
  width: 60%;
  margin: 100px auto auto;
}

.name {
  font-size: 30px;
  font-weight: bold;
}
.first-col {
  width: 50%;
  float: left;
}
.second-col {
  width: 50%;
  float: right;
}
.car1, .car2, .car3, .car4 {
  border-radius: 10%;
}
.car1 {
  width: 300px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.car2 {
  width: 350px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.car3 {
  width: 300px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.car4 {
  width: 300px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>
