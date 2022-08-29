<template>
  <div class="map-container">
    <GmapMap
        class="map"
        :center="myCoordinates"
        :zoom="zoom"
        ref="mapRef"
        @dragend="handleDrag()"
    >
      <GmapMarker
          :key="index"
          v-for="(car, index) in $store.state.cars"
          :position="{lat: car.lat, lng: car.lng}"
          :clickable="true"
          :draggable="false"
          @click="chooseCar(car)"
      />

    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "MyMap",
  data() {
    return {
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      zoom: 7,
    }
  },
  methods: {
    chooseCar(car) {
      this.$store.state.chosenCar = car
      console.log('choosing')
    },
    handleDrag() {
      var center = {
        lat: this.map.getCenter.lat(),
        lng: this.map.getCenter.lng()
      };
      var zoom = this.map.getZoom();

      localStorage.setItem('center', JSON.stringify(center));
      localStorage.setItem('zoom', zoom);
    },
  },
  created() {
    if (localStorage.getItem('center')) {
      this.myCoordinates = JSON.parse(localStorage.getItem('center'))
    } else {
      this.$getLocation({})
          .then(coordinates => {
            this.myCoordinates = coordinates;
          })
          .catch(error => {
            this.myCoordinates = {
              lat: 55.7879,
              lng: 49.1233,
            }
          });

    }
    if (localStorage.getItem('zoom')) {
      this.zoom = parseInt(localStorage.getItem('zoom'))
    }

  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      this.map = map
    })
  },
  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 55.7879,
          lng: 49.1233,
        }
      }
      return {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng(),
      }
    },

  }
}
</script>

<style scoped>
.map-container {
  width: 50%;
}
.map {
  height: 651px;
  width: 100%;
}
</style>
