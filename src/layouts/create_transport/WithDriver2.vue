<template>
  <div class="rent" id="rent">
    <div v-if="$store.state.transportForm['type'] === 1" class="left">
      <div class="text">
        <p class="name ">Вы планируете сдавать машину с водителем или без водителя?</p>
      </div>
    </div>
    <div class="right">
      <div v-if="$store.state.transportForm['type'] === 1" class="types">
        <b-button @click="choose(true)" v-bind:class="{chosen: $store.state.transportForm['withDriver']}" variant="outline-secondary"
                  class="my-button my-3 text-center">
          С водителем
        </b-button>
        <b-button @click="choose(false)" v-bind:class="{chosen: !$store.state.transportForm['withDriver']}" variant="outline-secondary"
                  class="my-button  my-3 text-center">
          Без водителя
        </b-button>
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
  name: "WithDriver2",
  data() {
    return {
    }
  },
  methods: {
      choose(withDriver) {
      this.$store.state.transportForm['withDriver'] = withDriver;
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
  width: 73%;
  margin: 50px auto auto;

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

.types {
  margin: 210px auto 252px  auto;
  width: 50%;
}

.types .my-button {

  width: 100%;
  height: 70px;
  border-radius: 20px;
  font-size: 20px;
}

.chosen {
  border: 3px solid #969696;
  background-color: #ececec;
}
</style>
