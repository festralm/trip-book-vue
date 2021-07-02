<template>
  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Укажите, где можно забрать автомобиль</p>
      </div>
    </div>
    <div class="right">
      <GmapMap
          class="map"
          :center="myCoordinates"
          :zoom="zoom"
          ref="mapRef"
          @dragend="handleDrag()"
          @drag="handle"
      >
        <GmapMarker
            :position="mapCoordinates"
            :clickable="false"
            :draggable="false"
            :visible="5"
        />

      </GmapMap>
      <div class="my-footer">
        <div class="footer-content m-4">
          <b-button class="back" @click="$emit('back')" variant="outline-secondary">Назад</b-button>
          <b-button class="next" @click="$emit('next')" variant="secondary"
          :disabled="$store.state.transportForm.lat == null || $store.state.transportForm.lng == null"
          >Продолжить</b-button>
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
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      zoom: 7,
    }
  },
  methods: {
    handle() {
      this.$store.state.transportForm.lat = this.map.getCenter().lat();
      this.$store.state.transportForm.lng = this.map.getCenter().lng();
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
.map {
  width: 100%;
  height: 641px;

}
</style>
