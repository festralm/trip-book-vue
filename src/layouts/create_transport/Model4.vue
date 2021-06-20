<template>
  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Выберите модель вашего автомобиля</p>
      </div>
    </div>
    <div class="right">
      <div class="brands ">
        <b-select class="form-select " v-model="$store.state.transportForm['model']"
                  :options="options"></b-select>
      </div>
      <div class="footer">
        <div class="footer-content m-4">
          <b-button class="back" @click="$emit('back')" variant="outline-secondary">Назад</b-button>
          <b-button class="next" @click="$emit('next')" variant="secondary"
          v-bind:disabled="$store.state.transportForm['model'] === 0">Продолжить</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Model4",
  props: [
    'brand',
  ],
  data() {
    return {
      options: null,
    }
  },
  methods: {
  },
  async beforeMount() {
      var request = new Request(
          "http://localhost/car/" + this.$store.state.transportForm['brand'] + "/models",
          {
            method: "GET",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);
      response.json().then(data => {
        this.options = data.reduce((opts, model) => {
          opts.push({
            "value": model['id'],
            "text": model['name']
          })
          return opts;
        }, []);
        this.options.push({
          "value": 0,
          "text": 'Выберите модель'
        })
        this.$forceUpdate()
      })
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

.footer {
  width: 100%;
}

.brands {
  margin: 160px auto 446px auto;
  width: 70%;
}

.form-select {
  height: 60px;
}
</style>
