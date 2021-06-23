<template>
  <div class="list-wrapper mt-4 mb-5">
    <div class="car" v-for="(car, key) in list" v-bind:car="car" :key="key">
      <a v-bind:href="`/transports/cars/${car.id}`">
        <img class="image pb-2" :src="require(`../assets/${car.carPhotoUrls[0]}`)"/>
      </a>
      <div  class="text-container text-center">
        <a v-bind:href="`/transports/cars/${car.id}`" class="px-1">{{car.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransportsList",
  props: {
    list: {}
  }
}
</script>

<style scoped>

.list-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
}

.car {
  margin: 10px 30px 10px 30px;
}

.image {
  cursor: pointer;
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 20px;
}

.text-container {
  font-size: 17px;
  cursor: pointer;
  font-weight: bold;
  width: 240px;
}


.text-container a {
  display: block;
  font-family: 'Roboto Mono', monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  color: black;
}
.text-container a:hover {
  color: #b8a7a7;
}
</style>
