<template>
  <div class="rent" id="rent">
<!--    todo legend-->
    <div v-if="$store.state.transportForm['type'] === 1" class="left">
      <div class="text">
        <p class="name ">Автомобиль какой марки вы желаете сдать в аренду?</p>
      </div>
    </div>
    <div class="right">
      <div v-if="$store.state.transportForm['type'] === 1" class="brands">
          <b-select class="form-select"
                    v-model="$store.state.transportForm['brand']"
                    :options="$store.state.transportForm['options']"></b-select>
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
  name: "Brand3",
  data() {
    return {
    }
  },
  methods: {
  },
  async beforeMount() {
    var request = new Request(
        "http://localhost/transports/brands",
        {
          method: "GET",
        }
    );
    if (this.$store.state.token !== null) {
      request.headers.append("Authorization", this.$store.state.token);
    }
    var response = await fetch(request);
    response.json().then(data => {
      this.$store.state.transportForm['options'] = data.reduce((opts, brand) => {
        opts.push({
          "value": brand['id'],
          "text": brand['name']
        })
        return opts;
      }, []);

      this.$store.state.transportForm['options'].push({
        "value": 0,
        "text": 'Выберите марку'
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
  width: 80%;
  margin: 250px auto auto;

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
