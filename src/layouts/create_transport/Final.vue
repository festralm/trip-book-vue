<template>
  <div class="text-wrapper text-center">
    <div class="text">
      <p class="main">Поздравляем!</p>
      <br>
      <p>Ваше объявление будет опубликовано в скором времени. Ожидайте уведомления.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Final"
}
</script>

<style scoped>
.text-wrapper {

  background: rgb(255,125,117);
  background: linear-gradient(15deg, rgba(255,125,117,1) 0%, rgba(254,134,255,1) 35%, rgba(255,250,143,1) 100%);
  height: 722px;

}
.text {
  width: 70%;
  font-family: 'Roboto Mono', monospace;
  font-size: 40px;
  font-weight: bold;
  margin: auto;
  padding-top: 150px;
}

.main {
  font-size: 60px;

}
.small {
  font-weight: normal;
  font-size: 30px;
}
</style>
