<template>
  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Осталось только уточнить цену</p>
      </div>
    </div>
    <div class="right">
      <div class="my-input ">
        <b-input class="price-input my-4 py-2"  v-model="$store.state.transportForm['price']"
                 placeholder="Введите цену" type="number" ></b-input>
        <b-select class="form-select hour-input" v-model="$store.state.transportForm['forHour']"
                  :options="this.options"></b-select>
      </div>
      <div class="my-footer">
        <div class="footer-content m-4">
          <b-button class="back" @click="$emit('back')" variant="outline-secondary">Назад</b-button>
          <b-button class="next" @click="$emit('next')" variant="secondary"
          v-bind:disabled="$store.state.transportForm['price'] === '' || $store.state.transportForm['forHour'] === 'null'">
            Продолжить</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Price7",
  data() {
    return {
      options: {
        null: "Выберите период",
        true: "В час",
        false: "В сутки",
      }
    }
  },
  methods: {
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
.my-input {
  margin: 300px auto 262px auto;
  width: 30%;

}
</style>
