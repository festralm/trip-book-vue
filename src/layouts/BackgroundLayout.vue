<template>
  <div class="image">
  </div>
</template>

<script>
export default {
  name: "BackgroundLayout"
}
</script>

<style scoped>
.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/background.jpg") no-repeat;
  background-size: cover;
  z-index: -1;
}
</style>
