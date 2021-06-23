<template>
  <div class="text-wrapper text-center">
    <div class="text">
      <p>Что-то пошло не так...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error"
}
</script>

<style>
.text-wrapper {
  background: rgb(255,125,117);
  background: linear-gradient(15deg, rgba(255,125,117,1) 0%, rgba(254,134,255,1) 35%, rgba(255,250,143,1) 100%);
  height: 721px;
}
.text {
  width: 70%;
  font-family: 'Roboto Mono', monospace;
  font-size: 40px;
  font-weight: bold;
  margin: auto;
  padding-top: 150px;
}

p {
  margin-top: 130px;
}
</style>
