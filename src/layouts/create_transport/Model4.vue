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
                  :options="$store.state.transportForm['modelOptions']"></b-select>
      </div>
      <div class="footer">
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
  name: "Model4",
  props: [
    'brand',
  ],
  data() {
    return {
    }
  },
  methods: {
  },
  async beforeMount() {
      var request = new Request(
          "http://localhost/transports/" + this.$store.state.transportForm['brand'] + "/models",
          {
            method: "GET",
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);
      response.json().then(data => {
        this.$store.state.transportForm['modelOptions'] = data.reduce((opts, model) => {
          opts.push({
            "value": model['id'],
            "text": model['name']
          })
          return opts;
        }, []);
        this.$store.state.transportForm['modelOptions'].push({
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
  height: 722px;

  font-family: 'Roboto Mono', monospace;
}
.left {
  float: left;
  width: 50%;
  background: rgb(255,125,117);
  background: linear-gradient(15deg, rgba(255,125,117,1) 0%, rgba(254,134,255,1) 35%, rgba(255,250,143,1) 100%);
  height: 722px;
}
.right {
  float: right;
  width: 50%;
  height: 722px;
}
.text {
  width: 70%;
  margin: 270px auto auto;

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
